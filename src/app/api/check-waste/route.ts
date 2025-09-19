import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import wasteCategories from "./waste-categories.json";

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

  // Build prompt with all categories from JSON
  const allCategories = wasteCategories.map((c) => c.category).join("\n  - ");
  let prompt = `Classify the waste item in the given image into exactly one of the following categories:\n  - ${allCategories}\n\nRespond with only the category name, nothing else.`;
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
    // Try to extract result from response with proper type checks
    type GeminiCandidate = {
      content?: { parts?: { text?: string }[] };
    };
    type GeminiResponse = {
      text?: string;
      candidates?: GeminiCandidate[];
    };
    const geminiResponse = response as GeminiResponse;
    let result = geminiResponse.text;
    if (!result && geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text) {
      result = geminiResponse.candidates[0].content.parts[0].text;
    }
    return NextResponse.json({ result });
  } catch (e) {
    const error = e instanceof Error ? e : new Error('Unknown error');
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}