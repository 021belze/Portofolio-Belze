# 🚀 Master Blueprint & Prompt: Ultra-Modern Anti-Gravity React Portfolio ("BELZE")

Dokumen ini adalah cetak biru (*master blueprint*) dan prompt siap pakai untuk merombak total website portofolio minimalis menjadi website interaktif kelas modern (*Awwwards / Linear / Vercel style*). 

Menghadirkan fitur: **3D Interactive Text "BELZE"**, **Cinematic Scroll Blur-Up Effect**, **Magnetic Buttons**, **3D Card Hover Perspective**, **Apple-Style Bento Grid**, dan **Multi-Layer Wave Transition**.

---

## 📦 1. Instalasi Dependensi Tambahan

Jalankan perintah ini di terminal proyek Anda untuk menginstal Three.js dan pendukung 3D:

```bash
npm install three @react-three/fiber @react-three/drei canvas-confetti
```

*(Dependensi `framer-motion`, `clsx`, `tailwind-merge`, `lucide-react`, dan `tailwindcss` diasumsikan sudah terpasang).*

---

## 🧩 2. Komponen Interaktif & Kode Sumber

### A. 3D Floating Anti-Gravity Canvas (`src/components/ThreeBelzeCanvas.jsx`)
Komponen 3D teks "BELZE" dan partikel melayang dengan efek gravitasi halus yang merespons pergerakan kursor mouse.

```jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, MeshDistortMaterial, Sphere } from "@react-three/drei";

function FloatingBelzeText({ mouse }) {
  const textRef = useRef();

  useFrame((state) => {
    // Parallax mouse interaction
    const targetX = (state.mouse.x * Math.PI) / 10;
    const targetY = (state.mouse.y * Math.PI) / 10;
    textRef.current.rotation.y += (targetX - textRef.current.rotation.y) * 0.05;
    textRef.current.rotation.x += (-targetY - textRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={textRef}>
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <Text
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_eeA.woff"
          fontSize={1.4}
          letterSpacing={0.08}
          color="#09090b"
          position={[0, 0, 0]}
        >
          BELZE
          <meshStandardMaterial
            color="#18181b"
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </Text>
      </Float>

      {/* Floating Ambient Sphere */}
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.3, 32, 32]} position={[2.2, 0.8, -0.5]}>
          <MeshDistortMaterial
            color="#2563eb"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function ThreeBelzeCanvas() {
  return (
    <div className="w-full h-48 md:h-64 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, -2]} intensity={1} color="#3b82f6" />
        <FloatingBelzeText />
      </Canvas>
    </div>
  );
}
```

---

### B. Magnetic Button Interaktif (`src/components/MagneticButton.jsx`)
Tombol CTA dengan efek magnet elastis yang tertarik ke arah kursor mouse.

```jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ children, className = "", onClick, ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center font-medium transition-colors ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

---

### C. 3D Hover Tilt & Glare Card (`src/components/ProjectCard3D.jsx`)
Kartu proyek dengan efek perspektif 3D dan efek kilauan (*spotlight glare*) mengikuti kursor.

```jsx
import React, { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

export default function ProjectCard3D({ project }) {
  const cardRef = useRef(null);
  const [rotations, setRotations] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotations({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotations({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: "1000px" }}
      className="w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotations.x}deg) rotateY(${rotations.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="relative group rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      >
        {/* Spotlight Glare Effect */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(400px circle at ${glare.x}% ${glare.y}%, rgba(37,99,235,0.2), transparent 70%)`,
          }}
        />

        {/* Project Thumbnail Placeholder */}
        <div className="w-full aspect-video rounded-xl bg-zinc-100 border border-zinc-200/80 mb-5 flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
          <span className="text-zinc-400 font-mono text-xs uppercase tracking-wider">
            {project.category || "Web Application"}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags?.map((tag, i) => (
            <span
              key={i}
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Project Info */}
        <h3 className="text-lg font-bold text-zinc-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
          {project.title}
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h3>
        <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
          {project.description}
        </p>

        {/* Action Links */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-zinc-100">
          <a
            href={project.liveUrl || "#"}
            className="text-xs font-semibold text-zinc-900 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Live Demo
          </a>
          <a
            href={project.githubUrl || "#"}
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 flex items-center gap-1.5 transition-colors"
          >
            <Github className="w-3.5 h-3.5" /> Source Code
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

### D. Apple-Style Bento Grid (`src/components/AboutBento.jsx`)
Menggantikan layout About Me biasa dengan kotak-kotak modular interaktif (Live Jakarta Clock, Tech Stack Marquee, Quick Stats).

```jsx
import React, { useState, useEffect } from "react";
import { MapPin, Clock, Sparkles, Terminal, Code2 } from "lucide-react";

export default function AboutBento() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const jakartaTime = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
      setTime(jakartaTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 bg-zinc-50/50 border-y border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">About Me</span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-1">
            Architecting Seamless Digital Solutions
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Bio Utama (Lebar 2 Kolom) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-2xl bg-white border border-zinc-200 p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-700 mb-4">
                <Terminal className="w-3.5 h-3.5" /> Frontend Architect
              </div>
              <p className="text-zinc-600 text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Passionate about building anti-gravity user interfaces, high-performance web apps, and clean design systems.
              </p>
            </div>
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-zinc-100">
              <div>
                <span className="text-2xl font-bold text-zinc-900 font-mono">3+</span>
                <p className="text-xs text-zinc-400">Years Exp</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-zinc-900 font-mono">25+</span>
                <p className="text-xs text-zinc-400">Shipped Projects</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-zinc-900 font-mono">99.8%</span>
                <p className="text-xs text-zinc-400">Commit Accuracy</p>
              </div>
            </div>
          </div>

          {/* Card 2: Live Location & Time (1 Kolom) */}
          <div className="rounded-2xl bg-white border border-zinc-200 p-6 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">CURRENT BASE</span>
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div className="my-4">
              <h4 className="text-xl font-bold text-zinc-900">Jakarta, ID</h4>
              <p className="text-xs text-zinc-500 font-mono mt-1">GMT+7 • West Indonesia</p>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/80">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-mono text-zinc-700 font-medium">{time || "00:00:00 WIB"}</span>
            </div>
          </div>

          {/* Card 3: Status / Activity (1 Kolom) */}
          <div className="rounded-2xl bg-zinc-900 text-white p-6 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">STATUS</span>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div className="my-4">
              <p className="text-xs text-zinc-400 uppercase font-mono">Available For</p>
              <h4 className="text-lg font-bold text-white mt-0.5">Freelance & Full-time</h4>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              ⚡ Response time: &lt; 24h
            </p>
          </div>

          {/* Card 4: Tech Stack Badges (Lebar Penuh / 4 Kolom) */}
          <div className="md:col-span-3 lg:col-span-4 rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-4 h-4 text-zinc-500" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Core Technologies & Tools</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {[
                "React 19", "Next.js", "TypeScript", "Tailwind CSS", "Three.js / R3F",
                "Framer Motion", "Node.js", "PostgreSQL", "Git", "Figma", "REST / GraphQL", "Vite"
              ].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-800 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
```

---

### E. Hero Section dengan Cinematic Scroll Blur-Up (`src/components/Hero.jsx`)
Mengombinasikan 3D Canvas BELZE, Animated Wave, Magnetic Buttons, dan efek scroll transform:

```jsx
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import ThreeBelzeCanvas from "./ThreeBelzeCanvas";
import MagneticButton from "./MagneticButton";
import WaveDivider from "./WaveDivider";

export default function Hero() {
  const { scrollY } = useScroll();

  // Scroll Transformation: scale down, blur, & lift up as user scrolls
  const scale = useTransform(scrollY, [0, 400], [1, 0.94]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0.4]);
  const y = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-32 flex flex-col justify-between overflow-hidden bg-white">
      
      {/* Dynamic Scroll Transform Container */}
      <motion.div 
        style={{ scale, opacity, y }}
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20 my-auto"
      >
        {/* Left Column: Headlines & Call To Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-xs font-mono text-zinc-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for new projects & collaborations
          </div>

          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
            BELZE — SENIOR FRONTEND ENGINEER & UI DESIGNER
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
            Building Digital Experiences through{" "}
            <span className="underline decoration-zinc-300 underline-offset-8">Clean Code</span> &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-blue-600">
              Minimal Design.
            </span>
          </h1>

          <p className="text-zinc-600 text-base md:text-lg max-w-xl leading-relaxed">
            Crafting modern, accessible, and high-performance digital products with a strong emphasis on minimalist aesthetics and anti-gravity interactions.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium gap-2 shadow-lg shadow-zinc-900/10">
              View Projects <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton className="px-6 py-3 rounded-xl border border-zinc-300 hover:border-zinc-900 bg-white text-zinc-900 text-sm font-medium gap-2">
              Contact Me
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: 3D BELZE Canvas & Code Box */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* 3D Interactive BELZE Canvas */}
          <ThreeBelzeCanvas />

          {/* Interactive Code Mockup */}
          <div className="w-full rounded-2xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs text-zinc-300 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-zinc-500">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span>belze.config.ts</span>
            </div>
            <p className="text-purple-400">const <span className="text-blue-400">developer</span> = &#123;</p>
            <p className="pl-4 text-zinc-400">name: <span className="text-emerald-400">"Belze"</span>,</p>
            <p className="pl-4 text-zinc-400">focus: <span className="text-emerald-400">"Anti-Gravity UI & React"</span>,</p>
            <p className="pl-4 text-zinc-400">status: <span className="text-emerald-400">"Ready to Ship"</span></p>
            <p className="text-purple-400">&#125;;</p>
          </div>
        </div>
      </motion.div>

      {/* Multi-Layer Animated Wave di Bagian Bawah */}
      <WaveDivider colorTheme="monochrome" />
    </section>
  );
}
```

---

## 📋 3. Salin Prompt Ini ke AI Coding Assistant

```markdown
Tolong rombak website portofolio React saya dengan fitur-fitur interaktif modern berikut:

1. **Hero Section**:
   - Pasang 3D interactive floating canvas untuk teks "BELZE" menggunakan `@react-three/fiber` dan `@react-three/drei`.
   - Tambahkan efek Cinematic Scroll Blur & Scale Transform menggunakan Framer Motion `useScroll` dan `useTransform`.
   - Gunakan Magnetic Button untuk semua tombol CTA ("View Projects" dan "Contact Me").
   - Pasang Multi-Layer Wave Divider di dasar section Hero.

2. **About Section**:
   - Ubah layout menjadi modern Apple-Style Bento Grid (4 kolom).
   - Sertakan Live Jakarta Clock widget (`Asia/Jakarta`), Status badge ketersediaan kerja dengan pulsating green dot, statistik angka, dan Tech Stack badges.

3. **Projects Section**:
   - Ubah kartu proyek menjadi `ProjectCard3D` dengan efek 3D tilt perspective saat hover dan spotlight glare radial yang mengikuti kursor mouse.

4. **Style Guide**:
   - Tetap pertahankan warna monokromatik netral (`zinc-900`, `zinc-500`, `white`), dengan aksen biru modern (`blue-600`) pada interaksi hover/spotlight.

Seluruh file komponen sudah disediakan pada blueprint dokumentasi. Tolong sinkronkan `App.jsx` dan hubungkan semua komponen tersebut!
```
