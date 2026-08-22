import React from 'react'
import { ArrowUp } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import ThemeToggle from './ThemeToggle'

export default function Footer({ isDark, toggleDarkMode }) {
  const { personal, socials, footer } = portfolioData

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }


  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 font-display text-sm">
              [{personal.monogram}]
            </span>
            <span>{footer.copyright}</span>
          </div>

          {/* Social Links Single Row */}
          <div className="flex items-center space-x-6 text-xs text-zinc-500 dark:text-zinc-400">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-950 dark:hover:text-white transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Controls: Theme toggle & Back to Top */}
          <div className="flex items-center space-x-3">
            {toggleDarkMode && (
              <ThemeToggle isDark={isDark} toggleDarkMode={toggleDarkMode} />
            )}

            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  )
}
