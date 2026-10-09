/**
 * Converts a string into a URL-friendly slug.
 * @param {string} text - Input text
 * @returns {string} Slugified string
 */
export function slugify(text) {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace any non-alphanumeric chars with -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
