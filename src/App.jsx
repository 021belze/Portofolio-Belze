import React, { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) {
        return saved === 'dark'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  // Inisialisasi Smooth Inertia Scroll dengan Lenis (Sesuai Panduan Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    window.lenis = lenis

    let animationFrameId
    let isRunning = false

    function raf(time) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    function startRaf() {
      if (!isRunning) {
        isRunning = true
        animationFrameId = requestAnimationFrame(raf)
      }
    }

    function stopRaf() {
      if (isRunning) {
        isRunning = false
        cancelAnimationFrame(animationFrameId)
      }
    }

    // Pause RAF saat tab di-background untuk hemat CPU
    const handleVisibility = () => {
      if (document.hidden) {
        stopRaf()
      } else {
        startRaf()
      }
    }

    startRaf()
    document.addEventListener('visibilitychange', handleVisibility)

    // Smooth scroll saat klik anchor link internal (#home, #about, #projects, #contact, dll)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#')) {
        const targetId = href === '#' ? '#home' : href
        try {
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            e.preventDefault()
            lenis.scrollTo(targetElement, {
              offset: -40,
              duration: 1.2,
            })
          }
        } catch {
          // fallback jika selector tidak valid
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      document.removeEventListener('visibilitychange', handleVisibility)
      stopRaf()
      lenis.destroy()
      delete window.lenis
    }
  }, [])


  const toggleDarkMode = () => {
    setIsDark((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-300">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero isDark={isDark} />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer isDark={isDark} toggleDarkMode={toggleDarkMode} />
    </div>
  )
}

export default App
