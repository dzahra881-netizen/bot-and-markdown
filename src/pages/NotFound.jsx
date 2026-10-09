import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Compass, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/common/Button'

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-8">
      <div className="relative">
        <span className="text-8xl sm:text-9xl font-black tracking-widest text-slate-200 dark:text-slate-800/80 select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 rounded-2xl bg-violet-600/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 backdrop-blur-sm">
            <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
        </div>
      </div>

      <div className="space-y-3 max-w-md">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Page not found
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          The page or article you are looking for doesn't exist, has been archived, or had its URL slug updated.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/">
          <Button variant="primary" size="md" iconLeft={Home}>
            Back to Home
          </Button>
        </Link>
        <Link to="/tags">
          <Button variant="outline" size="md" iconLeft={ArrowLeft}>
            Browse Topics
          </Button>
        </Link>
      </div>
    </div>
  )
}
