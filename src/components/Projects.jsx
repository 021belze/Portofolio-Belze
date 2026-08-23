import React, { useState, useRef, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import { FolderGit2, ArrowUpRight, ArrowRight } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import ProjectCard3D from './ProjectCard3D'
import ProjectModal from './ProjectModal'
import BlurReveal from './BlurReveal'

export default function Projects() {
  const { projects } = portfolioData
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filterTabs = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'web', label: 'Web Apps', count: projects.filter((p) => p.category === 'web').length },
    { id: 'ui-ux', label: 'UI/UX & Systems', count: projects.filter((p) => p.category === 'ui-ux').length },
    { id: 'open-source', label: 'Open Source', count: projects.filter((p) => p.category === 'open-source').length },
  ]

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) => project.category === filter)

  // Container refs for exact pixel measurement
  const targetRef = useRef(null)
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [maxDistance, setMaxDistance] = useState(0)

  // Framer Motion useScroll pinned tracking
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  // Dynamic pixel-accurate scroll distance calculation:
  // Guarantees the very last card scrolls 100% into view with comfortable breathing margin
  useEffect(() => {
    const updateDistance = () => {
      if (trackRef.current && containerRef.current) {
        const trackWidth = trackRef.current.scrollWidth
        const containerWidth = containerRef.current.clientWidth
        // Extra margin ensures the last card has full visibility & padding
        const distance = Math.max(0, trackWidth - containerWidth + 140)
        setMaxDistance(distance)
      }
    }

    updateDistance()
    const timer = setTimeout(updateDistance, 80)

    // Debounce resize — cegah ratusan recalculation saat drag resize window
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateDistance, 100)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      clearTimeout(timer)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [filteredProjects, filter])

  // Exact pixel translation from start (0px) to end (-maxDistance px)
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxDistance])

  // Organic Velocity-Based Kinetic Momentum
  const scrollVelocity = useVelocity(scrollYProgress)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 30,
    stiffness: 220,
    mass: 0.25,
  })

  // Soft inertial tilt & stretch on scroll motion
  const skewX = useTransform(smoothVelocity, [-1.5, 1.5], [3, -3], {
    clamp: true,
  })
  const scale = useTransform(smoothVelocity, [-2, 0, 2], [0.99, 1, 0.99], {
    clamp: true,
  })

  // Subtle progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Fixed, stable scroll height to prevent violent layout shifts when filtering categories
  const scrollDistanceVh = 260

  return (
    <section id="projects" className="relative bg-white dark:bg-zinc-950 transition-colors">

      {/* ========================================================================= */}
      {/* DESKTOP (>= 1024px): Pinned Horizontal Carousel Deck with Smooth Edge Fade */}
      {/* ========================================================================= */}
      <div
        ref={targetRef}
        style={{ height: `${scrollDistanceVh}vh` }}
        className="relative hidden lg:block w-full"
      >
        <div
          ref={containerRef}
          className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-8 pb-4"
        >

          {/* Top Section Header & Filter Tabs (Aligned to Max-W Container) */}
          <div className="w-full max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 shrink-0">
            <div className="flex items-end justify-between gap-6 mb-3 text-left">
              {/* Left Header */}
              <div className="space-y-1 max-w-lg">
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                  <span className="w-6 h-px bg-zinc-400 dark:bg-zinc-600"></span>
                  <span>02 // Selected Works</span>
                </div>
                <BlurReveal
                  as="h2"
                  text="Featured Projects"
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-display"
                  duration={0.65}
                  stagger={0.04}
                />
                <BlurReveal
                  as="p"
                  text="A curated collection of 3D web applications, design systems, and developer tools."
                  className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm max-w-md line-clamp-1"
                  delay={0.15}
                  duration={0.55}
                />
              </div>

              {/* Right Filter Pills */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-1 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setFilter(tab.id)}
                      type="button"
                      className={`relative px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                        filter === tab.id
                          ? 'text-zinc-950 dark:text-zinc-100 font-semibold'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      {filter === tab.id && (
                        <motion.div
                          layoutId="activeProjectFilterDesktop"
                          className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-800 shadow-xs border border-zinc-200/60 dark:border-zinc-700/60 -z-0"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                      <span className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                        filter === tab.id
                          ? 'bg-zinc-200/80 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
                          : 'bg-zinc-200/40 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                  <span>Scroll down to slide</span>
                  <ArrowRight className="w-3 h-3 text-blue-500" />
                  <span className="text-zinc-700 dark:text-zinc-300 font-semibold">
                    {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle Progress Bar */}
            <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
              />
            </div>
          </div>

          {/* Horizontal Slide Carousel Track */}
          <div
            className="w-full my-auto py-4 relative [mask-image:linear-gradient(to_right,transparent_0%,black_24px,black_calc(100%-24px),transparent_100%)] overflow-visible"
          >
            <div className="w-full px-8 sm:px-10 lg:px-12 overflow-visible">
              <motion.div
                ref={trackRef}
                style={{
                  x,
                  skewX,
                  scale,
                  transformOrigin: 'center center',
                }}
                className="flex items-stretch gap-6 xl:gap-8 will-change-transform w-max pr-16 py-3"
              >
                <AnimatePresence mode="sync">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="w-[340px] xl:w-[380px] shrink-0 h-[390px] sm:h-[400px] xl:h-[420px]"
                    >
                      <ProjectCard3D
                        project={project}
                        onSelect={(proj) => setSelectedProject(proj)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar: Explore GitHub Repositories Link */}
          <div className="w-full max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 shrink-0 flex items-center justify-between pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <span className="text-xs font-mono text-zinc-400">
              Interactive Horizontal Carousel • Pinned Experience
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group cursor-pointer shadow-2xs"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-zinc-500" />
              <span>Explore more repositories on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET (< 1024px): Clean Vertical Responsive Grid                */}
      {/* ========================================================================= */}
      <div className="block lg:hidden py-24 px-4 sm:px-6 max-w-3xl mx-auto">
        {/* Mobile Header */}
        <div className="space-y-4 mb-10 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
            <span className="w-6 h-px bg-zinc-400 dark:bg-zinc-600"></span>
            <span>02 // Selected Works</span>
          </div>
          <BlurReveal
            as="h2"
            text="Featured Projects"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-display"
            duration={0.65}
            stagger={0.04}
          />
          <BlurReveal
            as="p"
            text="A curated collection of 3D web applications, design systems, and developer tools."
            className="text-zinc-500 dark:text-zinc-400 text-sm"
            delay={0.15}
            duration={0.55}
          />

          {/* Mobile Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 pt-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                type="button"
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                  filter === tab.id
                    ? 'text-zinc-950 dark:text-zinc-100 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {filter === tab.id && (
                  <motion.div
                    layoutId="activeProjectFilterMobile"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-800 shadow-xs border border-zinc-200/60 dark:border-zinc-700/60 -z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
                <span className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                  filter === tab.id
                    ? 'bg-zinc-200/80 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
                    : 'bg-zinc-200/40 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AnimatePresence mode="sync">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ProjectCard3D
                  project={project}
                  onSelect={(proj) => setSelectedProject(proj)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Bottom CTA */}
        <div className="mt-12 text-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-xs font-medium transition-colors group cursor-pointer"
          >
            <FolderGit2 className="w-4 h-4 text-zinc-500" />
            <span>Explore more repositories on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Interactive Project Preview Modal (Shared)                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

    </section>
  )
}
