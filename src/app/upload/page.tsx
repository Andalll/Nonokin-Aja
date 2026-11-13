"use client";

import { useState } from "react";

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal mengunggah file");

      const data = await res.json();
      setSuccess(true);
      setUploading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">Unggah Dokumen</h1>
        <p className="text-slate-500">
          Pilih file PDF untuk diunggah dan diringkaskan otomatis.
        </p>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          Berhasil diunggah! Anda akan diarahkan ke halaman ringkasan.
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleUpload} className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            File PDF
          </label>
          <input
            type="file"
            accept=".pdf"
            name="file"
            required
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Mata Pelajaran (opsional)
          </label>
          <input
            type="text"
            name="subject"
            placeholder="Contoh: Matematika, Biologi, Sejarah"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:bg-indigo-300 transition"
        >
          {uploading ? "Mengunggah..." : "Unggah & Buat Ringkasan"}
        </button>
      </form>
    </div>
  );
}
