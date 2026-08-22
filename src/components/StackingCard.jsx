import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function StackingCard({
  children,
  index,
  total = 4,
  range = [0, 1],
  className = '',
}) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  })

  // Smooth subtle scale reduction as next cards scroll up over it
  const scale = useTransform(
    scrollYProgress,
    range,
    [1, 1 - (total - 1 - index) * 0.02]
  )

  // Card top offset for clean cascading stacking
  const topOffset = 90 + index * 16

  return (
    <div
      ref={containerRef}
      className="sticky w-full flex justify-center mb-10 last:mb-0"
      style={{
        top: `${topOffset}px`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top center',
        }}
        className={`w-full rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-6 sm:p-8 md:p-10 transition-colors duration-300 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  )
}
