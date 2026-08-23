import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import ThemeToggle from './ThemeToggle'

const EASE_OUT = [0.16, 1, 0.3, 1]

export default function Navbar({ isDark, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [miniExpanded, setMiniExpanded] = useState(false)
  const scrollRefY = useRef(0)

  const isProjectsSection = activeSection === 'projects'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      const sections = ['home', 'about', 'projects', 'contact']
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reset miniExpanded when leaving Projects section
  useEffect(() => {
    if (!isProjectsSection) {
      setMiniExpanded(false)
    }
  }, [isProjectsSection])

  // Auto-collapse expanded pill when user scrolls by more than 50px from where they opened it
  useEffect(() => {
    if (!miniExpanded) return

    scrollRefY.current = window.scrollY

    const handleScrollCollapse = () => {
      if (Math.abs(window.scrollY - scrollRefY.current) > 50) {
        setMiniExpanded(false)
      }
    }

    window.addEventListener('scroll', handleScrollCollapse, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollCollapse)
  }, [miniExpanded])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out">
      {/* =========================================
          1. MOBILE NAVBAR (Full-width Header & Dropdown)
          ========================================= */}
      <div className="md:hidden w-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
        <div className="h-16 px-4 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            className="group flex items-center space-x-1.5 text-zinc-900 dark:text-zinc-100 font-bold text-base tracking-wider"
          >
            <span className="font-mono text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">[</span>
            <span className="font-display tracking-tight">{portfolioData.personal.monogram}</span>
            <span className="font-mono text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">]</span>
          </a>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-2">
            <ThemeToggle isDark={isDark} toggleDarkMode={toggleDarkMode} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Width Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-xl"
            >
              <div className="px-4 py-4 space-y-3">
                <div className="flex flex-col space-y-1">
                  {portfolioData.navLinks.map((link) => {
                    const sectionId = link.href.replace('#', '')
                    const isActive = activeSection === sectionId
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white font-semibold'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
                        }`}
                      >
                        {link.name}
                      </a>
                    )
                  })}
                </div>

                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Theme: {isDark ? 'Dark Mode' : 'Light Mode'}
                  </span>
                  <ThemeToggle isDark={isDark} toggleDarkMode={toggleDarkMode} variant="pill" />
                </div>

                <div className="pt-1">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full h-11 px-4 text-sm font-semibold rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-center shadow-xs cursor-pointer"
                  >
                    <span>Get in Touch</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================
          2. DESKTOP NAVBAR (Island Navbar Design)
          ========================================= */}
      <div className="hidden md:block pointer-events-none">
        <AnimatePresence mode="wait">

          {/* --- MINI PILL: Active only in Projects section when not expanded --- */}
          {isProjectsSection && !miniExpanded ? (
            <motion.div
              key="mini-pill"
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="flex justify-center pt-3.5"
            >
              {/* Pill outer container — NOT a button to avoid nested interactive elements */}
              <div className="pointer-events-auto flex items-center h-10 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800 shadow-md shadow-zinc-900/8 dark:shadow-black/40 overflow-hidden">
                {/* Logo — navigates home */}
                <a
                  href="#home"
                  className="group px-4 flex items-center gap-0.5 h-full font-bold text-sm tracking-wider text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition-colors"
                  title="Go to Home"
                >
                  <span className="font-mono text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">[</span>
                  <span className="font-display tracking-tight">{portfolioData.personal.monogram}</span>
                  <span className="font-mono text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">]</span>
                </a>

                {/* Divider */}
                <span className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 shrink-0" />

                {/* Menu button — expands to full navbar */}
                <button
                  type="button"
                  onClick={() => setMiniExpanded(true)}
                  aria-label="Open Navigation Menu"
                  className="px-4 flex items-center gap-1.5 h-full text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
                >
                  <Menu className="w-3.5 h-3.5" />
                  <span>Menu</span>
                </button>

                {/* Divider */}
                <span className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 shrink-0" />

                {/* Theme toggle — separate div prevents click from bubbling to any parent button */}
                <div className="px-2.5 flex items-center h-full">
                  <ThemeToggle
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                    className="!h-7 !w-7 !rounded-full !shadow-none !border-0 !bg-transparent"
                  />
                </div>
              </div>
            </motion.div>

          ) : (

            /* --- FULL ISLAND NAVBAR: All other sections, or expanded in Projects --- */
            <motion.div
              key="full-island"
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className={`mx-auto transition-all duration-300 ease-out ${
                isScrolled || miniExpanded
                  ? 'max-w-4xl px-4 pt-4'
                  : 'max-w-6xl px-8 pt-0'
              }`}
            >
              <div
                className={`pointer-events-auto flex items-center justify-between transition-all duration-300 ease-out ${
                  isScrolled || miniExpanded
                    ? 'h-16 px-6 rounded-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800/90 shadow-lg shadow-zinc-900/5 dark:shadow-black/30'
                    : 'h-20 px-0 bg-transparent border-b border-transparent'
                }`}
              >
                {/* Logo / Monogram */}
                <a
                  href="#home"
                  onClick={() => setMiniExpanded(false)}
                  className="group flex items-center space-x-1.5 text-zinc-900 dark:text-zinc-100 font-bold text-lg tracking-wider"
                >
                  <span className="font-mono text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">[</span>
                  <span className="font-display tracking-tight">{portfolioData.personal.monogram}</span>
                  <span className="font-mono text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">]</span>
                </a>

                {/* Desktop Navigation Links */}
                <nav className="flex items-center space-x-1">
                  {portfolioData.navLinks.map((link) => {
                    const sectionId = link.href.replace('#', '')
                    const isActive = activeSection === sectionId
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMiniExpanded(false)}
                        className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                          isActive
                            ? 'text-zinc-950 dark:text-white font-semibold'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                        }`}
                      >
                        {link.name}
                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute bottom-0 left-2 right-2 h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </a>
                    )
                  })}
                </nav>

                {/* Actions: Dark mode toggle & CTA */}
                <div className="flex items-center space-x-2.5">
                  <ThemeToggle
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                    className={isScrolled || miniExpanded ? '!rounded-full !h-9 !w-9' : '!rounded-xl !h-10 !w-10'}
                  />

                  <a
                    href="#contact"
                    onClick={() => setMiniExpanded(false)}
                    className={`inline-flex items-center justify-center gap-1.5 font-semibold transition-all duration-200 shadow-xs hover:shadow cursor-pointer ${
                      isScrolled || miniExpanded
                        ? 'h-9 px-4 text-xs rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
                        : 'h-10 px-5 text-sm rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200'
                    }`}
                  >
                    <span>Get in Touch</span>
                    <ArrowUpRight className={isScrolled || miniExpanded ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </header>
  )
}
