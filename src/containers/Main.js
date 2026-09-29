import React, { Component } from "react";
import { Route, Switch, BrowserRouter, withRouter } from "react-router-dom";
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Education from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import Opensource from "../pages/opensource/Opensource";
import Contact from "../pages/contact/ContactComponent";
import Projects from "../pages/projects/Projects";
import BlogListPage from "../pages/blog/BlogListPage";
import BlogPostPage from "../pages/blog/BlogPostPage";
import { settings } from "../portfolio.js";
import Error404 from "../pages/errors/error404/Error";

function ScrollToTopBase({ location }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}
const ScrollToTop = withRouter(ScrollToTopBase);

export default class Main extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL || "/"}>
        <ScrollToTop />
        <Route
          render={({ location }) => (
            <div key={location.key} className="page-transition">
              <Switch location={location}>
                <Route
                  path="/"
                  exact
                  render={(props) => (
                    <Home {...props} theme={this.props.theme} />
                  )}
                />
                <Route
                  path="/home"
                  render={(props) => (
                    <Home {...props} theme={this.props.theme} />
                  )}
                />
                <Route
                  path="/experience"
                  exact
                  render={(props) => (
                    <Experience {...props} theme={this.props.theme} />
                  )}
                />
                <Route
                  path="/education"
                  render={(props) => (
                    <Education {...props} theme={this.props.theme} />
                  )}
                />
                <Route
                  path="/opensource"
                  render={(props) => (
                    <Opensource {...props} theme={this.props.theme} />
                  )}
                />
                <Route
                  path="/contact"
                  render={(props) => (
                    <Contact {...props} theme={this.props.theme} />
                  )}
                />

                {settings.isSplash && (
                  <Route
                    path="/splash"
                    render={(props) => (
                      <Splash {...props} theme={this.props.theme} />
                    )}
                  />
                )}

                <Route
                  path="/projects"
                  render={(props) => (
                    <Projects {...props} theme={this.props.theme} />
                  )}
                />
                <Route
                  path="/blog"
                  exact
                  render={(props) => (
                    <BlogListPage {...props} theme={this.props.theme} />
                  )}
                />
                <Route
                  path="/blog/:slug"
                  render={(props) => (
                    <BlogPostPage {...props} theme={this.props.theme} />
                  )}
                />
                <Route
                  path="*"
                  render={(props) => (
                    <Error404 {...props} theme={this.props.theme} />
                  )}
                />
              </Switch>
            </div>
          )}
        />
      </BrowserRouter>
    );
  }
}
