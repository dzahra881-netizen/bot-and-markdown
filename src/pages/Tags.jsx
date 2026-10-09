import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Tags as TagsIcon, ArrowLeft, Hash } from 'lucide-react'
import { getAllTags, getPostsByTag } from '@/services/postService'
import { PostCard } from '@/components/blog/PostCard'
import { Tag } from '@/components/common/Tag'

export function Tags() {
  const { tag } = useParams()
  const navigate = useNavigate()
  const allTags = getAllTags()

  const currentTag = tag ? tag.toLowerCase() : null
  const postsForTag = currentTag ? getPostsByTag(currentTag) : []

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all articles</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
            <TagsIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {currentTag ? `Topic: #${currentTag}` : 'Explore Topics'}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {currentTag
                ? `Showing ${postsForTag.length} ${postsForTag.length === 1 ? 'article' : 'articles'} tagged with #${currentTag}`
                : `Browse articles indexed across ${allTags.length} unique tags`}
            </p>
          </div>
        </div>
      </div>

      {/* All Tags Badges Grid */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Hash className="w-4 h-4" />
          <span>All Available Topics</span>
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {allTags.map((t) => (
            <Tag
              key={t.name}
              name={t.name}
              count={t.count}
              size="md"
              isActive={currentTag === t.name.toLowerCase()}
              onClick={() => navigate(`/tags/${t.name}`)}
            />
          ))}
        </div>
      </div>

      {/* Posts Listing for Selected Tag */}
      {currentTag && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Articles tagged with #{currentTag}
            </h3>
            <button
              onClick={() => navigate('/tags')}
              className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
            >
              Clear tag selection
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {postsForTag.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                onTagClick={(t) => navigate(`/tags/${t}`)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
