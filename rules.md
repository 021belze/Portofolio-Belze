# 📜 Aturan & Pedoman Pengembangan (Development Rules)

Dokumen ini adalah pedoman wajib bagi AI Assistant dalam memodifikasi, mengembangkan, dan memelihara codebase proyek portofolio ini.

---

## 🚫 1. Anti-Halusinasi & Verifikasi Fakta (Jangan Halu)
1. **Wajib Cek Kode Nyata**: Selalu baca dan verifikasi file terkait menggunakan tool sebelum memberikan jawaban atau melakukan pengeditan. Jangan berasumsi isi file tanpa melihat langsung.
2. **Gunakan API/Library yang Sudah Terpasang**: Jangan mengimpor dependensi atau fungsi baru yang tidak ada di `package.json` tanpa izin eksplisit.
3. **Validasi File & Path**: Pastikan path file, selector ID, dan struktur data benar-benar ada di repositori.

---

## 🎯 2. Eksekusi Presisi (Jangan "Ngide" Sembarangan)
1. **Fokus pada Permintaan User**: Kerjakan secara presisi hanya bagian yang diminta oleh user. Hindari refactor besar-besaran di luar cakupan tugas.
2. **Jangan Mengubah Hal yang Tidak Diminta**: Jangan mengubah style, tata letak, logika, atau teks lain yang tidak disebutkan oleh user.
3. **Minimalisir Efek Samping (Side Effects)**: Pastikan setiap perubahan terisolasi dan tidak merusak komponen atau halaman lain.

---

## 💡 3. Transparansi & Komunikasi Saran (Konsultasikan Dulu)
1. **Sampaikan Rekomendasi Sebelum Eksekusi**: Jika menemukan pendekatan yang lebih baik, performan, atau potensi bug/benturan desain, jelaskan opsinya terlebih dahulu kepada user.
2. **Jangan Ambil Keputusan Desain Mayor Sepihak**: Untuk perubahan layout besar, arsitektur tema, atau penghapusan elemen penting, minta konfirmasi dari user sebelum mengubah kode.
3. **Jelaskan Perubahan dengan Jelas**: Berikan ringkasan ringkas dan jelas tentang file apa saja yang diubah beserta dampaknya.

---

## 🎨 4. Jaga Integritas Desain & Kualitas Kode (Jangan Merusak Design)
1. **Pertahankan Estetika & Responsivitas**:
   - Pastikan tampilan tetap rapi di semua ukuran layar (Mobile, Tablet, Desktop).
   - Jaga konsistensi animasi (Framer Motion, Lenis, Three.js) dan jangan menghilangkan transisi yang sudah halus.
2. **Konsistensi Tema (Light & Dark Mode)**:
   - Setiap elemen yang diubah harus mendukung mode Terang (Light) dan Gelap (Dark) secara harmonis.
   - Hindari warna statis/hardcoded yang bentrok saat tema berganti.
3. **Verifikasi Build & Bebas Error**:
   - Selalu lakukan uji *build* (`npm run build`) dan pastikan tidak ada error kompilasi, sintaks, maupun runtime sebelum menyelesaikan tugas.
