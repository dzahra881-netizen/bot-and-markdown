import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Share2, Check, User, ArrowRight } from 'lucide-react'
import { getPostBySlug, getAllPosts } from '@/services/postService'
import { formatDate } from '@/utils/formatDate'
import { Tag } from '@/components/common/Tag'
import { Button } from '@/components/common/Button'
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer'
import { TableOfContents } from '@/components/blog/TableOfContents'

export function PostDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [copiedShare, setCopiedShare] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const post = getPostBySlug(slug)
  const allPosts = getAllPosts()

  // Find previous and next articles for bottom navigation
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  // Reading progress scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!post) {
    return (
      <div className="text-center py-24 space-y-6">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          Post Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          We couldn't locate the article you're searching for. It may have been renamed or moved.
        </p>
        <Button variant="primary" onClick={() => navigate('/')} iconLeft={ArrowLeft}>
          Return to All Articles
        </Button>
      </div>
    )
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setCopiedShare(true)
        setTimeout(() => setCopiedShare(false), 2500)
      }
    } catch {
      // ignore share cancel/errors
    }
  }

  return (
    <div>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-16 left-0 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <article className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb & Share */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to articles</span>
          </Link>

          <button
            onClick={handleShare}
            aria-label="Share article"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <Tag
                key={tag}
                name={tag}
                size="sm"
                onClick={() => navigate(`/tags/${tag}`)}
              />
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-6 pt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/80 pb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-violet-500" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-violet-500" />
              {post.readingTime}
            </span>
            <span className="text-slate-400">•</span>
            <span>{post.words} words</span>
          </div>
        </header>

        {/* Featured Cover Image */}
        {post.cover && (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-slate-900 shadow-xl">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
              }}
            />
          </div>
        )}

        {/* Article Body + Sticky Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
          {/* Main Markdown Content */}
          <div className="lg:col-span-8">
            <MarkdownRenderer content={post.body} />
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <TableOfContents markdown={post.body} />

            {/* Author Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-sm">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    DevNotes Staff
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Systems Engineering & Architecture
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Exploring high performance web architectures, state machines, and modern tooling without boilerplate.
              </p>
            </div>
          </aside>
        </div>

        {/* Article Footer Navigation (Prev / Next) */}
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              to={`/posts/${prevPost.slug}`}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-500/50 transition-all text-left space-y-1 group"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 group-hover:text-violet-500">
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Post
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                {prevPost.title}
              </p>
            </Link>
          ) : <div />}

          {nextPost ? (
            <Link
              to={`/posts/${nextPost.slug}`}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-500/50 transition-all text-right space-y-1 group"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-end gap-1 group-hover:text-violet-500">
                Next Post <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                {nextPost.title}
              </p>
            </Link>
          ) : <div />}
        </div>
      </article>
    </div>
  )
}
