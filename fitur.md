# Fitur Proyek Nonokin-Aja

Inspirasi dari pelajarin.ai, disesuaikan untuk penggunaan pribadi. Semua fitur full gratis, tanpa paket atau pembayaran.

## Fitur Utama

- **Ringkasan otomatis:** Dokumen yang diunggah dianalisis dan diringkas menjadi versi padat yang menyoroti konsep, definisi, dan bagian penting.
- **Flashcard pintar:** Kartu tanya-jawab berbasis kata kunci dengan metode pengulangan berjarak (spaced repetition / SM-2) untuk membantu mengingat definisi, rumus, dan tanggal.
- **Kuis interaktif:** Soal pilihan ganda yang dibuat dari materi untuk menguji pemahaman.
- **Panduan belajar:** Materi belajar yang tersusun dari dokumen yang diunggah.
- **Tutor AI berbasis chat:** Pengguna dapat bertanya langsung kepada AI tentang materi yang sudah diunggah (RAG).
- **Berbagai format input:** Dokumen (PDF), audio, video, dan tautan YouTube dapat dijadikan bahan belajar.

## Fitur Organisasi

- **Kelompok file per mata pelajaran:** Materi dapat dikelompokkan dalam "kantong" per mapel, misalnya Matematika atau Biologi.
- **Mode ujian per mata pelajaran:** Kuis yang dibuat dari seluruh file dalam satu mapel, bukan dari satu materi saja.

## Fitur Tambahan (rencana)

- Riwayat chat per dokumen / per mata pelajaran
- Bookmark dan catatan pribadi pada ringkasan
- Ekspor ringkasan dan kuis ke PDF atau Markdown
- Jadwal review flashcard
- Statistik progres belajar per mata pelajaran
- Dark mode
- Pencarian lintas dokumen

## Platform & Teknologi

- Web app (browser)
- Frontend + Backend: Next.js (App Router) + Tailwind CSS + TypeScript
- AI: NVIDIA NIM via API key di `.env` (pilihan model sesuai key yang tersedia)
- Penyimpanan: file-based (SQLite/JSON) untuk metadata dan vektor, uploads lokal
- Deploy: gratis (Vercel atau self-host)

## Catatan Penggunaan

- Ringkasan dan jawaban AI bisa menyederhanakan atau keliru, sehingga perlu dicek kembali dengan materi asli.
- Platform ini adalah alat bantu belajar pribadi, full gratis, tanpa paket berbayar.
- API key NVIDIA NIM disimpan di `.env` dan tidak di-commit ke repo.
