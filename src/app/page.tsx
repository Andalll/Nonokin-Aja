import { getDocuments } from "@/lib/storage";
import Link from "next/link";

export default async function Dashboard() {
  const documents = await getDocuments();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">Beranda</h1>
        <p className="text-slate-500">Daftar dokumen yang telah diunggah</p>
      </div>

      {documents.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
          <p className="text-slate-400 mb-4">Belum ada dokumen yang diunggah.</p>
          <Link
            href="/upload"
            className="inline-block px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Unggah Dokumen Pertama
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/summary/${doc.id}`}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition"
            >
              <div>
                <h2 className="font-semibold text-slate-800">{doc.title}</h2>
                <p className="text-xs text-slate-400">
                  {doc.subject || "Tanpa mata pelajaran"} •
                  {new Date(doc.uploadedAt).toLocaleDateString("id-ID")}
                </p>
              </div>
              <span className="text-sm text-indigo-600 font-medium">Lihat ringkasan →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
