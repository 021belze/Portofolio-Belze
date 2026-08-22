import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderGit2, ArrowUpRight } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import ProjectCard3D from './ProjectCard3D'
import ProjectModal from './ProjectModal'
import BlurReveal from './BlurReveal'

export default function Projects() {
  const { projects } = portfolioData
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'ui-ux', label: 'UI/UX & Systems' },
    { id: 'open-source', label: 'Open Source' },
  ]

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="relative py-28 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
              <span className="w-6 h-px bg-zinc-400 dark:bg-zinc-600"></span>
              <span>02 // Selected Works</span>
            </div>
            <BlurReveal
              as="h2"
              text="Featured Projects"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-display"
              duration={0.65}
              stagger={0.04}
            />
            <BlurReveal
              as="p"
              text="A curated collection of 3D web applications, design systems, and developer tools."
              className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg max-w-xl"
              delay={0.15}
              duration={0.55}
            />
          </div>

          {/* Filter Pills with layoutId animation */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 self-start md:self-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                type="button"
                className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-200 cursor-pointer ${
                  filter === tab.id
                    ? 'text-zinc-950 dark:text-zinc-100 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {filter === tab.id && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200/60 dark:border-zinc-700/60 -z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Animated Grid with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ProjectCard3D
                  project={project}
                  onSelect={(proj) => setSelectedProject(proj)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state fallback (just in case) */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-zinc-500 font-mono text-sm">
            No projects found in this category.
          </div>
        )}

        {/* Bottom CTA for Github */}
        <div className="mt-16 text-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs sm:text-sm font-medium transition-colors group cursor-pointer"
          >
            <FolderGit2 className="w-4 h-4 text-zinc-500" />
            <span>Explore more repositories on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

      </div>

      {/* Interactive Project Preview Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
