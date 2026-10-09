---
title: "Building Static-First Blogs with Vite, Markdown, and Remark"
date: "2026-10-04"
tags: [markdown, vite, webdev, architecture]
excerpt: "Learn how to turn local markdown files into a lightning-fast dynamic portfolio and blog without servers or headless CMS overhead."
cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
---

# Building Static-First Blogs with Vite and Markdown

Publishing content shouldn't require managing databases, setting up serverless function cold starts, or paying recurring subscription fees to SaaS CMS tools.

## The Raw Module Bundling Pattern

Vite features native glob imports that can read static assets directly:

```javascript
const rawFiles = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  eager: true,
});
```

By specifying `{ query: '?raw', eager: true }`, Vite embeds the raw markdown strings into the build output synchronously at compile time.

### Advantages of This Approach

- **Instant Hydration**: No loading spinners or pending HTTP requests when navigating between articles.
- **Offline First**: Works flawlessly without network access once cached via Service Worker.
- **Infinite Scalability**: Can be hosted for free on GitHub Pages, Vercel, Netlify, or AWS S3 CloudFront.

## Parsing Frontmatter and AST Pipelines

Using `front-matter` splits metadata (title, date, tags, cover image) from the article's body. The article body is then transformed by `react-markdown`:

```
Raw Markdown -> front-matter -> AST (remark-gfm) -> HTML AST (rehype-highlight) -> React Components
```

This pipeline allows effortless GitHub-flavored Markdown support, including tables, task lists, strikethrough, and autolinked URLs.
