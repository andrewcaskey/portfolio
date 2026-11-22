import React from "react";
import "./SoftwareSkill.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function SkillIcon({ logo }) {
  const brandColor = logo.style && logo.style.color;
  const [hovered, setHovered] = React.useState(false);

  return (
    <li
      className="software-skill-inline"
      name={logo.skillName}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={
        hovered && brandColor
          ? { filter: `drop-shadow(0 0 10px ${brandColor})` }
          : undefined
      }
    >
      {logo.fontAwesomeClassname && (
        <span
          className="iconify"
          data-icon={logo.fontAwesomeClassname}
          style={{ color: hovered && brandColor ? brandColor : "#666666" }}
          data-inline="false"
        ></span>
      )}
      {!logo.fontAwesomeClassname && logo.imageSrc && (
        <img
          className="skill-image"
          style={{
            filter: hovered ? "none" : "grayscale(1) brightness(0.5)",
          }}
          src={`${process.env.PUBLIC_URL}/skills/${logo.imageSrc}`}
          alt={logo.skillName}
        />
      )}
    </li>
  );
}

class SoftwareSkill extends React.Component {
  render() {
    return (
      <div>
        <div className="software-skills-main-div">
          <ul className="dev-icons">
            {this.props.logos.map((logo) => {
              return (
                <OverlayTrigger
                  key={logo.skillName}
                  placement={"top"}
                  overlay={
                    <Tooltip id={`tooltip-top`}>
                      <strong>{logo.skillName}</strong>
                    </Tooltip>
                  }
                >
                  <SkillIcon logo={logo} />
                </OverlayTrigger>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default SoftwareSkill;
