import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Tag } from '@/components/common/Tag'
import { PostCard } from '@/components/blog/PostCard'

describe('Common Components', () => {
  it('renders Button with text and handles variant', () => {
    render(<Button variant="primary">Click Me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('renders Tag with name and count', () => {
    render(<Tag name="react" count={5} />)
    expect(screen.getByText(/react/i)).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders PostCard with title, excerpt, and link', () => {
    const mockPost = {
      slug: 'test-post',
      title: 'Testing React Post',
      excerpt: 'This is a test post excerpt for component test.',
      date: '2026-10-09',
      tags: ['test', 'react'],
      readingTime: '2 min read',
      cover: 'https://example.com/cover.jpg',
    }

    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>
    )

    expect(screen.getByText('Testing React Post')).toBeInTheDocument()
    expect(screen.getByText('This is a test post excerpt for component test.')).toBeInTheDocument()
    expect(screen.getByText('2 min read')).toBeInTheDocument()
  })
})
