/**
 * Calculates estimated reading time for markdown or raw text.
 * @param {string} content - Markdown or plain text content
 * @param {number} [wordsPerMinute=200] - Average reading speed
 * @returns {{ words: number, minutes: number, text: string }}
 */
export function calculateReadingTime(content = '', wordsPerMinute = 200) {
  if (!content) {
    return { words: 0, minutes: 1, text: '1 min read' }
  }

  // Strip markdown formatting symbols roughly to get clean words
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/`.*?`/g, '') // remove inline code
    .replace(/[#*_[\]()~>-]/g, ' ') // remove markdown syntax
    .trim()

  const words = cleanContent.length > 0 ? cleanContent.split(/\s+/).filter(Boolean).length : 0
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))

  return {
    words,
    minutes,
    text: `${minutes} min read`,
  }
}
