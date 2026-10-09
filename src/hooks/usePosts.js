import { useState, useMemo } from 'react'
import { getAllPosts, getAllTags } from '@/services/postService'
import { useDebounce } from '@/hooks/useDebounce'

/**
 * Custom hook to manage posts querying, searching, tag filtering, and pagination.
 * @param {Object} options
 * @param {number} [options.initialPageSize=6]
 * @param {string} [options.initialTag='']
 */
export function usePosts({ initialPageSize = 6, initialTag = '' } = {}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState(initialTag)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const debouncedQuery = useDebounce(searchQuery, 250)

  // Raw posts and aggregated tags
  const allPosts = useMemo(() => getAllPosts(), [])
  const allTags = useMemo(() => getAllTags(), [])

  // Filtered posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    let result = allPosts

    // Apply tag filter
    if (selectedTag) {
      const lowerTag = selectedTag.toLowerCase()
      result = result.filter(post => post.tags.includes(lowerTag))
    }

    // Apply search query filter
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.trim().toLowerCase()
      result = result.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(q)
        const excerptMatch = post.excerpt.toLowerCase().includes(q)
        const tagMatch = post.tags.some(t => t.toLowerCase().includes(q))
        const bodyMatch = post.body.toLowerCase().includes(q)
        return titleMatch || excerptMatch || tagMatch || bodyMatch
      })
    }

    return result
  }, [allPosts, selectedTag, debouncedQuery])

  // Total pages calculation
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize))

  // Ensure current page does not exceed bounds
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages)

  // Slice posts for current pagination page
  const paginatedPosts = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * pageSize
    return filteredPosts.slice(startIndex, startIndex + pageSize)
  }, [filteredPosts, validCurrentPage, pageSize])

  const setPage = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages))
  }

  const handleSetSearchQuery = (query) => {
    setSearchQuery(query)
    setCurrentPage(1) // reset to page 1 on new search
  }

  const handleSetSelectedTag = (tag) => {
    setSelectedTag(prev => (prev === tag ? '' : tag))
    setCurrentPage(1) // reset to page 1 on tag switch
  }

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedTag('')
    setCurrentPage(1)
  }

  return {
    allPosts,
    posts: paginatedPosts,
    filteredPosts,
    totalCount: filteredPosts.length,
    allTags,
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    selectedTag,
    setSelectedTag: handleSetSelectedTag,
    currentPage: validCurrentPage,
    totalPages,
    setPage,
    pageSize,
    setPageSize,
    resetFilters,
  }
}
