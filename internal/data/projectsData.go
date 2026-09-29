package data

import "github.com/Kefrov/go-portfolio/internal/models"

var DataProjects = models.ProjectsData{
	ActivePage: 2,
	Projects: []models.Project{
		{
			Title:       "Market Research Platform",
			Url:         "",
			Description: "A foundational data layer for prospecting, market analysis, and RAG pipeline ingestion. Built with FastAPI, PostgreSQL, and Docker — designed to ingest, normalize, and serve structured market data at scale for downstream AI workflows.",
			ImagePath:   "/static/images/projects/market-research.png",
		},
		{
			Title:       "Observability Dashboards",
			Url:         "",
			Description: "Enterprise observability platform at HealthEquity spanning Dynatrace, OpenTelemetry, and Splunk. Covers SLO tracking, distributed tracing, log correlation, and automated alerting across Kubernetes workloads and AWS infrastructure.",
			ImagePath:   "/static/images/projects/observability.png",
		},
		{
			Title:       "Portfolio Site",
			Url:         "https://github.com/andrewcaskey/go-portfolio",
			Description: "This site — a minimal Go web server built on the go-portfolio template. Customized with personal data, bio, and project highlights. Deployed as a compiled binary with no external runtime dependencies.",
			ImagePath:   "/static/images/projects/portfolio.png",
		},
	},
}
