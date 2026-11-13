# Rencana Proyek Nonokin-Aja

Sumber inspirasi: `fitur.md` (ringkasan pelajarin.ai)

## Keputusan Dasar

- **Tipe:** Web app saja
- **Biaya:** Full gratis, semua fitur bebas, tanpa paket / pembayaran
- **Penggunaan:** Pribadi (personal use)
- **AI Provider:** NVIDIA NIM (OpenAI-compatible API)
- **API Key:** Disimpan di `.env` (sudah ada di `.gitignore`)
- **Model:** Pilihan model berdasarkan API key yang tersedia (dikonfigurasi via env)
- **Tech stack rekomendasi:** Next.js (App Router) + Tailwind CSS + TypeScript

## Tech Stack

| Layer | Pilihan | Alasan |
|-------|---------|--------|
| Frontend + Backend | Next.js (App Router) | React, API routes dalam satu repo, gratis di Vercel |
| Styling | Tailwind CSS | Cepat, konsisten, gratis |
| Bahasa | TypeScript | Type safety, maintainable |
| LLM / Embeddings | NVIDIA NIM | API key via `.env`, model pilihan sesuai key |
| Parsing file | `pdf-parse` (PDF), `youtube-transcript` / `yt-dlp` (video), built-in (audio) | Gratis, open source |
| Vektor / RAG | SQLite file-based atau JSON | Tidak perlu DB berbayar, cocok personal |
| Flashcard | Algoritma SM-2 (spaced repetition) | Implementasi sendiri, gratis |
| Deploy | Vercel / self-host | Gratis untuk personal |

## Integrasi NVIDIA NIM

- `NVIDIA_API_KEY` di `.env`
- `NVIDIA_BASE_URL` default `https://integrate.api.nvidia.com/v1`
- `NVIDIA_CHAT_MODEL` dan `NVIDIA_EMBED_MODEL` di env (bisa diganti sesuai key)
- Client: OpenAI SDK atau `fetch` langsung ke endpoint NIM

## Fitur (dari fitur.md + ide tambahan)

### Inti (dari fitur.md)
1. Ringkasan otomatis dokumen (PDF, teks)
2. Flashcard pintar + spaced repetition (SM-2)
3. Kuis interaktif (pilihan ganda) dari materi
4. Panduan belajar terstruktur dari dokumen
5. Tutor AI chat berbasis materi yang diunggah (RAG)
6. Input multi-format: PDF, audio, video, YouTube link
7. Kelompokkan file per mata pelajaran ("kantong" per mapel)
8. Mode ujian per mata pelajaran (kuis dari semua file dalam satu mapel)

### Ide Tambahan
- Riwayat chat per dokumen / per mapel
- Bookmark dan catatan pribadi pada ringkasan
- Ekspor ringkasan / kuis ke PDF atau Markdown
- Jadwal review flashcard
- Statistik progres belajar per mapel
- Dark mode
- Pencarian lintas dokumen

## Arsitektur Alur Data

```
Upload file (PDF/audio/video/YT)
      ↓
Ekstrak teks / transcript
      ↓
Potong jadi chunks → Embedding via NVIDIA NIM → Simpan (SQLite/JSON)
      ↓
Tutor chat / Ringkasan / Kuis / Flashcard ← ambil konteks relevan dari vektor
```

## Penyimpanan Gratis (Personal)

- File upload: `/uploads` (lokal) atau Vercel Blob (free tier)
- Metadata & vektor: SQLite file tunggal atau JSON per pengguna
- Tidak ada autentikasi kompleks; optional simple login atau skip auth

## Struktur Direktori

```
Nonokin-Aja/
├── app/                 # Next.js App Router (route handlers + pages)
│   ├── api/             # /api/upload, /api/chat, /api/quiz, /api/flashcard, ...
│   ├── (dashboard)/     # halaman utama, mapel, detail dokumen
│   └── layout.tsx
├── components/          # UI komponen (chat, flashcard, quiz, file-list)
├── lib/                 # nim-client.ts, pdf-parser.ts, vector-store.ts, sm2.ts
├── types/               # TypeScript types
├── uploads/             # file yang diunggah (gitignore)
├── .env                 # NVIDIA_API_KEY, NVIDIA_BASE_URL, MODEL names
├── .gitignore
├── package.json
└── tailwind.config.ts
```

## Fasa Implementasi

1. **Fasa 1 — Core:** Setup Next.js + Tailwind, env NVIDIA, upload PDF, ekstraksi teks, ringkasan via NIM
2. **Fasa 2 — RAG & Chat:** Chunking, embedding, vektor store, tutor chat berbasis dokumen
3. **Fasa 3 — Latihan:** Kuis pilihan ganda otomatis, flashcard + SM-2, panduan belajar
4. **Fasa 4 — Organisasi:** Grup per mata pelajaran, mode ujian per mapel, YouTube/audio input
5. **Fasa 5 — Polish:** Dark mode, ekspor, statistik progres, UI/UX
