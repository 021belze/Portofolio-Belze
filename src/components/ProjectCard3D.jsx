import React, { useRef, useState } from 'react'
import { ExternalLink, ArrowUpRight, Sparkles, Eye } from 'lucide-react'
import { GithubIcon } from './Icons'

export default function ProjectCard3D({ project, onSelect }) {
  const cardRef = useRef(null)
  const [rotations, setRotations] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Subtle, buttery 3D tilt
    const rotateX = ((y - centerY) / centerY) * -7
    const rotateY = ((x - centerX) / centerX) * 7

    setRotations({ x: rotateX, y: rotateY })
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.16,
    })
  }

  const handleMouseLeave = () => {
    setRotations({ x: 0, y: 0 })
    setGlare((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      style={{ perspective: '1000px' }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect && onSelect(project)}
        style={{
          transform: `rotateX(${rotations.x}deg) rotateY(${rotations.y}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative group rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-6 sm:p-7 shadow-sm hover:shadow-2xl dark:hover:shadow-black/60 transition-shadow duration-300 overflow-hidden flex flex-col justify-between h-full text-left cursor-pointer"
      >
        {/* Spotlight Glare Effect */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(450px circle at ${glare.x}% ${glare.y}%, rgba(59,130,246,0.2), transparent 70%)`,
          }}
        />

        <div>
          {/* Project Thumbnail Mockup */}
          <div className="relative w-full aspect-video rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 mb-5 flex flex-col items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center space-y-2 text-center">
              <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-xs group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
                {project.accent || project.categoryLabel || "Interactive App"}
              </span>
            </div>

            {/* Quick View Overlay on Hover */}
            <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-200 flex items-center justify-center z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 text-xs font-mono font-medium shadow-md">
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                <span>Expanded Preview</span>
              </span>
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-3 right-3 z-20">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags?.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project Title & Description */}
          <div className="flex items-center justify-between group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-100 font-display">
              {project.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-1.5" />
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Action Links Footer */}
        <div
          className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => onSelect && onSelect(project)}
            className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl || "#"}
              target="_blank"
              rel="noreferrer"
              aria-label="Source code"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors p-1"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={project.liveUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 transition-colors"
            >
              <span>Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
