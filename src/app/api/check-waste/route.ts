import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Read file as base64
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64ImageFile = buffer.toString("base64");

  // Default prompt for waste classification
  let prompt = `Classify the waste item in the given image into exactly one of the following categories:\n  - Plastic\n  - Organic\n  - Metal\n  - Paper\n\nRespond with only the category name, nothing else.`;
  const promptField = formData.get("prompt");
  if (typeof promptField === "string" && promptField.trim().length > 0) {
    prompt = promptField;
  }

  const ai = new GoogleGenAI({ apiKey: "AIzaSyBOMn_90QCeUBXOCxy87nSfXxF7PHOpGyo" });
  const contents = [
    { text: prompt },
    {
      inlineData: {
        mimeType: file.type || "image/jpeg",
        data: base64ImageFile,
      },
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    let result = (response as any).text;
    if (!result && (response as any).candidates?.[0]?.content?.parts?.[0]?.text) {
      result = (response as any).candidates[0].content.parts[0].text;
    }
    return NextResponse.json({ result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}