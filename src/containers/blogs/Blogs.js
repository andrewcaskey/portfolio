import React from "react";
import "./Blog.css";
import { Link } from "react-router-dom";
import { blogSection } from "../../portfolio";
import { Fade } from "react-reveal";

export default function Blogs() {
  return (
    <div className="main" id="blogs">
      <Fade bottom duration={1000} distance="30px">
        <div className="blog-header">
          <h1 className="blog-header-text">{blogSection.title}</h1>
          <p className="subTitle blog-subtitle">{blogSection.subtitle}</p>
        </div>
      </Fade>
      <div className="blog-main-div">
        <div className="blog-text-div">
          {blogSection.posts.map((post, i) => (
            <Fade
              bottom
              duration={1000}
              distance="30px"
              delay={i * 100}
              key={post.slug}
            >
              <Link to={`/blog/${post.slug}`} className="blog-preview-card">
                {post.category && (
                  <p className="blog-preview-category">{post.category}</p>
                )}
                <h3 className="blog-preview-title">{post.title}</h3>
                <p className="blog-preview-desc">{post.description}</p>
                <span className="blog-preview-link">Read more →</span>
              </Link>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
}
