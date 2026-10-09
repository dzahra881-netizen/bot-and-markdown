import { describe, it, expect } from 'vitest'
import { getAllPosts, getPostBySlug, getAllTags, getPostsByTag, searchPosts } from '../services/postService'

describe('postService', () => {
  it('loads all posts bundled at build-time', () => {
    const posts = getAllPosts()
    expect(posts.length).toBeGreaterThan(0)
    expect(posts[0]).toHaveProperty('title')
    expect(posts[0]).toHaveProperty('slug')
    expect(posts[0]).toHaveProperty('readingTime')
  })

  it('sorts posts by date descending', () => {
    const posts = getAllPosts()
    for (let i = 0; i < posts.length - 1; i++) {
      const currentDate = new Date(posts[i].date).getTime()
      const nextDate = new Date(posts[i + 1].date).getTime()
      expect(currentDate).toBeGreaterThanOrEqual(nextDate)
    }
  })

  it('retrieves post by slug', () => {
    const post = getPostBySlug('hello-world')
    expect(post).not.toBeNull()
    expect(post?.title).toBe('Hello World: Welcome to DevNotes')
  })

  it('returns null for non-existent slug', () => {
    const post = getPostBySlug('non-existent-slug-xyz')
    expect(post).toBeNull()
  })

  it('aggregates unique tags with counts', () => {
    const tags = getAllTags()
    expect(tags.length).toBeGreaterThan(0)
    expect(tags[0]).toHaveProperty('name')
    expect(tags[0]).toHaveProperty('count')
    expect(typeof tags[0].count).toBe('number')
  })

  it('filters posts by tag', () => {
    const reactPosts = getPostsByTag('react')
    expect(reactPosts.length).toBeGreaterThan(0)
    reactPosts.forEach(p => {
      expect(p.tags).toContain('react')
    })
  })

  it('searches posts by keyword', () => {
    const results = searchPosts('Tailwind')
    expect(results.length).toBeGreaterThan(0)
    results.forEach(post => {
      const match =
        post.title.toLowerCase().includes('tailwind') ||
        post.excerpt.toLowerCase().includes('tailwind') ||
        post.tags.includes('tailwind') ||
        post.body.toLowerCase().includes('tailwind')
      expect(match).toBe(true)
    })
  })
})
