import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple"> Andrew Caskey </span>
            from <span className="purple"> Columbia, Missouri</span>
            <br />I am a junior pursuing Information Technology with a minor in Mathematics
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> 3D Designing
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Tech Blogs and Learning New Trends
            </li>
            <li className="about-activity">
              <ImPointRight /> Traveling and Photos
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
