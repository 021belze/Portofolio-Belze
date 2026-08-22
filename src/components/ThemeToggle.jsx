import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ isDark, toggleDarkMode, className = '', variant = 'button' }) {
  if (variant === 'pill') {
    return (
      <button
        onClick={toggleDarkMode}
        type="button"
        className={`relative flex items-center h-8 w-14 rounded-full p-1 transition-colors duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 ${isDark
            ? 'bg-zinc-800 border border-zinc-700'
            : 'bg-zinc-200 border border-zinc-300'
          } ${className}`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`flex items-center justify-center w-6 h-6 rounded-full shadow-sm ${isDark ? 'bg-zinc-950 text-amber-300 ml-auto' : 'bg-white text-zinc-800 mr-auto'
            }`}
        >
          {isDark ? (
            <Sun className="w-3.5 h-3.5" />
          ) : (
            <Moon className="w-3.5 h-3.5" />
          )}
        </motion.div>
      </button>
    )
  }

  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      className={`relative h-9 w-9 rounded-xl border transition-all duration-200 group flex items-center justify-center shrink-0 cursor-pointer ${isDark
          ? 'border-zinc-800 bg-zinc-900/80 text-amber-300 hover:bg-zinc-800 hover:border-zinc-700 hover:text-amber-200'
          : 'border-zinc-200 bg-zinc-100/80 text-zinc-700 hover:bg-zinc-200 hover:border-zinc-300 hover:text-zinc-950'
        } ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -45, scale: 0.8, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 45, scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 stroke-[2.2]" />
        ) : (
          <Moon className="w-4 h-4 stroke-[2.2]" />
        )}
      </motion.div>
    </button>
  )
}
