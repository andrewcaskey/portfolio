import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import ErrorBoundary from "../../components/ErrorBoundary";
import { blogSection } from "../../portfolio";
import "./BlogPostPage.css";

export default function BlogPostPage({ theme }) {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const posts = blogSection.posts;
  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = idx < posts.length - 1 ? posts[idx + 1] : null;
  const next = idx > 0 ? posts[idx - 1] : null;

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`${process.env.PUBLIC_URL}/blogs/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="blog-post-main">
      <Header theme={theme} />
      <div className="blog-post-content">
        <ErrorBoundary textColor={theme.text}>
          <div>
            <Link
              to="/blog"
              className="blog-back-link"
              style={{ color: theme.imageHighlight }}
            >
              ← Back to Blog
            </Link>
            {loading && (
              <p
                className="blog-post-loading"
                style={{ color: theme.secondaryText }}
              >
                Loading...
              </p>
            )}
            {error && (
              <div className="blog-post-error">
                <h2 style={{ color: theme.text }}>Post not found</h2>
                <p style={{ color: theme.secondaryText }}>
                  The post "{slug}" could not be loaded.
                </p>
              </div>
            )}
            {!loading && !error && (
              <div className="blog-markdown-body" style={{ color: theme.text }}>
                <ReactMarkdown
                  plugins={[gfm]}
                  renderers={{
                    table: ({ children }) => (
                      <div className="blog-table-scroll">
                        <table>{children}</table>
                      </div>
                    ),
                    code: ({ language, value }) => (
                      <div className="blog-code-scroll">
                        <pre>
                          <code
                            className={language ? `language-${language}` : ""}
                          >
                            {value}
                          </code>
                        </pre>
                      </div>
                    ),
                  }}
                >
                  {markdown}
                </ReactMarkdown>
                <div className="blog-post-nav">
                  {prev && (
                    <Link
                      to={`/blog/${prev.slug}`}
                      className="blog-nav-prev"
                      style={{ color: theme.imageHighlight }}
                    >
                      ← {prev.title}
                    </Link>
                  )}
                  {next && (
                    <Link
                      to={`/blog/${next.slug}`}
                      className="blog-nav-next"
                      style={{ color: theme.imageHighlight }}
                    >
                      {next.title} →
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </ErrorBoundary>
      </div>
      <Footer theme={theme} />
      <TopButton theme={theme} />
    </div>
  );
}
