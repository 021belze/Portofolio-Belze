import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from "./Icons";
import ThreeBelzeCanvas from "./ThreeBelzeCanvas";
import WaveDivider from "./WaveDivider";

export default function Hero({ isDark = true }) {
  const containerRef = useRef(null);

  // Scroll-driven depth & parallax for hero centerpiece
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen pt-28 pb-36 flex flex-col justify-between items-center overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300"
    >
      {/* Background Gradients & Ambient Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Center Container */}
      <motion.div
        style={{ y: textY }}
        className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center relative z-20 my-auto w-full"
      >
        {/* 1. Status Badge */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 15 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/90 dark:bg-zinc-900/80 text-xs font-mono text-zinc-700 dark:text-zinc-300 mb-2 shadow-xs transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Available for new projects & collaborations
        </motion.div>

        {/* 2. 3D BELZE Centerpiece (with Scroll-driven depth parallax) */}
        <motion.div
          style={{
            y: canvasY,
            scale: canvasScale,
            opacity: canvasOpacity,
          }}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full my-[-8px] md:my-[-15px]"
        >
          <ThreeBelzeCanvas isDark={isDark} />
        </motion.div>

        {/* 3. CTA Action Buttons (No magnetic button, tactile hover) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mt-2"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
          >
            <span>Explore Work</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/70 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 font-medium text-sm transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Get in Touch</span>
            <Send className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          </a>
        </motion.div>

        {/* 4. Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex items-center gap-2 sm:gap-3 mt-8 pt-6 border-t border-zinc-200/90 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all transform hover:scale-105 active:scale-95"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all transform hover:scale-105 active:scale-95"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="p-2.5 rounded-xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all transform hover:scale-105 active:scale-95"
          >
            <TwitterIcon className="w-5 h-5" />
          </a>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Dribbble"
            className="p-2.5 rounded-xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-all transform hover:scale-105 active:scale-95"
          >
            <DribbbleIcon className="w-5 h-5" />
          </a>
        </motion.div>
      </motion.div>

      {/* 5. Wave Divider di Bagian Bawah */}
      <WaveDivider colorTheme="monochrome" />
    </section>
  );
}
