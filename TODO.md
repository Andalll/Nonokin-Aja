# TODO — Nonokin-Aja

Checklist per fasa. Selesaikan satu fasa sebelum melanjut ke fasa berikutnya untuk menjaga context window tetap ringkas.

## Fasa 1 — Core ✅ SELESAI (Pause di sini)

- [x] Inisialisasi proyek Next.js (App Router) + TypeScript + Tailwind CSS
- [x] Setup `.env` dengan `NVIDIA_API_KEY`, `NVIDIA_BASE_URL`, `NVIDIA_CHAT_MODEL`, `NVIDIA_EMBED_MODEL`
- [x] Buat client NVIDIA NIM (src/lib/nim-client.ts) — chat completion sederhana
- [x] Halaman upload PDF (src/app/upload/page.tsx)
- [x] Ekstraksi teks dari PDF (`pdf-parse`)
- [x] Route API ringkasan otomatis via NIM (src/app/api/upload/route.ts)
- [x] Halaman hasil ringkasan (src/app/summary/[id]/page.tsx)
- [x] Tampilan daftar dokumen yang diunggah (src/app/page.tsx)
- [x] Uji coba end-to-end: upload PDF → ringkasan muncul
- [x] Build production berhasil (webpack)
- [x] Dev server berjalan, halaman / dan /upload return 200

## Fasa 2 — RAG & Tutor Chat (Dijeda)

- [ ] Chunking teks dokumen (potong paragraf dengan overlap)
- [ ] Embedding via NVIDIA NIM (simpan vektor ke JSON)
- [ ] Semantic search: cari chunk relevan berdasarkan query
- [ ] Route API tutor chat (src/app/api/chat/route.ts)
- [ ] UI chat tutor (src/app/chat/[docId]/page.tsx)
- [ ] Uji coba: upload dokumen → ajukan pertanyaan → jawaban berdasarkan isi dokumen

## Fasa 3 — Latihan (Kuis + Flashcard)

- [ ] Generate kuis pilihan ganda otomatis dari teks dokumen via NIM
- [ ] UI kuis interaktif (src/app/quiz/[docId]/page.tsx)
- [ ] Generate flashcard (pertanyaan + jawaban) dari dokumen via NIM
- [ ] Implementasi algoritma SM-2 (spaced repetition) untuk jadwal review
- [ ] UI flashcard (src/app/flashcard/[docId]/page.tsx)
- [ ] Halaman panduan belajar terstruktur dari dokumen (src/app/guide/[docId]/page.tsx)
- [ ] Uji coba: buat kuis dan flashcard dari dokumen yang diunggah

## Fasa 4 — Organisasi (Mata Pelajaran + Multi-format)

- [ ] Model data "Mata Pelajaran" (nama, deskripsi, daftar dokumen)
- [ ] UI kelola mata pelajaran (src/app/mapel/page.tsx)
- [ ] Asosiasikan dokumen ke mata pelajaran
- [ ] Mode ujian per mata pelajaran: kuis dari semua file dalam satu mapel (src/app/ujian/[mapelId]/page.tsx)
- [ ] Input YouTube link → ekstraksi transcript
- [ ] Input audio → ekstraksi teks
- [ ] Input video → ekstraksi audio/transcript
- [ ] Uji coba: grup dokumen per mapel → ujian gabungan

## Fasa 5 — Polish (Opsional)

- [ ] Dark mode (Tailwind dark class)
- [ ] Ekspor ringkasan/kuis ke Markdown atau PDF
- [ ] Statistik progres belajar per mata pelajaran
- [ ] Bookmark dan catatan pribadi pada ringkasan
- [ ] Jadwal review flashcard (tampilkan yang perlu direview hari ini)
- [ ] Pencarian lintas dokumen
- *Perbaikan bug dan refinemen UI/UX*

## Aturan Kerja

1. Selesaikan semua checklist satu fasa sebelum memulai fasa berikutnya.
2. Setelah setiap fitur selesai, uji coba manual di browser.
3. Commit perubahan ke git setelah setiap fasa selesai.
4. Jika menemukan bloker, catat di bawah sebelum melanjutkan.

## Bloker / Catatan

- Next.js 16.4.6 di Android/arm64 memerlukan `--webpack` (Turbopack tidak didukung)
- Build command: `npm run build -- --webpack`
- Dev command: `npm run dev -- --webpack` (gunakan `http://127.0.0.1:3000` bukan `localhost` karena IPv6 issue)
- Saat ini dijeda di Fasa 1. Siap lanjut ke Fasa 2 kapan saja.
