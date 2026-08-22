import React from 'react'
import { motion } from 'framer-motion'

export default function BlurReveal({
  text = '',
  className = '',
  delay = 0,
  duration = 0.55,
  stagger = 0.035,
  as: Component = 'h2',
  viewportMargin = '-5% 0px -5% 0px',
  once = true,
  children,
}) {
  const content = text || (typeof children === 'string' ? children : '')

  if (!content || typeof content !== 'string') {
    return null
  }

  // Split content into words
  const words = content.split(' ')

  // Container variants to control stagger timing
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  // Word variants for smooth blur + opacity + translateY reveal
  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Ultra-smooth cubic-bezier easing
      },
    },
  }

  return (
    <Component className={`overflow-hidden ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: viewportMargin }}
        className="inline"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-[0.26em] will-change-[transform,filter,opacity]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
}
