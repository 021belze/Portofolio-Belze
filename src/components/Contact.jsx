import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { MapPin, Send, Check, Copy, ArrowUpRight, MessageSquare } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import BlurReveal from './BlurReveal'
import { CardContainer, CardItem } from './CardReveal'

export default function Contact() {
  const { contact } = portfolioData
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#2563eb', '#38bdf8', '#10b981', '#f59e0b', '#8b5cf6'],
      })
    } catch {
      // Graceful fallback
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')

    setTimeout(() => {
      setStatus('success')
      triggerConfetti()
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 900)
  }

  return (
    <section id="contact" className="py-24 bg-zinc-50/70 dark:bg-zinc-900/30 border-t border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="space-y-2 mb-16 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
            <span className="w-6 h-px bg-zinc-400 dark:bg-zinc-600"></span>
            <span>03 // Connection</span>
          </div>
          <BlurReveal
            as="h2"
            text={contact.heading}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-display"
            duration={0.65}
            stagger={0.04}
          />
          <BlurReveal
            as="p"
            text={contact.subtitle}
            className="text-zinc-500 dark:text-zinc-400 text-base max-w-xl"
            delay={0.15}
            duration={0.55}
          />
        </div>

        {/* 2-Column Responsive Layout with CardContainer & CardItem */}
        <CardContainer className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" stagger={0.12}>

          {/* Left Column: Contact Details & Social Handles */}
          <CardItem className="lg:col-span-5 space-y-8 text-left">

            {/* Email Box with One-Click Copy */}
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="font-mono text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:underline"
                >
                  {contact.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                  ✓ Email copied to clipboard!
                </p>
              )}
            </div>

            {/* Quick Specs */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">Location</div>
                  <BlurReveal
                    as="div"
                    text={contact.location}
                    className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm"
                    duration={0.5}
                    stagger={0.02}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">Availability</div>
                  <BlurReveal
                    as="div"
                    text={contact.availabilityText}
                    className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm"
                    duration={0.5}
                    stagger={0.02}
                  />
                </div>
              </div>
            </div>

            {/* Social Links List */}
            <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <BlurReveal
                as="h4"
                text="Connect Online"
                className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold"
                duration={0.5}
                stagger={0.04}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {contact.socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors group"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

          </CardItem>

          {/* Right Column: Contact Form */}
          <CardItem className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 sm:p-8 shadow-sm text-left">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
                    >
                      Your Name <span className="text-zinc-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
                    >
                      Email Address <span className="text-zinc-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all"
                    />
                  </div>

                </div>

                {/* Subject Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="Project Inquiry / Anti-Gravity Collaboration"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400"
                  >
                    Message <span className="text-zinc-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    placeholder="Tell me about your vision, timeline, or thoughts..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/50 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 text-sm font-semibold transition-all duration-200 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <span>Sending message...</span>
                    ) : status === 'success' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Message Sent Successfully!</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </CardItem>

        </CardContainer>

      </div>
    </section>
  )
}
