import { NextRequest, NextResponse } from "next/server";
import { saveUploadedFile, extractTextFromPdf } from "@/lib/pdf-parser";
import { addDocument } from "@/lib/storage";
import { getNimClient, getChatModel } from "@/lib/nim-client";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const subject = (formData.get("subject") as string) || undefined;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = await saveUploadedFile(buffer, fileName);

    // Ekstraksi teks dari PDF
    let extractedText = "";
    try {
      extractedText = await extractTextFromPdf(filePath);
    } catch (err) {
      console.error("PDF extraction error:", err);
    }

    // Generate ringkasan via NVIDIA NIM
    let summary = "";
    if (extractedText.trim()) {
      try {
        const client = getNimClient();
        const model = getChatModel();
        const completion = await client.chat.completions.create({
          model,
          messages: [
            {
              role: "system",
              content:
                "Anda adalah asisten yang membantu meringkas dokumen pendidikan dalam bahasa Indonesia. Buat ringkasan yang padat, menyoroti konsep kunci, definisi, dan bagian penting. Gunakan format markdown dengan judul dan bullet points.",
            },
            {
              role: "user",
              content: `Berikut adalah isi dokumen:\n\n${extractedText}\n\nBuatlah ringkasan otomatis dalam bahasa Indonesia:`,
            },
          ],
          temperature: 0.3,
          max_tokens: 1500,
        });
        summary = completion.choices[0]?.message?.content || "";
      } catch (err) {
        console.error("NIM summarize error:", err);
      }
    }

    const doc = await addDocument({
      title: file.name,
      fileName,
      filePath,
      subject,
      text: extractedText,
      summary,
    });

    return NextResponse.json({ document: doc }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
