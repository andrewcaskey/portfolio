import React from "react";
import "./Skills.css";
import SkillSection from "./SkillSection";
import { skills } from "../../portfolio";
import { Fade } from "react-reveal";

export default function Skills(props) {
  const theme = props.theme;
  return (
    <div className="main" id="skills">
      <div className="skills-header-div">
        <Fade bottom duration={2000} distance="20px">
          <div>
            {skills.subTitle && (
              <p
                className="subTitle skills-header-subtitle"
                style={{ color: theme.secondaryText }}
              >
                {skills.subTitle}
              </p>
            )}
            <h1 className="skills-header" style={{ color: theme.text }}>
              What I Do?
            </h1>
          </div>
        </Fade>
      </div>
      <SkillSection theme={theme} />
    </div>
  );
}
