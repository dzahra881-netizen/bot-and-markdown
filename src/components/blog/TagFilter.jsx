import React from 'react'
import { Tag } from '@/components/common/Tag'
import { Layers } from 'lucide-react'

export function TagFilter({ tags = [], selectedTag = '', onSelectTag }) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-1">
      <button
        onClick={() => onSelectTag('')}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150 shrink-0 ${
          !selectedTag
            ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20 border-violet-500'
            : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700/60'
        }`}
      >
        <Layers className="w-3.5 h-3.5 opacity-70" />
        <span>All Posts</span>
      </button>

      {tags.map((t) => (
        <Tag
          key={t.name}
          name={t.name}
          count={t.count}
          isActive={selectedTag.toLowerCase() === t.name.toLowerCase()}
          onClick={() => onSelectTag(t.name)}
          size="md"
          className="shrink-0"
        />
      ))}
    </div>
  )
}
