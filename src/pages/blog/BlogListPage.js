import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import { blogSection } from "../../portfolio";
import "./BlogListPage.css";

export default function BlogListPage({ theme }) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Canonical taxonomy order; only categories that actually have posts are shown.
  const CATEGORY_ORDER = ["Observability", "Docker", "AWS", "Cloudflare", "AI"];
  const present = new Set(blogSection.posts.map((p) => p.category));
  const categories = [
    "All",
    ...CATEGORY_ORDER.filter((c) => present.has(c)),
    ...[...present].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  const filtered =
    activeCategory === "All"
      ? blogSection.posts
      : blogSection.posts.filter((p) => p.category === activeCategory);

  return (
    <div className="blog-list-main">
      <Header theme={theme} />
      <div className="basic-blog-list">
        <Fade bottom duration={1000} distance="40px">
          <div className="blog-list-header">
            <h1 className="blog-list-title" style={{ color: theme.text }}>
              {blogSection.title}
            </h1>
            <p
              className="blog-list-subtitle subTitle"
              style={{ color: theme.secondaryText }}
            >
              {blogSection.subtitle}
            </p>
            {blogSection.externalBlog && (
              <a
                className="blog-external-link"
                href={blogSection.externalBlog.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.imageHighlight }}
              >
                {blogSection.externalBlog.label} →
              </a>
            )}
          </div>

          <div className="blog-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`blog-filter-btn${
                  activeCategory === cat ? " active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
                style={
                  activeCategory === cat
                    ? {
                        background: theme.imageHighlight,
                        color: "#fff",
                        borderColor: theme.imageHighlight,
                      }
                    : { color: theme.text, borderColor: theme.text }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blog-cards-container">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="blog-list-card"
                style={{ borderColor: theme.highlight }}
              >
                <p
                  className="blog-card-date"
                  style={{ color: theme.secondaryText }}
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="blog-card-meta">
                  {post.category && (
                    <span className="blog-card-category">{post.category}</span>
                  )}
                  {post.series && (
                    <span
                      className="blog-card-series"
                      style={{ color: theme.secondaryText }}
                    >
                      {post.series} · Part {post.seriesOrder}
                    </span>
                  )}
                </div>
                <h2
                  className="blog-list-card-title"
                  style={{ color: theme.text }}
                >
                  {post.title}
                </h2>
                <p
                  className="blog-card-desc"
                  style={{ color: theme.secondaryText }}
                >
                  {post.description}
                </p>
                <span
                  className="blog-card-read-more"
                  style={{ color: theme.imageHighlight }}
                >
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </Fade>
      </div>
      <Footer theme={theme} />
      <TopButton theme={theme} />
    </div>
  );
}
