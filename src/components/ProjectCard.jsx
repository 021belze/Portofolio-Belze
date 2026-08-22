import React from 'react'
import { motion } from 'framer-motion'
import { Layers, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './Icons'

export default function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md text-left"
    >
      <div>
        {/* Visual Project Thumbnail / Placeholder (16:9 ratio) */}
        <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center p-6 overflow-hidden group-hover:bg-zinc-200/60 dark:group-hover:bg-zinc-800 transition-colors">

          {/* Subtle Grid overlay inside placeholder */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center space-y-2 text-center">
            <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <Layers className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
            </div>
            <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              {project.accent || 'Preview Mockup'}
            </span>
          </div>

          {/* Category Tag Overlay */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 shadow-xs">
              {project.categoryLabel}
            </span>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-6 space-y-4">

          {/* Title & Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-100 font-display group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Action Links Footer */}
      <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/40">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4 group/link"
        >
          <span>Live Demo</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>Codebase</span>
        </a>
      </div>
    </motion.div>
  )
}
