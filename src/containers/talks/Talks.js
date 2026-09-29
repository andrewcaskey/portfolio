import React from "react";
import "./Talks.css";
import TalkCard from "../../components/talkCard/TalkCard";
import { talkSection } from "../../portfolio";
import { Fade } from "react-reveal";

export default function Talks() {
  return (
    <div className="main" id="talks">
      <div className="talk-header">
        <Fade bottom duration={1000} distance="30px">
          <h1 className="talk-header-title">{talkSection.title}</h1>
          <p className="subTitle talk-header-subtitle">
            {talkSection.subtitle}
          </p>
        </Fade>
        {talkSection.talks.map((talk, i) => {
          return (
            <Fade
              bottom
              duration={1000}
              distance="30px"
              delay={i * 100}
              key={i}
            >
              <TalkCard
                talkDetails={{
                  title: talk.title,
                  subtitle: talk.subtitle,
                  slides_url: talk.slides_url,
                  event_url: talk.event_url,
                  image: talk.image,
                }}
              />
            </Fade>
          );
        })}
      </div>
    </div>
  );
}
