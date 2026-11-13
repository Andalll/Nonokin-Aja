import { NextRequest, NextResponse } from "next/server";
import { getNimClient, getChatModel } from "@/lib/nim-client";
import { updateDocument, getDocument } from "@/lib/storage";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { documentId, text } = await req.json();

    if (!documentId || !text) {
      return NextResponse.json(
        { error: "documentId and text are required" },
        { status: 400 }
      );
    }

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
          content: `Berikut adalah isi dokumen:\n\n${text}\n\nBuatlah ringkasan otomatis dalam bahasa Indonesia:`,
        },
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    const summary = completion.choices[0]?.message?.content || "";

    await updateDocument(documentId, { summary });

    return NextResponse.json({ summary, documentId });
  } catch (error) {
    console.error("Summarize error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
