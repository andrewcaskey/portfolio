import React, { Component } from "react";
import "./Header.css";
import { Fade } from "react-reveal";
import SeoHeader from "../seoHeader/SeoHeader";

// Mouse event handlers removed as they're not being used

class Header extends Component {
  render() {
    return (
      <Fade top duration={1000} distance="20px">
        <SeoHeader />
        <div>
          <header className="header">
            {/* Header menu and controls removed as requested */}
          </header>
        </div>
      </Fade>
    );
  }
}
export default Header;
