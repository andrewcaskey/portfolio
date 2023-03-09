import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import partnerslc from "../../Assets/Projects/partnerslc.png";
import chatify from "../../Assets/Projects/markdown-live.png";
import learnwithme from "../../Assets/Projects/learnwithme.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Recent <strong className="purple"> Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Markdown Live"
              description="A real time markdown preview built with React.js. "
              ghLink="https://github.com/andrewcaskey/markdown-live"
              demoLink="https://capable-medovik-d6037e.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={learnwithme}
              isBlog={false}
              title="Learn With Me"
              description="I have created my personal blog using Next.js and Tailwind CSS, allowing the content to be sourced from markdown files and rendered with Next.js. The blog also features a dark mode and the markdown format makes it easy to write new posts."
              demoLink="https://poetic-snickerdoodle-2591ef.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={partnerslc}
              isBlog={false}
              title="Partners Loss Consulting"
              description="A fully responsive and functional website I built and manage hosting for. Partners Loss Consulting is an Illinois based public adjusting company."
              demoLink="https://partnerslc.com/"              
            />
          </Col>
          
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
