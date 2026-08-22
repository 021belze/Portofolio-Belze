import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Disable body scroll while loading
    document.body.style.overflow = 'hidden'

    // Smooth simulated increment with variable pacing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100
        }
        // Slightly random increments for an organic, responsive feel
        const diff = Math.floor(Math.random() * 14) + 10
        return Math.min(prev + diff, 100)
      })
    }, 45)

    // Safety fallback: maximum 2.5s to prevent any stuck state
    const safetyTimer = setTimeout(() => {
      setProgress(100)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(safetyTimer)
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Trigger completion when progress hits 100%
  useEffect(() => {
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        document.body.style.overflow = 'unset'
        onComplete?.()
      }, 250)

      return () => clearTimeout(exitTimer)
    }
  }, [progress, onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-[9999] w-screen h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-300 select-none pointer-events-auto"
    >
      <div className="w-full max-w-xs px-6 flex flex-col items-center space-y-6">

        {/* Monogram / Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100 font-mono text-sm tracking-widest font-semibold"
        >
          <span className="text-zinc-400 dark:text-zinc-600">[</span>
          <span className="font-display font-bold text-base">{portfolioData.personal.monogram}</span>
          <span className="text-zinc-400 dark:text-zinc-600">]</span>
        </motion.div>

        {/* Minimalist Progress Line Container */}
        <div className="w-48 sm:w-56 h-[3px] sm:h-1 rounded-full bg-zinc-200 dark:bg-zinc-800/90 overflow-hidden relative">
          <motion.div
            className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        {/* Percentage Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.2 }}
          className="font-mono text-xs text-zinc-400 dark:text-zinc-500 tracking-wider"
        >
          <span>{progress.toString().padStart(2, '0')}%</span>
        </motion.div>

      </div>
    </motion.div>
  )
}

