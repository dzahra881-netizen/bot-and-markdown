import React from 'react'
import { Hash } from 'lucide-react'

export function Tag({
  name,
  count,
  isActive = false,
  onClick,
  size = 'md',
  showIcon = true,
  className = '',
}) {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 gap-1',
    md: 'text-sm px-3 py-1.5 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2',
  }

  const activeStyles = isActive
    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20 border-violet-500'
    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-slate-800 dark:hover:text-violet-400 border-slate-200 dark:border-slate-700/60'

  const Component = onClick ? 'button' : 'span'

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`inline-flex items-center rounded-lg font-medium border transition-all duration-150 select-none ${sizeStyles[size] || sizeStyles.md} ${activeStyles} ${className}`}
    >
      {showIcon && <Hash className="w-3.5 h-3.5 opacity-60 shrink-0" />}
      <span className="capitalize">{name}</span>
      {typeof count === 'number' && (
        <span
          className={`ml-1 text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
            isActive
              ? 'bg-violet-700/80 text-violet-100'
              : 'bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          {count}
        </span>
      )}
    </Component>
  )
}
