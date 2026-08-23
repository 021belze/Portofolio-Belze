# 🚀 Panduan Implementasi: Smooth Inertia Scroll (Lenis) & Word-by-Word Blur Reveal (Framer Motion)

Dokumen ini berisi panduan teknis dan kode sumber untuk menerapkan 2 fitur animasi modern bergaya *Awwwards* (seperti pada web `michaeltsirakis.com`):
1. **Smooth Inertia Scrolling (Lenis)**: Memberikan efek pergerakan scroll roda mouse yang halus, berbobot, dan tidak patah-patah.
2. **Word-by-Word Blur Reveal (Framer Motion)**: Teks judul/subjudul muncul mengalir per kata dari kondisi blur (`blur-in`) dan transparan saat memasuki area layar (*viewport*).

---

## 📦 1. Instalasi Dependensi

Jalankan perintah berikut di terminal proyek React Anda:

```bash
npm install lenis framer-motion
```

*(Catatan: Jika `framer-motion` sudah terinstal sebelumnya, Anda hanya perlu menjalankan `npm install lenis`)*.

---

## ⚙️ 2. Konfigurasi Smooth Inertia Scroll (Lenis)

Buka file utama aplikasi Anda (**`src/App.jsx`**), lalu inisialisasi instance Lenis di dalam `useEffect` agar efek scroll halus aktif di seluruh halaman:

```jsx
import React, { useEffect } from "react";
import Lenis from "lenis";

// Import komponen-komponen portofolio Anda
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    // Inisialisasi Lenis dengan parameter easing halus
    const lenis = new Lenis({
      duration: 1.2, // Durasi inersia (detik)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing curve
      smoothWheel: true,
      wheelMultiplier: 1, // Sensitivitas scroll wheel
      touchMultiplier: 2,
    });

    // Sinkronisasi dengan requestAnimationFrame browser
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup saat komponen unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```

---

## 🔤 3. Buat Komponen Reusable `BlurReveal.jsx`

Buat file baru di **`src/components/BlurReveal.jsx`**. Komponen ini bertugas memecah string teks menjadi array kata, lalu menerapkan transisi animasi stagger (*blur + opacity + translateY*):

```jsx
import React from "react";
import { motion } from "framer-motion";

export default function BlurReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.05,
  as: Component = "h2", // Tag HTML yang digunakan (h1, h2, h3, p, span)
}) {
  // Pecah teks berdasarkan spasi menjadi kata-kata
  const words = text.split(" ");

  // Container variants untuk mengatur jeda antar kata (stagger)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  // Word variants untuk animasi blur, opacity, dan dorongan posisi Y
  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 16,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier easing (ultra smooth)
      },
    },
  };

  return (
    <Component className={`overflow-hidden ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        className="inline-block"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-[0.28em] will-change-[transform,filter,opacity]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
```

---

## 💡 4. Contoh Penggunaan pada Komponen Halaman

Anda bisa membungkus judul atau subjudul di section mana pun cukup dengan mengimpor `<BlurReveal />`:

### A. Pada `src/components/Projects.jsx`
```jsx
import React from "react";
import BlurReveal from "./BlurReveal";

export default function Projects() {
  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto px-6">
      
      {/* Label kecil di atas judul */}
      <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
        Selected Work
      </span>

      {/* Judul Utama dengan Animasi Word-by-Word Blur */}
      <BlurReveal
        as="h2"
        text="Generative AI & Modern Web Development"
        className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight mt-2 mb-4"
        duration={0.7}
        stagger={0.06}
      />

      {/* Subjudul dengan jeda delay sedikit */}
      <BlurReveal
        as="p"
        text="A curated selection of digital products, design systems, and client solutions."
        className="text-zinc-500 text-base md:text-lg max-w-2xl mb-12"
        delay={0.2}
        duration={0.6}
      />

      {/* Grid Proyek Anda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card items... */}
      </div>

    </section>
  );
}
```

### B. Pada `src/components/About.jsx`
```jsx
import React from "react";
import BlurReveal from "./BlurReveal";

export default function About() {
  return (
    <section id="about" className="py-24 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        <BlurReveal
          as="h2"
          text="Crafting high-impact interfaces with attention to microscopic details."
          className="text-3xl md:text-4xl font-bold text-zinc-900 max-w-3xl"
        />
      </div>
    </section>
  );
}
```

---

## 🎛️ 5. Parameter Kustomisasi `BlurReveal`

| Prop | Tipe Data | Nilai Default | Keterangan |
| :--- | :--- | :--- | :--- |
| `text` | `string` | *(Wajib)* | Kalimat atau teks yang akan dianimasikan. |
| `as` | `string` | `"h2"` | Tag HTML target (`"h1"`, `"h2"`, `"p"`, `"span"`). |
| `className` | `string` | `""` | Class styling Tailwind CSS (warna, font size, margin, dll). |
| `delay` | `number` | `0` | Jeda waktu tunggu sebelum animasi dimulai (dalam detik). |
| `duration` | `number` | `0.6` | Kecepatan transisi masing-masing kata (dalam detik). |
| `stagger` | `number` | `0.05` | Jarak jeda kemunculan antar-kata (semakin kecil, semakin cepat mengalir). |

---

## 🚀 Keunggulan Kombinasi Ini:
- **Performa 60+ FPS**: Properti `will-change-[transform,filter,opacity]` memberitahu GPU browser untuk merender transisi secara mulus tanpa lag.
- **Trigger Tepat Sasaran**: `viewport={{ once: true, margin: "-10% 0px" }}` memastikan animasi hanya mulai saat teks sudah masuk 10% ke dalam layar pengguna dan tidak mengulang-ulang saat di-scroll bolak-balik.
