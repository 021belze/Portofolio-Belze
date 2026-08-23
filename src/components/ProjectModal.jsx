import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react'
import { GithubIcon } from './Icons'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Stop Lenis inertia scrolling when modal is open
    if (window.lenis) {
      window.lenis.stop()
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      // Resume Lenis smooth scrolling when modal closes
      if (window.lenis) {
        window.lenis.start()
      }
    }
  }, [onClose])

  if (!project) return null

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto overscroll-contain"
      onClick={onClose}
    >
      {/* Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-zinc-950/70 dark:bg-black/80 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Window Container - Centered and Stable in Place */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10 my-auto text-left flex flex-col max-h-[85vh]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Visual Banner / Thumbnail (Shrink-0) */}
        <div className="relative w-full h-44 sm:h-52 bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20 pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center space-y-2 text-center p-6">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">
              {project.categoryLabel || project.accent || "Selected Works"}
            </span>
          </div>

          {project.featured && (
            <div className="absolute bottom-4 left-6">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono uppercase font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs">
                Featured Project
              </span>
            </div>
          )}
        </div>

        {/* Body Content - Scrollable with Lenis prevention */}
        <div
          data-lenis-prevent="true"
          className="p-6 sm:p-8 space-y-6 overflow-y-auto overscroll-contain flex-1"
        >
          {/* Title & Category */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                {project.accent || "Architecture"}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-100 font-display">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            {project.longDescription || project.description}
          </p>

          {/* Key Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                Engineering Highlights & Features
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 text-xs font-mono text-zinc-800 dark:text-zinc-200 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions (Shrink-0) */}
        <div className="p-6 bg-zinc-50/80 dark:bg-zinc-900/90 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-mono text-zinc-400">
            Interactive Preview Mode
          </div>
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Code</span>
            </a>

            <a
              href={project.liveUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Launch Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
