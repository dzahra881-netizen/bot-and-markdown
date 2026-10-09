import { describe, it, expect } from 'vitest'
import { slugify } from '../utils/slugify'
import { formatDate } from '../utils/formatDate'
import { calculateReadingTime } from '../utils/readingTime'

describe('slugify utility', () => {
  it('converts titles to url-friendly slugs', () => {
    expect(slugify('Hello World!')).toBe('hello-world')
    expect(slugify('  React & Tailwind CSS: 2026 Edition  ')).toBe('react-tailwind-css-2026-edition')
    expect(slugify('Special@#Chars*&^Here')).toBe('special-chars-here')
  })

  it('handles empty strings gracefully', () => {
    expect(slugify('')).toBe('')
    expect(slugify(null)).toBe('')
  })
})

describe('formatDate utility', () => {
  it('formats standard ISO date string', () => {
    const formatted = formatDate('2026-10-09')
    expect(formatted).toContain('2026')
    expect(formatted).toContain('Oct')
  })

  it('handles empty or invalid dates', () => {
    expect(formatDate('')).toBe('')
    expect(formatDate('invalid-date')).toBe('invalid-date')
  })
})

describe('calculateReadingTime utility', () => {
  it('calculates reading time correctly', () => {
    const shortText = 'Hello world this is a test post.'
    const result = calculateReadingTime(shortText)
    expect(result.minutes).toBe(1)
    expect(result.text).toBe('1 min read')
    expect(result.words).toBe(7)
  })

  it('scales with word count', () => {
    const words = Array(450).fill('word').join(' ')
    const result = calculateReadingTime(words, 200)
    expect(result.minutes).toBe(3)
    expect(result.text).toBe('3 min read')
  })
})
