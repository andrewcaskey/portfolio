import React, { Component } from "react";
import "./Header.css";
import { Fade } from "react-reveal";
import { NavLink } from "react-router-dom";
import SeoHeader from "../seoHeader/SeoHeader";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

class Header extends Component {
  render() {
    return (
      <Fade top duration={1000} distance="20px">
        <SeoHeader />
        <div>
          <header className="header">
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label
              className="menu-icon"
              htmlFor="menu-btn"
              aria-label="Toggle navigation"
            >
              <span className="navicon"></span>
            </label>
            <ul className="menu">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    exact={to === "/"}
                    to={to}
                    className="grey-color"
                    activeClassName="active"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </header>
        </div>
      </Fade>
    );
  }
}

export default Header;
