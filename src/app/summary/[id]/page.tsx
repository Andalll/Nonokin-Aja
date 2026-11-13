import { getDocument } from "@/lib/storage";
import { notFound } from "next/navigation";

export default async function SummaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const document = await getDocument(id);

  if (!document) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600">
            {document.title}
          </h1>
          <p className="text-slate-500 text-sm">
            {document.subject || "Tanpa mata pelajaran"} •
            {new Date(document.uploadedAt).toLocaleDateString("id-ID")}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
            onClick={() => {
              // Trigger summary generation via API
              fetch("/api/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  documentId: document.id,
                  text: document.text || "",
                }),
              }).then(() => window.location.reload());
            }}
          >
            Buat Ringkasan
          </button>
          <a
            href="/"
            className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
          >
            Kembali
          </a>
        </div>
      </div>

      {document.summary ? (
        <div className="bg-white p-6 rounded-xl border border-slate-200 prose prose-lg max-w-none">
          {document.summary}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-400">
          <p>Belum ada ringkasan. Klik "Buat Ringkasan" untuk menghasilkan.</p>
        </div>
      )}
    </div>
  );
}
