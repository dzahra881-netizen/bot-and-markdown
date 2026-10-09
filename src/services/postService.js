import frontMatter from 'front-matter'
import { calculateReadingTime } from '@/utils/readingTime'

// Load all markdown files at build-time using Vite's eager glob
const postFiles = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  eager: true,
})

/**
 * Parses and returns all blog posts sorted by publication date descending.
 * @returns {Array<Object>} List of processed blog post objects
 */
export function getAllPosts() {
  const posts = Object.entries(postFiles).map(([filepath, fileContent]) => {
    // Extract raw string content safely across different Vite versions
    const raw = typeof fileContent === 'string' ? fileContent : (fileContent?.default || '')
    
    let attributes = {}
    let body = raw

    try {
      const parsed = frontMatter(raw)
      attributes = parsed.attributes || {}
      body = parsed.body || ''
    } catch (err) {
      console.warn(`Failed to parse frontmatter in ${filepath}:`, err)
    }

    // Derive slug from filename: /src/content/posts/hello-world.md -> hello-world
    const filename = filepath.split('/').pop() || ''
    const slug = attributes.slug || filename.replace(/\.md$/, '')

    // Reading time calculation
    const readingTime = calculateReadingTime(body)

    // Normalize tags into lowercase array
    const tags = Array.isArray(attributes.tags)
      ? attributes.tags.map(t => String(t).toLowerCase().trim())
      : []

    return {
      slug,
      title: attributes.title || slug,
      date: attributes.date ? String(attributes.date) : '',
      tags,
      excerpt: attributes.excerpt || '',
      cover: attributes.cover || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      body,
      readingTime: readingTime.text,
      words: readingTime.words,
      minutes: readingTime.minutes,
      ...attributes,
    }
  })

  // Sort posts by date descending (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0
    const dateB = new Date(b.date).getTime() || 0
    return dateB - dateA
  })
}

/**
 * Fetches a single post by its URL slug.
 * @param {string} slug 
 * @returns {Object|null}
 */
export function getPostBySlug(slug) {
  if (!slug) return null
  const posts = getAllPosts()
  return posts.find(post => post.slug.toLowerCase() === slug.toLowerCase()) || null
}

/**
 * Retrieves all unique tags along with their post count.
 * @returns {Array<{ name: string, count: number }>}
 */
export function getAllTags() {
  const posts = getAllPosts()
  const tagCountMap = {}

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCountMap[tag] = (tagCountMap[tag] || 0) + 1
    })
  })

  return Object.entries(tagCountMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Filters posts by a specific tag.
 * @param {string} tag 
 * @returns {Array<Object>}
 */
export function getPostsByTag(tag) {
  if (!tag) return getAllPosts()
  const lowerTag = tag.toLowerCase()
  return getAllPosts().filter(post => post.tags.includes(lowerTag))
}

/**
 * Performs search across post titles, excerpts, tags, and bodies.
 * @param {string} query 
 * @returns {Array<Object>}
 */
export function searchPosts(query = '') {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return getAllPosts()

  return getAllPosts().filter(post => {
    const titleMatch = post.title.toLowerCase().includes(trimmed)
    const excerptMatch = post.excerpt.toLowerCase().includes(trimmed)
    const tagMatch = post.tags.some(t => t.toLowerCase().includes(trimmed))
    const bodyMatch = post.body.toLowerCase().includes(trimmed)
    return titleMatch || excerptMatch || tagMatch || bodyMatch
  })
}
