import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nonokin-Aja",
  description: "Web app belajar pribadi, full gratis, tanpa paket",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-indigo-600">Nonokin-Aja</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">full gratis</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="px-3 py-1.5 rounded-md text-sm font-medium transition hover:bg-slate-100"
              >
                Beranda
              </a>
              <a
                href="/upload"
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Unggah Dokumen
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
