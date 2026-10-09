import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, BookOpen, Layers, Newspaper } from 'lucide-react'
import { usePosts } from '@/hooks/usePosts'
import { SearchBar } from '@/components/blog/SearchBar'
import { TagFilter } from '@/components/blog/TagFilter'
import { PostCard } from '@/components/blog/PostCard'
import { PostList } from '@/components/blog/PostList'

export function Home() {
  const navigate = useNavigate()
  const {
    allPosts,
    posts,
    filteredPosts,
    totalCount,
    allTags,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    currentPage,
    totalPages,
    setPage,
    resetFilters,
  } = usePosts({ initialPageSize: 6 })

  const isFiltering = Boolean(searchQuery.trim() || selectedTag)
  const featuredPost = !isFiltering && currentPage === 1 ? allPosts[0] : null
  const regularPosts = featuredPost
    ? posts.filter((p) => p.slug !== featuredPost.slug)
    : posts

  const handleTagClick = (tag) => {
    navigate(`/tags/${tag}`)
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-violet-50/50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-violet-950/20 shadow-xl shadow-slate-200/30 dark:shadow-none">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-950/80 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Journal & Architecture Notes</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Engineering ideas,{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              written in Markdown.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            A static-first technical publication exploring React architecture, modern CSS, web performance, and autonomous software development.
          </p>

          {/* Search Bar */}
          <div className="pt-2">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Quick Metrics */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-violet-500" />
              <span><strong className="text-slate-800 dark:text-slate-200">{allPosts.length}</strong> Published Articles</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-500" />
              <span><strong className="text-slate-800 dark:text-slate-200">{allTags.length}</strong> Topics Explored</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tag Filters Strip */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-violet-500" />
            <span>Browse Topics</span>
          </h2>
          {isFiltering && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
        <TagFilter
          tags={allTags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />
      </section>

      {/* Featured Story (shown only on page 1 with no active search/tag filter) */}
      {featuredPost && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Latest Feature
          </h2>
          <PostCard
            post={featuredPost}
            featured={true}
            onTagClick={handleTagClick}
          />
        </section>
      )}

      {/* Articles Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {isFiltering ? `Search Results (${filteredPosts.length})` : 'All Articles'}
          </h2>
        </div>

        <PostList
          posts={regularPosts}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          onResetFilters={resetFilters}
          onTagClick={handleTagClick}
        />
      </section>
    </div>
  )
}
