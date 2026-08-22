import React from "react";
import { motion } from "framer-motion";

// Pembungkus Grid / Baris Kartu (Mengatur jeda waktu muncul bertahap antar-kartu)
export function CardContainer({ children, className = "", stagger = 0.1, delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Pembungkus Masing-Masing Kartu Individual
export function CardItem({ children, className = "", duration = 0.7 }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 35, filter: "blur(10px)", scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          transition: {
            duration,
            ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier untuk gerakan ultra-smooth
          },
        },
      }}
      className={`will-change-[transform,filter,opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
}
