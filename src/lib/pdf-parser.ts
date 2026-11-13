import { PDFParse } from "pdf-parse";
import fs from "fs/promises";
import path from "path";

export async function extractTextFromPdf(filePath: string): Promise<string> {
  const dataBuffer = await fs.readFile(filePath);
  const parser = new PDFParse({ data: dataBuffer });
  const result = await parser.getText();
  return result.text;
}

export async function saveUploadedFile(
  buffer: Buffer,
  fileName: string
): Promise<string> {
  const uploadDir = path.join(process.cwd(), "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, buffer);
  return filePath;
}
