import React from 'react'

export default function WaveDivider({
  colorTheme = "monochrome",
  className = "",
  heightClass = "h-36 sm:h-48 md:h-64 lg:h-80",
}) {
  const themes = {
    monochrome: {
      layer1: "text-zinc-300/60 dark:text-zinc-800/60",
      layer2: "text-zinc-200/75 dark:text-zinc-800/40",
      layer3: "text-zinc-100 dark:text-zinc-900/80",
    },
    blue: {
      layer1: "text-blue-900/40 dark:text-blue-950/70",
      layer2: "text-blue-600/30 dark:text-blue-600/40",
      layer3: "text-sky-400/25 dark:text-sky-500/30",
    },
    oceanDeep: {
      layer1: "text-slate-900/50 dark:text-slate-900/80",
      layer2: "text-blue-800/35 dark:text-blue-800/50",
      layer3: "text-cyan-500/25 dark:text-cyan-400/30",
    },
  };

  const activeTheme = themes[colorTheme] || themes.monochrome;

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <div className={`relative w-full ${heightClass}`}>
        {/* Layer 1 */}
        <svg
          className={`absolute bottom-0 w-[200%] h-full animate-wave-1 ${activeTheme.layer1} fill-current`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,25 C180,95 380,-15 600,25 C820,95 1020,-15 1200,25 L1200,120 L0,120 Z" />
        </svg>

        {/* Layer 2 */}
        <svg
          className={`absolute bottom-0 w-[200%] h-full animate-wave-2 ${activeTheme.layer2} fill-current`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,45 C200,110 420,5 600,45 C780,110 1000,5 1200,45 L1200,120 L0,120 Z" />
        </svg>

        {/* Layer 3 */}
        <svg
          className={`absolute bottom-0 w-[200%] h-full animate-wave-3 ${activeTheme.layer3} fill-current`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,65 C250,115 360,25 600,65 C850,115 960,25 1200,65 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
}
