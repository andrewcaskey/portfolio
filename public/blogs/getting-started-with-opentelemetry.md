# Getting Started with OpenTelemetry in Go

**Date:** April 10, 2026 · **Category:** Observability

OpenTelemetry (OTel) is the open standard for collecting telemetry data from your applications. Before it existed, every observability vendor had its own SDK. Switching providers meant rewriting instrumentation. OTel solves this with a vendor-neutral API and SDK layer — you instrument once, and swap exporters without touching application code.

In this post I'll walk through instrumenting a Go service with all three primary signals: structured logs, Prometheus metrics, and distributed traces — and then show how to correlate them.

---

## The Five Signals

| Signal | What it answers | OTel covers? |
|--------|----------------|-------------|
| Logs | What happened and when | Yes (via `otelslog` bridge) |
| Metrics | How often / how fast | Yes (SDK metrics) |
| Traces | Why it's slow / where it failed | Yes (core use case) |
| Profiles | Which code consumes CPU/memory | No — use `pprof` |
| RUM | What the user actually experienced | No — use browser SDK |

For most backend services, logs + metrics + traces get you 90% of the way there. Profiles and RUM you add when you need them.

---

## Structured Logging with `slog` + OTel Bridge

Go 1.21 ships `log/slog` as the standard structured logger. On its own it's great. Pair it with the `otelslog` bridge and your logs automatically carry `trace_id` and `span_id` — so you can jump from a log line straight to the trace in Grafana Tempo.

```go
import (
    "log/slog"
    "os"

    "go.opentelemetry.io/contrib/bridges/otelslog"
)

func initLogger(tp *sdktrace.TracerProvider) *slog.Logger {
    // otelslog bridge forwards slog records into OTel log pipeline
    otelHandler := otelslog.NewHandler("my-service", otelslog.WithTracerProvider(tp))
    return slog.New(otelHandler)
}
```

Then use it normally:

```go
logger.InfoContext(ctx, "order processed",
    slog.String("order_id", orderID),
    slog.Int("item_count", count),
)
```

The `ctx` carries the active span — the bridge extracts `trace_id` and `span_id` automatically.

---

## Prometheus Metrics — Histograms, Not Summaries

For latency, use histograms. Summaries sound simpler but they compute quantiles client-side and **can't be aggregated across instances** — a p99 from two pods can't be combined into a fleet p99. Histograms aggregate correctly in Prometheus and Grafana.

```go
import (
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promauto"
)

var requestDuration = promauto.NewHistogramVec(
    prometheus.HistogramOpts{
        Name:    "http_request_duration_seconds",
        Help:    "HTTP request latency.",
        Buckets: prometheus.DefBuckets, // 5ms–10s; tune for your SLO
    },
    []string{"method", "route", "status"},
)

// In your handler:
timer := prometheus.NewTimer(prometheus.ObserverFunc(func(d float64) {
    requestDuration.WithLabelValues(r.Method, route, strconv.Itoa(status)).Observe(d)
}))
defer timer.ObserveDuration()
```

Expose metrics via `promhttp`:

```go
http.Handle("/metrics", promhttp.Handler())
```

---

## Distributed Tracing with the OTel SDK

Set up a tracer provider that exports to any OTLP-compatible backend (Grafana Tempo, Jaeger, Honeycomb, Dynatrace, etc.):

```go
import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
    semconv "go.opentelemetry.io/otel/semconv/v1.21.0"
)

func initTracer(ctx context.Context) (*sdktrace.TracerProvider, error) {
    exp, err := otlptracehttp.New(ctx,
        otlptracehttp.WithEndpoint("localhost:4318"),
        otlptracehttp.WithInsecure(),
    )
    if err != nil {
        return nil, err
    }

    tp := sdktrace.NewTracerProvider(
        sdktrace.WithBatcher(exp),
        sdktrace.WithResource(resource.NewWithAttributes(
            semconv.SchemaURL,
            semconv.ServiceName("my-service"),
            semconv.ServiceVersion("1.0.0"),
        )),
    )
    otel.SetTracerProvider(tp)
    return tp, nil
}
```

Add manual spans for business logic:

```go
tracer := otel.Tracer("my-service")

func processOrder(ctx context.Context, orderID string) error {
    ctx, span := tracer.Start(ctx, "process-order",
        trace.WithAttributes(
            attribute.String("order.id", orderID),
        ),
    )
    defer span.End()

    if err := doWork(ctx, orderID); err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, err.Error())
        return err
    }
    return nil
}
```

Pass `ctx` through your call stack — OTel uses it to propagate trace context across goroutines and service boundaries.

---

## Correlating Signals — Exemplars

Exemplars are data points attached to a Prometheus metric observation that carry a `trace_id`. In Grafana, this lets you click on a spike in your latency histogram and jump directly to a representative trace.

```go
import (
    "github.com/prometheus/client_golang/prometheus"
    "go.opentelemetry.io/otel/trace"
)

// Observe with exemplar
spanCtx := trace.SpanFromContext(ctx).SpanContext()
if spanCtx.IsValid() {
    requestDuration.WithLabelValues(method, route, status).(prometheus.ExemplarObserver).
        ObserveWithExemplar(duration, prometheus.Labels{
            "trace_id": spanCtx.TraceID().String(),
        })
}
```

Enable exemplar storage in Prometheus (`--enable-feature=exemplar-storage`) and wire up Grafana's Tempo datasource link — then your metrics → traces correlation is one click.

---

## Definition of Done

Before calling instrumentation complete on a service, verify:

- [ ] Every inbound HTTP/gRPC request creates a root span with `http.method`, `http.route`, `http.status_code`
- [ ] Outbound calls (DB, HTTP, queue) are wrapped in child spans
- [ ] Errors call `span.RecordError(err)` and set `codes.Error`
- [ ] `log/slog` is wired through `otelslog` bridge — logs carry `trace_id`
- [ ] Latency histogram exists and uses meaningful bucket boundaries for your SLO
- [ ] `/metrics` endpoint is scraped by Prometheus
- [ ] OTLP traces reach your backend (check for spans in Tempo/Jaeger)
- [ ] At least one exemplar per histogram verified in Grafana

---

Once traces are flowing and correlated with logs and metrics, issues that used to take hours to diagnose become obvious in seconds. The investment in instrumentation pays back the first time a p99 spike leads you directly to a slow database query via one Grafana click.
