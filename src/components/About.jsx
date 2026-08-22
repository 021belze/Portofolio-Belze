import React, { useState, useEffect } from 'react'
import {
  Terminal,
  Code2,
  Clock,
  MapPin,
  Sparkles,
  Zap,
  Layers,
  Cpu,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  Gauge,
  MousePointerClick
} from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import BlurReveal from './BlurReveal'
import StackingCard from './StackingCard'

export default function About() {
  const { about } = portfolioData
  const [time, setTime] = useState('')
  const [activeTechTab, setActiveTechTab] = useState(0)

  useEffect(() => {
    const updateTime = () => {
      try {
        const jakartaTime = new Intl.DateTimeFormat('id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date())
        setTime(jakartaTime)
      } catch {
        setTime(new Date().toLocaleTimeString())
      }
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="about"
      className="relative py-28 bg-zinc-50/70 dark:bg-zinc-950/40 border-y border-zinc-200/80 dark:border-zinc-800/80 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="space-y-3 mb-16 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
            <span className="w-6 h-px bg-zinc-400 dark:bg-zinc-600"></span>
            <span>01 // Discover</span>
          </div>
          <BlurReveal
            as="h2"
            text={about.heading || "About & Philosophy"}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-display"
            duration={0.65}
            stagger={0.04}
          />
          <BlurReveal
            as="p"
            text={about.subtitle || "Creative Developer & UI Motion Engineer crafting weightless digital experiences."}
            className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg max-w-2xl"
            delay={0.15}
            duration={0.55}
          />
        </div>

        {/* Sticky Stacking Cards Container */}
        <div className="relative space-y-6">

          {/* ========================================================================= */}
          {/* CARD 1: The Identity & Core Philosophy */}
          {/* ========================================================================= */}
          <StackingCard index={0} total={4}>
            <div className="flex flex-col justify-between space-y-8 text-left">
              {/* Header Badge & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-xs font-mono text-zinc-800 dark:text-zinc-200">
                  <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Card 01 // Identity</span>
                </div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  ROLE: {about.role || "Creative Developer"}
                </span>
              </div>

              {/* Core Statement & Bio */}
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-100 font-display tracking-tight leading-snug">
                  Bridging the gap between raw frontend architecture, spatial depth, and fluid motion design.
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                  {about.bio}
                </p>
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-mono flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Core Philosophy:</strong> {about.philosophy}
                  </span>
                </div>
              </div>

              {/* Visual Tags / Characteristics */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                {[
                  "Spatial 3D Layouts",
                  "Hardware-Accelerated Motion",
                  "WCAG Accessible Architecture",
                  "Zero Jank Standard",
                  "Monochrome Aesthetics"
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs font-mono text-zinc-700 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </StackingCard>

          {/* ========================================================================= */}
          {/* CARD 2: Motion & Tech Capabilities */}
          {/* ========================================================================= */}
          <StackingCard index={1} total={4}>
            <div className="flex flex-col justify-between space-y-7 text-left">
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-xs font-mono text-zinc-800 dark:text-zinc-200">
                  <Code2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Card 02 // Motion & Tech Capabilities</span>
                </div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  MODERN STACK • 2026
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-100 font-display tracking-tight">
                  High-Performance Interactive Tooling
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Engineered with strict zero-bloat practices, native GPU bindings, and modern component systems.
                </p>
              </div>

              {/* Interactive Tech Capabilities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {(about.techStack || []).map((tech, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveTechTab(idx)}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                      activeTechTab === idx
                        ? 'bg-zinc-100/90 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 shadow-xs'
                        : 'bg-zinc-50/60 dark:bg-zinc-800/30 border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 uppercase">
                          {tech.category}
                        </span>
                        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-medium">
                          {tech.level}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-zinc-950 dark:text-zinc-100 font-display">
                        {tech.name}
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                        {tech.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StackingCard>

          {/* ========================================================================= */}
          {/* CARD 3: The Craft & Principles */}
          {/* ========================================================================= */}
          <StackingCard index={2} total={4}>
            <div className="flex flex-col justify-between space-y-7 text-left">
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-xs font-mono text-zinc-800 dark:text-zinc-200">
                  <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Card 03 // The Craft & Principles</span>
                </div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  ENGINEERING PILLARS
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-100 font-display tracking-tight">
                  Architectural Rigor & Visual Craft
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Guiding principles ensuring every interface delivers tactile feedback, weightlessness, and rock-solid stability.
                </p>
              </div>

              {/* 4 Pillars Grid (Inspired by clean Bento Card Deck) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(about.craftPrinciples || []).map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-mono flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase">
                            {pillar.tag}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300">
                          {pillar.metric}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-zinc-950 dark:text-zinc-100 font-display">
                        {pillar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StackingCard>

          {/* ========================================================================= */}
          {/* CARD 4: Live Status & Availability */}
          {/* ========================================================================= */}
          <StackingCard index={3} total={4}>
            <div className="flex flex-col justify-between space-y-7 text-left">
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-xs font-mono text-zinc-800 dark:text-zinc-200">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Card 04 // Live Status & Availability</span>
                </div>
                <span className="text-xs font-mono text-emerald-500 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  OPERATIONAL & READY
                </span>
              </div>

              {/* Status Header */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-100 font-display tracking-tight">
                  Real-time Availability & Metrics
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Open for selected creative engineering collaborations, contract roles, and UI motion consultations.
                </p>
              </div>

              {/* 2-Column Info Deck: Live Clock + Availability Badge */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Jakarta Clock Widget */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">CURRENT BASE</span>
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-zinc-950 dark:text-zinc-100 font-display">Jakarta, ID</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">GMT+7 • West Indonesia Time</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
                    <Clock className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                    <span className="text-sm font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                      {time ? `${time} WIB` : 'Synchronizing...'}
                    </span>
                  </div>
                </div>

                {/* Availability Callout Card */}
                <div className="p-5 rounded-2xl bg-zinc-950 dark:bg-zinc-900 text-white border border-zinc-800 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">CONTRACT STATUS</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold uppercase">
                      Open Q3/Q4
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 font-mono">Accepting</p>
                    <h4 className="text-lg font-bold text-white font-display mt-0.5">Freelance & Senior Roles</h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> Response: &lt; 24 Hours
                    </span>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-white hover:text-blue-400 transition-colors"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Polished Metric Counters Deck */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {(about.stats || []).map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200/70 dark:border-zinc-800 text-left">
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-50">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300 font-mono mt-1">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                      {stat.subtext}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StackingCard>

        </div>

      </div>
    </section>
  )
}
