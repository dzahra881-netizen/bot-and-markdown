import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { Tag } from '@/components/common/Tag'

export function PostCard({ post, featured = false, onTagClick }) {
  if (!post) return null

  if (featured) {
    return (
      <article className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-violet-500/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto overflow-hidden bg-slate-800">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-violet-600 text-white shadow-md">
              Featured Story
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <Tag
                  key={tag}
                  name={tag}
                  size="sm"
                  onClick={onTagClick ? () => onTagClick(tag) : undefined}
                />
              ))}
            </div>

            <Link to={`/posts/${post.slug}`} className="block group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {post.title}
              </h2>
            </Link>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {post.readingTime}
              </span>
            </div>

            <Link
              to={`/posts/${post.slug}`}
              className="inline-flex items-center gap-1 font-semibold text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform"
            >
              <span>Read</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md shadow-slate-100 dark:shadow-none hover:shadow-xl hover:border-violet-500/50 hover:-translate-y-1 transition-all duration-300">
      <Link to={`/posts/${post.slug}`} className="relative aspect-[16/10] overflow-hidden bg-slate-800 block">
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Tag
                key={tag}
                name={tag}
                size="sm"
                onClick={onTagClick ? () => onTagClick(tag) : undefined}
              />
            ))}
          </div>

          <Link to={`/posts/${post.slug}`} className="block group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white line-clamp-2 leading-snug">
              {post.title}
            </h3>
          </Link>

          <p className="mt-2.5 text-slate-600 dark:text-slate-300 text-sm line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>

          <Link
            to={`/posts/${post.slug}`}
            className="p-1.5 rounded-lg text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:translate-x-1 transition-all"
            aria-label={`Read ${post.title}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
