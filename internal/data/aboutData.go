package data

import (
	"html/template"

	"github.com/Kefrov/go-portfolio/internal/models"
)

var DataAbout = models.AboutData{
	ActivePage: 1,
	Paragraphs: []template.HTML{
		`I'm an <span class="highlight">Observability Engineer</span> at <span class="highlight">HealthEquity</span>, where I design and operate enterprise-scale monitoring platforms that surface actionable insights across distributed infrastructure. My work centers on <span class="highlight">Dynatrace</span> and <span class="highlight">OpenTelemetry</span> — from instrumentation strategy to alert design to SLO frameworks.`,
		`My toolbelt spans the modern observability and DevOps stack: <span class="highlight">Dynatrace</span>, <span class="highlight">OpenTelemetry</span>, <span class="highlight">Splunk</span>, <span class="highlight">AWS</span>, <span class="highlight">Kubernetes</span>, <span class="highlight">Terraform</span>, <span class="highlight">Python</span>, and <span class="highlight">Bash</span>. I'm drawn to problems where data quality, system reliability, and automation intersect — building platforms that developers and on-call engineers can actually trust.`,
		`I hold a <span class="highlight">BS in Information Technology</span> from the University of Missouri (2024) and am certified as an <span class="highlight">AWS Developer Associate</span>, <span class="highlight">AWS Cloud Practitioner</span>, and <span class="highlight">Dynatrace Certified Associate</span>. When I'm not tuning dashboards, I'm building tooling to automate the repetitive parts of engineering work.`,
	},
}
