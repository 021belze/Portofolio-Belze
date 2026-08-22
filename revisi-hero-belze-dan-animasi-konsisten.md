# 🎯 Panduan & Spesifikasi: Hero Centerpiece "BELZE" & Sistem Animasi Konsisten

Dokumen ini berisi kode sumber dan instruksi perombakan layout halaman **Home / Hero** agar teks 3D **"BELZE"** menjadi fokus visual utama di tengah (*center stage*), membersihkan elemen kartu kode/kolom kanan yang tidak perlu, serta menyelaraskan kurva animasi (*scroll reveal & blur*) pada seluruh kartu di website.

---

## 🎨 1. Konsep Perombakan Hero Section

- **Center Focal Point**: Teks 3D **"BELZE"** ditempatkan tepat di tengah layar dengan ukuran besar, tebal (*bold/chunky*), berelemen *anti-gravity float*, dan merespons gerakan kursor mouse (*parallax tilt*).
- **Clean Layout**: Menghapus kotak kode `developer.config.ts` dan memusatkan seluruh elemen (Headline, Subtitle, CTA buttons, dan Social Links) dalam satu garis simetris di tengah.
- **Essential Actions**: 
  - Tombol CTA: `"View Projects"` & `"Contact Me"`.
  - Social Links: **GitHub**, **LinkedIn**, dan **X (Twitter)** dengan icon Lucide.
  - Background Wave Transition di dasar section.

---

## 🧩 2. Komponen Universal Animasi: `src/components/CardReveal.jsx`

Gunakan komponen ini untuk membungkus semua kartu (Bento Grid, Featured Projects, dan Contact Box) agar seluruh animasi di web memiliki kurva gerak, tingkat blur, dan *stagger delay* yang identik dan konsisten:

```jsx
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
```

---

## 💎 3. Komponen 3D Centerpiece: `src/components/ThreeBelzeCanvas.jsx`

Komponen teks 3D "BELZE" besar dan tebal (*metallic chrome*) dengan pencahayaan dinamis dan interaksi mouse:

```jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Center } from "@react-three/drei";
import * as THREE from "three";

function FloatingBelzeMesh() {
  const groupRef = useRef();

  useFrame((state) => {
    // Interaksi kursor mouse: rotasi halus mengikuti gerakan mouse
    const targetX = (state.mouse.x * Math.PI) / 8;
    const targetY = (state.mouse.y * Math.PI) / 8;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.2} floatingRange={[-0.1, 0.1]}>
        <Center>
          <Text
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_eeA.woff"
            fontSize={2.6}
            letterSpacing={0.08}
            fontWeight={900}
          >
            BELZE
            {/* Material Metallic Chrome Dark */}
            <meshStandardMaterial
              color="#e4e4e7"
              roughness={0.15}
              metalness={0.9}
              envMapIntensity={1.5}
            />
          </Text>
        </Center>
      </Float>
    </group>
  );
}

export default function ThreeBelzeCanvas() {
  return (
    <div className="w-full h-56 md:h-80 cursor-grab active:cursor-grabbing select-none flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        {/* Lampu Utama */}
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#ffffff" />
        {/* Rim Light Biru (Aksen Modern) */}
        <pointLight position={[-4, -3, -2]} intensity={4} color="#3b82f6" />
        <pointLight position={[4, 3, 2]} intensity={2.5} color="#60a5fa" />
        <FloatingBelzeMesh />
      </Canvas>
    </div>
  );
}
```

---

## 🏛️ 4. Layout Baru Hero Section: `src/components/Hero.jsx`

Layout baru yang simetris di tengah (*center-aligned*), tanpa kartu kode, dan langsung menampilkan teks 3D BELZE, Headline, Tombol CTA, serta Social Links:

```jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import ThreeBelzeCanvas from "./ThreeBelzeCanvas";
import BlurReveal from "./BlurReveal";
import WaveDivider from "./WaveDivider";

export default function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-screen pt-28 pb-36 flex flex-col justify-between items-center overflow-hidden bg-black text-white"
    >
      {/* Container Utama (Rata Tengah) */}
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center relative z-20 my-auto w-full">
        
        {/* 1. Status Badge */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)", y: 15 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono text-zinc-300 mb-2 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Available for new projects & collaborations
        </motion.div>

        {/* 2. 3D BELZE Centerpiece (Point of View Utama) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full my-[-10px] md:my-[-20px]"
        >
          <ThreeBelzeCanvas />
        </motion.div>

        {/* 3. Headline dengan Word-by-Word Blur Reveal */}
        <BlurReveal
          as="h1"
          text="Building Digital Experiences through Clean Code & Minimal Design."
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-3xl"
          delay={0.35}
          stagger={0.04}
        />

        {/* 4. Subtitle */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl mt-5 leading-relaxed"
        >
          Crafting modern, accessible, and high-performance digital products with a strong emphasis on minimalist aesthetics and anti-gravity interactions.
        </motion.p>

        {/* 5. CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-all hover:scale-105 shadow-lg shadow-white/10"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 text-white font-medium text-sm hover:bg-zinc-800 hover:border-zinc-700 transition-all hover:scale-105"
          >
            Contact Me
          </a>
        </motion.div>

        {/* 6. Social Links (GitHub, LinkedIn, X) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex items-center gap-6 mt-8 pt-6 border-t border-zinc-800/80 text-zinc-400"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-colors p-1"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors p-1"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="hover:text-white transition-colors p-1"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </motion.div>

      </div>

      {/* 7. Wave Divider di Bagian Bawah */}
      <WaveDivider colorTheme="monochrome" />
    </section>
  );
}
```

---

## 📂 5. Penerapan Sistem Animasi pada Bento Grid & Projects

Gunakan `<CardContainer>` dan `<CardItem>` pada section lainnya agar efek kemunculannya konsisten dengan Hero:

### A. Pada Bento Grid (`src/components/About.jsx`)
```jsx
import React from "react";
import BlurReveal from "./BlurReveal";
import { CardContainer, CardItem } from "./CardReveal";

export default function About() {
  return (
    <section id="about" className="py-24 max-w-6xl mx-auto px-6">
      <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">01 // Discover</span>
      <BlurReveal as="h2" text="About Me" className="text-3xl md:text-4xl font-bold text-white mt-1 mb-8" />

      {/* Grid Kartu Bento */}
      <CardContainer className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" stagger={0.08}>
        <CardItem className="md:col-span-2 lg:col-span-2 rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
          {/* Card 1: Bio */}
        </CardItem>
        <CardItem className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
          {/* Card 2: Jakarta Time */}
        </CardItem>
        <CardItem className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
          {/* Card 3: Status */}
        </CardItem>
        <CardItem className="md:col-span-3 lg:col-span-4 rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
          {/* Card 4: Tech Stack */}
        </CardItem>
      </CardContainer>
    </section>
  );
}
```

### B. Pada Projects Showcase (`src/components/Projects.jsx`)
```jsx
import React from "react";
import BlurReveal from "./BlurReveal";
import { CardContainer, CardItem } from "./CardReveal";

export default function Projects() {
  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto px-6">
      <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">02 // Selected Works</span>
      <BlurReveal as="h2" text="Featured Projects" className="text-3xl md:text-4xl font-bold text-white mt-1 mb-8" />

      {/* Grid Proyek */}
      <CardContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
        {projects.map((project, idx) => (
          <CardItem key={idx}>
            {/* Komponen Project Card */}
          </CardItem>
        ))}
      </CardContainer>
    </section>
  );
}
```

---

## 📋 6. Salin Prompt Ini ke AI Coding Assistant

```markdown
Tolong perbarui komponen Hero dan sistem animasi website portofolio saya dengan ketentuan berikut:

1. **Hero Section (`src/components/Hero.jsx`)**:
   - Jadikan teks 3D "BELZE" (`ThreeBelzeCanvas`) sebagai focal point utama di tengah halaman (center-aligned), dibuat berukuran besar, tebal, dan bernuansa dark metallic chrome.
   - Hapus layout dua kolom, hapus kotak kode `developer.config.ts`, dan pusatkan seluruh elemen ke tengah.
   - Susunan elemen vertikal: Status Badge -> 3D BELZE Canvas -> Headline (BlurReveal) -> Subtitle -> Tombol CTA ("View Projects" dan "Contact Me") -> Social Icons (GitHub, LinkedIn, X).
   - Pertahankan WaveDivider di bagian paling bawah.

2. **Konsistensi Animasi Kartu (`src/components/CardReveal.jsx`)**:
   - Buat helper `CardContainer` dan `CardItem` menggunakan Framer Motion dengan transisi `blur(10px) -> blur(0px)`, `opacity: 0 -> 1`, `scale: 0.96 -> 1`, dan kurva easing `[0.16, 1, 0.3, 1]`.
   - Pasang pembungkus ini pada Bento Grid (`About.jsx`) dan Featured Projects (`Projects.jsx`).

Semua kode sumber sudah tersedia di file panduan markdown. Tolong terapkan dan sesuaikan!
```
