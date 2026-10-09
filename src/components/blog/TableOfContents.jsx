import React, { useState, useEffect } from 'react'
import { AlignLeft } from 'lucide-react'
import { slugify } from '@/utils/slugify'

/**
 * Extracts H2 and H3 headings from raw markdown text.
 * @param {string} markdown
 * @returns {Array<{ level: number, text: string, id: string }>}
 */
export function extractHeadings(markdown = '') {
  if (!markdown) return []

  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const rawText = match[2].trim()
    // Strip markdown links or formatting from heading text
    const text = rawText.replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/[*_`]/g, '')
    const id = slugify(text)

    headings.push({
      level,
      text,
      id,
    })
  }

  return headings
}

export function TableOfContents({ markdown = '' }) {
  const headings = extractHeadings(markdown)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0.1,
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const handleScrollTo = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 90
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setActiveId(id)
    }
  }

  return (
    <nav className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm sticky top-24">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-semibold text-sm">
        <AlignLeft className="w-4 h-4 text-violet-500" />
        <span>Table of Contents</span>
      </div>

      <ul className="space-y-2 text-xs">
        {headings.map(({ level, text, id }) => {
          const isActive = activeId === id
          return (
            <li
              key={id}
              className={`${level === 3 ? 'pl-4' : 'pl-0'}`}
            >
              <a
                href={`#${id}`}
                onClick={(e) => handleScrollTo(e, id)}
                className={`block py-1 transition-colors line-clamp-1 ${
                  isActive
                    ? 'text-violet-600 dark:text-violet-400 font-semibold'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
