---
title: "Hello World: Welcome to DevNotes"
date: "2026-10-09"
tags: [react, tailwind, intro]
excerpt: "Welcome to our brand-new markdown engineering journal. Here is how this static-first, zero-backend blog is built."
cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
---

# Welcome to DevNotes

Welcome to **DevNotes**, a high-performance, developer-centric publication engine. This blog is crafted with **Vite**, **React**, **Tailwind CSS**, and modern Markdown parsing technologies.

## Why a Markdown-Driven Architecture?

Markdown gives developers supreme portability and control over their technical writings. Instead of maintaining databases and complex CMS dashboards, every post is a pure version-controlled file in your Git repository.

### Key Architectural Highlights

1. **Zero Runtime API Lag**: All posts are bundled and indexed at build time using Vite's `import.meta.glob`.
2. **First-class Developer Experience**: Write code blocks with live syntax highlighting powered by `rehype-highlight`.
3. **Responsive by Design**: Fluid typographies styled with `@tailwindcss/typography`.
4. **Dark Mode First**: Seamless transitions between day and midnight color schemes with persistent state.

```javascript
// Bundling posts with Vite
const postModules = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  eager: true,
});

export function getAllPosts() {
  return Object.entries(postModules).map(([path, raw]) => {
    const { attributes, body } = parseFrontMatter(raw);
    return { ...attributes, body };
  });
}
```

## Interactive Components & Code Samples

Here is an example of an asynchronous utility function in modern JavaScript:

```typescript
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export async function fetchRelatedPosts(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}
```

> **Tip:** You can use the search bar on the homepage or click on any tag badge to instantly filter posts!

Enjoy reading, and stay tuned for our upcoming deep-dives into React 19, Tailwind tricks, and high-velocity web engineering.
