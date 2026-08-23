# System Prompt: Minimalist Monochrome React Portfolio Template Generator

Gunakan prompt di bawah ini untuk meminta AI coding assistant (seperti Cursor, ChatGPT, Claude, atau Gemini) membuat kerangka awal (*starter template*) website portofolio berbasis **React** dengan gaya monokromatik/netral minimalis.

---

## 📋 Salin & Tempel Prompt Berikut:

```markdown
Bertindaklah sebagai Senior Frontend Engineer & UI/UX Designer. Tolong buatkan template website portofolio profesional dan modern menggunakan **React** (Vite) dan **Tailwind CSS**.

### 🎯 Tujuan Proyek
Membuat kerangka awal (*starter template/wireframe*) website portofolio pribadi. Seluruh konten deskripsi, judul proyek, dan bio masih menggunakan teks placeholder (**Lorem Ipsum**) agar mudah diganti oleh pengguna di kemudian hari.

---

### 🎨 Desain & Skema Warna (Neutral / Monochrome)
- **Palette**: Hanya gunakan warna-warna netral:
  - Background Utama: Putih murni (`#ffffff` / `bg-white`) dan variasi abu-abu sangat muda untuk section alternate (`bg-neutral-50` / `bg-zinc-50`).
  - Text Utama: Hitam pekat (`#09090b` / `text-zinc-900`) untuk kontras tinggi.
  - Text Sekunder / Muted: Abu-abu netral (`text-zinc-500` / `text-neutral-400`).
  - Borders & Dividers: Garis tipis halus (`border-zinc-200` atau `border-neutral-200`).
  - Buttons / CTA: Hitam solid dengan teks putih (`bg-zinc-900 hover:bg-zinc-800 text-white`) atau border hitam outline (`border border-zinc-900 text-zinc-900 hover:bg-zinc-100`).
- **Gaya Desain**: Ultra-minimalis, modern, clean typography (Inter / Geist sans font style), banyak *whitespace*, dan micro-interactions yang halus (smooth transition on hover/focus).

---

### 📑 Halaman / Komponen yang Wajib Ada:

1. **Navbar (Header)**:
   - Sticky / Fixed navigation dengan background semi-transparan (`backdrop-blur-md`).
   - Logo / Inisial teks minimalis (e.g., `[ John Doe ]` atau `JD.`).
   - Navigasi menu: `Home`, `About`, `Projects`, `Contact`.
   - Tombol CTA minimalis: `"Resume"` atau `"Get in Touch"`.
   - Responsif (Hamburger menu untuk tampilan mobile).

2. **Home (Hero Section)**:
   - Status badge minimalis (e.g., `"● Available for new projects"` dengan dot indicator).
   - Headline/Title tebal & impresif: e.g., *"Building Digital Experiences through Clean Code & Minimal Design."*
   - Subtitle: 2-3 kalimat Lorem Ipsum menjelaskan peran singkat.
   - Dual Call-to-Action buttons: `"View Projects"` (Solid Black) dan `"Contact Me"` (Outlined).
   - Placeholder visual: Box rasio 1:1 atau mockup wireframe placeholder dengan border tipis dan efek grid/pattern netral.

3. **About Me Section**:
   - Heading Section: `"About Me"` + Subtitle pendek.
   - Layout 2 kolom (Desktop) / 1 kolom (Mobile):
     - Kolom Kiri: Foto profil placeholder (grayscale box/avatar) & data singkat (Lokasi, Pengalaman, Bahasa).
     - Kolom Kanan: 2-3 paragraf Lorem Ipsum menceritakan latar belakang, filosofi kerja, dan pendekatan desain.
   - Skills & Tech Stack Grid: Badge/Tag minimalis bernuansa monokrom (e.g., React, TypeScript, Tailwind CSS, Next.js, Git, UI/UX).

4. **Projects Section**:
   - Heading Section: `"Featured Projects"` + deskripsi singkat.
   - Grid Kartu Proyek (2 atau 3 kolom):
     - Gambar placeholder proyek (rasio 16:9 dengan background `bg-zinc-100` dan icon gambar).
     - Label kategori / tag teknologi (e.g., `"Web App"`, `"React & API"`).
     - Judul Proyek: e.g., *"Project Alpha - Lorem Ipsum Platform"*.
     - Deskripsi: 2 kalimat Lorem Ipsum ringkas.
     - Action Links: Link teks dengan ikon `"Live Preview"` dan `"GitHub Repository"`.
   - Sertakan minimal 4-6 contoh item proyek mockup.

5. **Contact Section**:
   - Heading Section: `"Get In Touch"` / `"Let's Work Together"`.
   - Layout terbagi dua:
     - Detail Kontak: Alamat email placeholder (`hello@example.com`), nomor telepon, lokasi, dan daftar link media sosial (GitHub, LinkedIn, Twitter/X, Dribbble) dengan ikon bersih (Lucide Icons).
     - Formulir Kontak: Input Nama, Input Email, Subject, dan Textarea Pesan dengan styling input minimalis bergaris halus + Tombol Submit `"Send Message"`.

6. **Footer**:
   - Copyright notice: `© 2026 Your Name. All rights reserved.`
   - Minimalist back-to-top button.
   - Quick social links baris tunggal.

---

### ⚙️ Persyaratan Teknis & Best Practices:
1. **Tech Stack**: React 18+ (Vite), Tailwind CSS, Lucide React (untuk ikon).
2. **Modular Architecture**: Pisahkan komponen ke dalam file terpisah:
   - `src/components/Navbar.jsx`
   - `src/components/Hero.jsx`
   - `src/components/About.jsx`
   - `src/components/Projects.jsx`
   - `src/components/ProjectCard.jsx`
   - `src/components/Contact.jsx`
   - `src/components/Footer.jsx`
3. **Centralized Mock Data**: Buat file `src/data/portfolioData.js` untuk menyimpan semua konten mockup (daftar proyek, skill, bio, link sosmed) sehingga pengguna hanya perlu mengedit satu file konfigurasi data.
4. **Responsivitas**: Wajib 100% responsif di layar Mobile (320px+), Tablet (768px+), dan Desktop (1024px+).
5. **Smooth Scrolling**: Aktifkan navigasi smooth scroll antar-section (`#home`, `#about`, `#projects`, `#contact`).

Tolong berikan:
1. Struktur direktori file proyek.
2. Kode lengkap untuk file `src/data/portfolioData.js`.
3. Kode lengkap untuk setiap komponen React.
4. File utama `App.jsx` dan `index.css` (konfigurasi Tailwind).
```

---

## 💡 Tips Tambahan untuk Menggunakan Prompt Ini:
- **Jika ingin menambahkan Dark Mode**: Tambahkan baris *"Sediakan fitur Toggle Dark Mode (White & Pure Black/Zinc-950)"* di bagian spesifikasi desain.
- **Jika ingin animasi tambahan**: Anda dapat menambahkan *"Gunakan library Framer Motion untuk animasi fade-in dan scroll reveal yang halus."*
- **Jika menggunakan TypeScript**: Ganti *"React (Vite)"* menjadi *"React + TypeScript (Vite) dengan interface/type yang rapi."*
