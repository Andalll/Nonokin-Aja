import fs from "fs/promises";
import path from "path";

export interface Document {
  id: string;
  title: string;
  fileName: string;
  filePath: string;
  subject?: string;
  uploadedAt: string;
  text?: string;
  summary?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DOCS_FILE = path.join(DATA_DIR, "documents.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readDocuments(): Promise<Document[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(DOCS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeDocuments(docs: Document[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(DOCS_FILE, JSON.stringify(docs, null, 2));
}

export async function addDocument(
  doc: Omit<Document, "id" | "uploadedAt">
): Promise<Document> {
  const docs = await readDocuments();
  const id = crypto.randomUUID();
  const newDoc: Document = { ...doc, id, uploadedAt: new Date().toISOString() };
  docs.push(newDoc);
  await writeDocuments(docs);
  return newDoc;
}

export async function getDocuments(): Promise<Document[]> {
  return readDocuments();
}

export async function getDocument(id: string): Promise<Document | null> {
  const docs = await readDocuments();
  return docs.find((d) => d.id === id) ?? null;
}

export async function updateDocument(
  id: string,
  updates: Partial<Document>
): Promise<Document | null> {
  const docs = await readDocuments();
  const idx = docs.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  docs[idx] = { ...docs[idx], ...updates };
  await writeDocuments(docs);
  return docs[idx];
}

export async function deleteDocument(id: string): Promise<boolean> {
  const docs = await readDocuments();
  const filtered = docs.filter((d) => d.id !== id);
  if (filtered.length === docs.length) return false;
  await writeDocuments(filtered);
  return true;
}
