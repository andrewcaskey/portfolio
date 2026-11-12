# Docker from the Ground Up: A Hierarchical View

**Date:** May 31, 2026 · **Category:** Docker · **Series:** Docker Deep Dive (Part 1)

---

Most engineers think of Docker as "the thing that runs containers." That's true the way saying "git is the thing that saves files" is true — accurate, but missing everything interesting. Docker is a layered system of cooperating components, each with a precise responsibility. Understanding that stack is the prerequisite for everything else in this series.

---

## What Docker Actually Is

Docker is a client–daemon architecture sitting on top of several lower-level Linux primitives. The `docker` binary you type commands into is just a client that speaks to a daemon over a Unix socket. The daemon itself doesn't run containers — it delegates that to a chain of smaller components, each doing one job.

The reason it's split up this way matters: any single layer can be swapped without touching the others. Kubernetes doesn't use the Docker daemon at all — it talks directly to `containerd`. Google's gVisor replaces `runc` with a user-space kernel. The abstraction boundaries are real and load-bearing.

---

## The Component Stack

| Layer | Binary | Responsibility |
|---|---|---|
| CLI | `docker` | Parse commands, format output, call daemon API |
| Daemon | `dockerd` | Image management, networking, volumes, API server |
| Container runtime | `containerd` | Container lifecycle: create, start, stop, delete |
| Shim | `containerd-shim-runc-v2` | Decouple container process from containerd |
| Low-level runtime | `runc` | Spawn the actual container process from an OCI bundle |

### Docker CLI

The CLI is thin. `docker run nginx` serializes your intent into a REST call to `dockerd`'s API (default: `unix:///var/run/docker.sock`). It does no work itself — it's a well-designed HTTP client with nice output formatting.

### dockerd

The daemon is the user-facing brain. It owns:

- **Image management** — pulling, caching, layering images via the content-addressable store
- **Networking** — creating bridge networks, managing `iptables` rules, DNS for container hostnames
- **Volumes** — bind mounts and managed volumes
- **The API** — the REST surface the CLI (and Compose, and Portainer, and everything else) calls

`dockerd` does not directly run containers. It delegates to `containerd`.

### containerd

`containerd` is a CNCF-graduated project that `dockerd` bundles and controls. It owns the **container lifecycle**: creating, starting, pausing, stopping, and deleting containers. It also manages image snapshots on disk.

Critically, `containerd` speaks the CRI (Container Runtime Interface) — which is why Kubernetes can use it directly, bypassing `dockerd` entirely.

### containerd-shim

When `containerd` starts a container, it forks a shim process that stays alive for the lifetime of that container. The shim serves two purposes:

1. **Daemonless containers** — if `containerd` (or `dockerd`) crashes or restarts, the container keeps running because the shim holds the container's stdio and exit status.
2. **Reporting** — the shim reports exit codes back to `containerd` after the container finishes.

You'll see one `containerd-shim-runc-v2` process per running container if you `ps aux` on the host.

### runc

`runc` is the OCI-compliant low-level runtime. It takes an **OCI bundle** and calls the Linux kernel directly to create the container process. Once the container starts, `runc` exits — it hands control to the shim and is done.

`runc` is where the actual kernel API calls happen: `clone()` with namespace flags, `pivot_root()` for the filesystem, `execve()` for the container's entrypoint.

---

## Walking Through `docker run nginx`

```
docker run nginx
  │
  ▼
dockerd API (POST /containers/create + /start)
  │   - Pull image if needed
  │   - Set up networking
  │   - Prepare container config
  ▼
containerd (create container)
  │   - Snapshot the image layers into a merged rootfs
  │   - Write OCI bundle (config.json + rootfs/)
  ▼
containerd-shim (fork, stay alive)
  │
  ▼
runc (exec OCI bundle)
  │   - clone(CLONE_NEWPID | CLONE_NEWNET | CLONE_NEWNS | ...)
  │   - pivot_root(rootfs)
  │   - execve("/docker-entrypoint.sh")
  │   - exits
  ▼
nginx process (PID 1 inside container, lives until stopped)
```

Every arrow is a real process boundary. `runc` exiting after launch is intentional — it's a one-shot tool, not a supervisor.

---

## The OCI Bundle

The Open Container Initiative defines the format `runc` consumes. An OCI bundle is a directory containing:

```
bundle/
├── config.json      # Everything runc needs: namespaces, capabilities, mounts, env, entrypoint
└── rootfs/          # The container's filesystem (merged image layers)
    ├── bin/
    ├── etc/
    └── ...
```

`config.json` is where isolation is specified. It lists which namespaces to create, which Linux capabilities to grant, what the root filesystem path is, and what process to exec. You can generate one with `runc spec` and read it — it's plain JSON and surprisingly readable.

---

## Why the Layering Matters

**Swappable runtimes.** Replace `runc` with `runsc` (gVisor) and your container runs inside a user-space kernel that intercepts all syscalls — useful for untrusted workloads. Replace it with `kata-runtime` and each container gets a lightweight VM. `containerd` doesn't care which OCI runtime it calls.

**Kubernetes dropped dockerd.** In Kubernetes 1.24, support for the Docker daemon as a container runtime was removed. Clusters now talk to `containerd` directly via CRI. Your containers still work — they're just OCI bundles running under `runc`. The Docker daemon was never involved at the container level.

**Debugging is layer-specific.** A container that won't start is a `runc`/OCI problem. A container that can't reach the network is a `dockerd`/`containerd` networking problem. An image that won't pull is a `dockerd` registry/snapshot problem. Knowing which layer owns what tells you where to look.

---

## What's Next

We've traced the path from `docker run` down to the `clone()` syscall, but I glossed over the most important part of what `runc` does: it passes namespace flags to `clone()`. Those flags are the actual mechanism of isolation.

In part 2 we'll go deep on Linux namespaces — all seven types, how Docker configures them, and how to observe and manipulate them directly without Docker.
