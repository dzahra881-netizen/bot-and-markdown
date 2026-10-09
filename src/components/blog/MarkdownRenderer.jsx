import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { slugify } from '@/utils/slugify'

function CodeBlock({ className, children, ...props }) {
  const [copied, setCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : ''
  const codeContent = String(children).replace(/\n$/, '')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore copy errors
    }
  }

  // Inline code snippet
  if (!match) {
    return (
      <code
        className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-violet-600 dark:text-violet-400 font-mono text-[0.875em] font-medium border border-slate-200 dark:border-slate-700/60"
        {...props}
      >
        {children}
      </code>
    )
  }

  return (
    <div className="relative group my-6 rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
        <span className="font-mono font-medium lowercase tracking-wide text-violet-400">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto text-sm leading-relaxed p-4 font-mono">
        <code className={className} {...props}>
          {children}
        </code>
      </div>
    </div>
  )
}

export function MarkdownRenderer({ content = '' }) {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-lg prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2({ children, ...props }) {
            const rawText = Array.isArray(children)
              ? children.map(c => (typeof c === 'string' ? c : '')).join('')
              : String(children || '')
            const id = slugify(rawText)
            return (
              <h2 id={id} className="text-2xl sm:text-3xl font-bold mt-10 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800" {...props}>
                {children}
              </h2>
            )
          },
          h3({ children, ...props }) {
            const rawText = Array.isArray(children)
              ? children.map(c => (typeof c === 'string' ? c : '')).join('')
              : String(children || '')
            const id = slugify(rawText)
            return (
              <h3 id={id} className="text-xl sm:text-2xl font-bold mt-8 mb-3" {...props}>
                {children}
              </h3>
            )
          },
          a({ href, children, ...props }) {
            const isExternal = href?.startsWith('http')
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-1 font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 underline underline-offset-4 decoration-violet-300 dark:decoration-violet-700 hover:decoration-violet-500"
                {...props}
              >
                <span>{children}</span>
                {isExternal && <ExternalLink className="w-3.5 h-3.5 inline-block opacity-70" />}
              </a>
            )
          },
          blockquote({ children, ...props }) {
            return (
              <blockquote
                className="border-l-4 border-violet-500 bg-violet-50/50 dark:bg-violet-950/20 px-5 py-3 rounded-r-xl my-6 not-italic text-slate-700 dark:text-slate-300 shadow-sm"
                {...props}
              >
                {children}
              </blockquote>
            )
          },
          table({ children, ...props }) {
            return (
              <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-sm" {...props}>
                  {children}
                </table>
              </div>
            )
          },
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
