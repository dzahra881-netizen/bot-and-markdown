import React from 'react'

export function Spinner({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div
        className={`${sizeMap[size] || sizeMap.md} rounded-full border-violet-200 dark:border-violet-950 border-t-violet-600 dark:border-t-violet-400 animate-spin`}
        role="status"
        aria-label="loading"
      />
    </div>
  )
}
