# Feature Spec: Projects Horizontal Scroll & Velocity Skew Effect

## 1. Overview
Section `Featured Projects` menggunakan mekanisme **Pinned Horizontal Scroll** pada desktop, dilengkapi efek fisika **Velocity-Based Skew (Inertia Tilt)** saat di-scroll.

---

## 2. Desktop Guidelines (>= 1024px)

### A. Scroll Pinning & Layout
- **Mechanism:** Saat pengguna melakukan scroll vertikal masuk ke area Projects, halaman terkunci (*pinned*), dan pergerakan scroll diterjemahkan menjadi pergerakan horizontal (kiri ke kanan).
- **Track Width Calculation:** Panjang trek horizontal wajib dihitung secara dinamis sesuai jumlah kartu proyek yang sedang aktif (terutama saat filter tab diubah).
- **Progress Indicator:** Wajib menampilkan *progress bar* atau counter angka (misal: `01 / 06`) sebagai petunjuk visual arah navigasi.

### B. Velocity-Based Skew (Inertia Tilt Animation)
- **Physics Effect:** Kartu proyek akan miring secara dinamis mengikuti kecepatan (*velocity*) dan arah scroll.
- **Constraints & Values:**
  - **Max Skew Angle:** Batasi kemiringan maksimal antara `-6deg` hingga `6deg` (dilarang melebihi `8deg` agar teks tetap terbaca).
  - **Transform Origin:** Set ke `center center` pada `.project-card`.
  - **Dampening / Spring:** Saat scroll berhenti, kemiringan wajib kembali ke `0deg` menggunakan efek *spring/ease-out* yang halus (bukan lerp kaku).
- **Performance Enforcement:**
  - Tambahkan CSS `will-change: transform` pada elemen `.project-card`.
  - Gunakan GPU Acceleration (`transform: translate3d(...)`).

---

## 3. Mobile & Touch Guidelines (< 1024px)

- **DILARANG** mengaktifkan Scroll Pinning / Horizontal Hijacking di layar sentuh.
- **DILARANG** mengaktifkan efek Skew/Tilt berbasis velocity di mobile.
- **Fallback Layout:** Gunakan *1-column vertical stack* bersih atau *native CSS snap-carousel* yang ringan.

---

## 4. Technical Implementation Guidelines

### Stack Preference
- **Option 1 (GSAP):** Gunakan `GSAP ScrollTrigger` dengan method `self.getVelocity()` dan `gsap.utils.clamp()`.
- **Option 2 (Framer Motion):** Gunakan `useScroll`, `useVelocity`, `useTransform`, dan `useSpring`.

### Example Logic Reference (GSAP)
```javascript
const clamp = gsap.utils.clamp(-6, 6);

ScrollTrigger.create({
  trigger: ".projects-wrapper",
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    const skew = clamp(self.getVelocity() / -300);
    gsap.to(".project-card", {
      skewX: skew,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto"
    });
  }
});