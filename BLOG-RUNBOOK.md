# Portfolio Blog Runbook

How to add, update, or remove blog posts on andrewcaskey.com.

## Architecture

The portfolio is a React app (Create React App) deployed to GitHub Pages via the `gh-pages` branch.

Blog posts are:

1. **Markdown files** in `public/blogs/{slug}.md`
2. **Metadata entries** in `src/portfolio.js` under `blogSection.posts[]`

At runtime, `BlogPostPage.js` fetches `/blogs/{slug}.md` and renders it with `react-markdown` + `remark-gfm` (supports tables, strikethrough, etc).

The blog list page (`BlogListPage.js`) reads the `posts` array from `portfolio.js` and renders cards with category filtering.

## File Locations

```
portfolio/
├── public/blogs/              ← Markdown post files go here
│   ├── machine-native-web.md
│   ├── linux-namespaces-container-isolation.md
│   ├── docker-from-the-ground-up.md
│   ├── agentic-web-security.md
│   └── getting-started-with-opentelemetry.md
├── src/
│   ├── portfolio.js           ← Blog metadata (blogSection.posts[])
│   └── pages/blog/
│       ├── BlogListPage.js    ← Blog index page with category filter
│       ├── BlogListPage.css
│       ├── BlogPostPage.js    ← Single post renderer (fetches .md)
│       └── BlogPostPage.css
└── CNAME                      ← andrewcaskey.com
```

## Adding a New Blog Post

### Step 1: Create the Markdown file

```bash
# From the portfolio root
touch public/blogs/my-new-post.md
```

Write your post in standard Markdown (GFM supported — tables, code blocks, etc). The file name IS the slug used in the URL: `andrewcaskey.com/blog/my-new-post`.

**Do NOT include frontmatter** — this is plain Markdown, not Astro/Jekyll. Start with `# Title`.

### Step 2: Add metadata to portfolio.js

Open `src/portfolio.js` and add an entry to the `posts` array inside `blogSection`. Posts are displayed in array order (first = newest), so add new posts at the **top** of the array.

```js
const blogSection = {
  title: "Blog",
  subtitle: "Thoughts on observability, infrastructure, and engineering.",
  externalBlog: {
    label: "Read more on my SRE blog",
    url: "https://sre.andrewcaskey.com",
  },
  posts: [
    {
      slug: "my-new-post", // Must match filename (without .md)
      title: "My New Post Title",
      date: "2026-11-15", // YYYY-MM-DD format
      category: "AI", // Used for filter tabs
      series: null, // Or "Series Name" for multi-part
      seriesOrder: null, // Or 1, 2, 3... for series ordering
      description: "One-line summary shown on the blog list card.",
    },
    // ... existing posts
  ],
};
```

**Category taxonomy** (defined in `BlogListPage.js` line 14):

- Observability, Docker, AWS, Cloudflare, AI
- New categories appear automatically if you use a new string

### Step 3: Build and deploy

```bash
# Test locally
npm start
# Visit http://localhost:3000/blog and http://localhost:3000/blog/my-new-post

# Deploy to GitHub Pages
npm run deploy
```

`npm run deploy` runs `react-scripts build` then `gh-pages -b gh-pages -d build --dotfiles`, pushing the `build/` directory to the `gh-pages` branch.

## Updating an Existing Post

1. Edit the `.md` file in `public/blogs/`
2. If title/date/description changed, update the matching entry in `src/portfolio.js`
3. `npm run deploy`

## Deleting a Post

1. Delete the `.md` file from `public/blogs/`
2. Remove the entry from `blogSection.posts[]` in `src/portfolio.js`
3. `npm run deploy`

## Deploying

### GitHub Pages (primary)

```bash
npm run deploy
```

### Cloudflare Pages (alternative)

```bash
npm run deploy:cloudflare
# Requires: npx wrangler login (first time)
```

## Troubleshooting

| Problem                     | Fix                                                                           |
| --------------------------- | ----------------------------------------------------------------------------- |
| Post shows "Post not found" | Slug in portfolio.js doesn't match filename in public/blogs/                  |
| Blog posts 404 on GH Pages  | Ensure `.nojekyll` exists in public/ (prevents Jekyll processing)             |
| New category not showing    | It auto-appears; check spelling matches exactly                               |
| Tables not rendering        | Ensure remark-gfm is installed (it is in current package.json)                |
| Images in posts             | Put images in `public/blogs/images/` and reference as `/blogs/images/foo.png` |

## Quick Reference

```bash
# Add a post (two files to touch):
vim public/blogs/my-slug.md          # Write the content
vim src/portfolio.js                   # Add metadata entry at top of posts[]

# Deploy:
npm run deploy

# Verify:
# https://andrewcaskey.com/blog/my-slug
```
