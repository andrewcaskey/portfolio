package data

import "github.com/Kefrov/go-portfolio/internal/models"

var DataHome = models.HomeData{
	ActivePage:  0,
	Name:        "Andrew",
	Surname:     "Caskey",
	Subtitle:    "Observability Engineer",
	Description: "I build and scale observability platforms that give engineering teams deep visibility into complex distributed systems. Specializing in Dynatrace, OpenTelemetry, and cloud-native infrastructure on AWS and Kubernetes.",
	Socials: models.Socials{
		GitHub:   "https://github.com/andrewcaskey",
		LinkedIn: "https://www.linkedin.com/in/andrew-caskey/",
	},
}
