# DevNotes: Markdown Blog Implementation Plan & Architecture Guide

## 1. Executive Summary & Tech Stack

This project is a high-performance, static-first engineering blog built with **Vite**, **React**, and **Tailwind CSS v3**. It eliminates server-side rendering and database management by bundling markdown files directly at compile time through Vite's native `import.meta.glob`.

### Core Technology Stack
- **Build Tool & Bundler**: [Vite](https://vite.dev/) v6+
- **Frontend Framework**: [React](https://react.dev/) v19
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) (`@tailwindcss/typography`, Autoprefixer, PostCSS)
- **Routing**: [React Router](https://reactrouter.com/) v7
- **Markdown & Syntax Highlighting**: `react-markdown`, `remark-gfm`, `rehype-highlight`, `highlight.js` (Atom One Dark theme)
- **Front Matter Parser**: `front-matter`
- **Iconography**: `lucide-react`
- **Test Runner & Utilities**: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`

---

## 2. Directory & Component Architecture

```
src/
├── assets/                  # Static assets & brand media
├── components/
│   ├── common/              # Generic design system components
│   │   ├── Button.jsx       # Multi-variant button (primary, outline, ghost, loading)
│   │   ├── Tag.jsx          # Tag pill with count badge and active state
│   │   └── Spinner.jsx      # Animated SVG loader
│   ├── layout/              # Shared structural elements
│   │   ├── Header.jsx       # Sticky glassmorphism nav with dark mode toggle & mobile drawer
│   │   ├── Footer.jsx       # Minimalist footer with tech badges
│   │   └── Layout.jsx       # Layout shell wrapping router outlet
│   └── blog/                # Blog-specific presentation components
│       ├── SearchBar.jsx    # Realtime search with keyboard shortcut '/' & clear action
│       ├── TagFilter.jsx    # Horizontal category selector
│       ├── PostCard.jsx     # Responsive card with hover zoom, tags & metadata
│       ├── PostList.jsx     # Card grid, empty state fallback, and pagination
│       ├── TableOfContents.jsx # H2/H3 heading extractor with active scrollspy
│       └── MarkdownRenderer.jsx # Typography container, interactive code copy buttons, GFM tables
├── content/
│   └── posts/               # Raw .md files with YAML frontmatter
│       ├── hello-world.md
│       ├── mastering-tailwind-css-v3.md
│       ├── react-performance-tips.md
│       ├── building-modern-markdown-blogs.md
│       └── fullstack-ai-agents-playbook.md
├── hooks/
│   ├── useDebounce.js       # Input debouncer hook
│   ├── useTheme.js          # Class-based dark mode manager with localStorage persistence
│   └── usePosts.js          # Post query, search, tag filtering, and pagination state
├── pages/
│   ├── Home.jsx             # Hero banner, featured post, search & filtered post grid
│   ├── PostDetail.jsx       # Article view with reading progress bar & TOC sidebar
│   ├── Tags.jsx             # Tag directory with post counts & tag-specific archives
│   └── NotFound.jsx         # Custom 404 error page with recovery navigation
├── routes/
│   └── AppRouter.jsx        # Lazy-loaded code-split routes with React.Suspense
├── services/
│   └── postService.js       # import.meta.glob loader, frontmatter extractor, search & tag indexer
├── styles/
│   └── index.css            # Tailwind directives, highlight.js styles, custom scrollbars
├── test/
│   ├── setup.js             # Vitest DOM environment setup
│   ├── utils.test.js        # Unit tests for slugify, formatDate, and readingTime
│   ├── postService.test.js  # Service tests for post loading, sorting, and querying
│   └── components.test.jsx  # Component tests with React Testing Library
├── utils/
│   ├── formatDate.js        # Intl date formatter
│   ├── readingTime.js       # Word counter & WPM reading estimator
│   └── slugify.js           # URL-safe slug generator
├── App.jsx                  # Root router wrapper
└── main.jsx                 # Entry point with React 19 root
```

---

## 3. Post Format Specification

All articles are stored as standard Markdown files inside `src/content/posts/` and adhere to YAML frontmatter syntax:

```markdown
---
title: "Article Title"
date: "2026-10-09"
tags: [react, tailwind, architecture]
excerpt: "One or two sentence summary displayed on cards and SEO previews."
cover: "https://images.unsplash.com/photo-xxx"
---

# Main Article Title

Article body written in GitHub Flavored Markdown (GFM).

## Code Snippet Example

```javascript
export function greet(name) {
  return `Hello, ${name}!`;
}
```
```

---

## 4. Key Functional Features

1. **Build-Time Markdown Bundling (`postService.js`)**:
   - Uses `import.meta.glob('/src/content/posts/*.md', { query: '?raw', eager: true })`
   - Bundles all raw Markdown at compile time; zero client-server latency.
   - Derives clean slugs from filenames.
   - Sorts posts in descending chronological order.

2. **Debounced Realtime Search**:
   - Realtime full-text search across article titles, excerpts, tags, and bodies.
   - Debounced by 250ms via `useDebounce` to prevent DOM thrashing.
   - Keyboard hotkey (`/`) focuses search immediately.

3. **Dynamic Table of Contents & Scrollspy**:
   - Automatically parses `##` (H2) and `###` (H3) headings from the Markdown body.
   - Syncs active heading via `IntersectionObserver`.
   - Smoothly scrolls to heading offsets on click.

4. **Rich Code Blocks**:
   - Live syntax highlighting via `rehype-highlight` and Atom One Dark styles.
   - One-click copy to clipboard with active check animation.

5. **Class-Based Dark Mode**:
   - Configured with Tailwind's `darkMode: 'class'`.
   - Persisted across reloads using `localStorage`.
   - Auto-detects operating system color scheme preference.

6. **Reading Progress Bar**:
   - Top-affixed progress bar tracking vertical scroll depth through long-form articles.

7. **Production Deployment Ready**:
   - `vercel.json` and `public/_redirects` configured for Single Page Application (SPA) rewrites.

---

## 5. Verification & Testing

Run unit and component tests:
```bash
npm test
```

Start the local development server:
```bash
npm run dev
```

Build the optimized production bundle:
```bash
npm run build
```
