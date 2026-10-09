/**
 * Formats a date string or object into a human-readable format.
 * @param {string | Date} dateInput - Date string (e.g. '2026-10-09') or Date object
 * @param {Intl.DateTimeFormatOptions} [options] - Optional formatting options
 * @returns {string} Formatted date string
 */
export function formatDate(dateInput, options = {}) {
  if (!dateInput) return ''
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
    if (isNaN(date.getTime())) return String(dateInput)
    
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options,
    }
    return new Intl.DateTimeFormat('en-US', defaultOptions).format(date)
  } catch {
    return String(dateInput)
  }
}
