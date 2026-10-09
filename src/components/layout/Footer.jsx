import React from 'react'
import { Heart, Code2, Terminal } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm transition-colors duration-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                DevNotes Blog Engine
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Static-first markdown publication without servers.
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <Code2 className="w-3.5 h-3.5 text-violet-500" />
              Vite + React
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              Tailwind CSS v3
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              react-markdown + GFM
            </span>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 text-center md:text-right">
            <p>© {currentYear} DevNotes. Crafted with precision.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
