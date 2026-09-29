import React from "react";
import "./StartupProjects.css";
import { bigProjects } from "../../portfolio";
import { Fade } from "react-reveal";

export default function StartupProject() {
  function openProjectInNewWindow(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }

  return (
    <div className="main" id="projects">
      <div>
        <Fade bottom duration={1000} distance="30px">
          <h1 className="skills-heading">{bigProjects.title}</h1>
          <p className="subTitle project-subtitle">{bigProjects.subtitle}</p>
        </Fade>
        <div className="startup-projects-main">
          <div className="startup-project-text">
            {bigProjects.projects.map((project, i) => {
              return (
                <Fade
                  bottom
                  duration={1000}
                  distance="30px"
                  delay={i * 100}
                  key={i}
                >
                  <div
                    className="saaya-health-div"
                    onClick={() => openProjectInNewWindow(project.link)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) =>
                      e.key === "Enter" && openProjectInNewWindow(project.link)
                    }
                    aria-label={`Open ${
                      project.projectName || "project"
                    } in new tab`}
                  >
                    <img
                      alt={project.projectName || "Project screenshot"}
                      src={project.image}
                      width="300"
                      height="200"
                      style={{ maxWidth: "100%", height: "auto" }}
                    ></img>
                  </div>
                </Fade>
              );
            })}
          </div>
          <div className="starup-project-image"></div>
        </div>
      </div>
    </div>
  );
}
