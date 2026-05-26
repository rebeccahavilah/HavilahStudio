import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    const { message, history = [] } = req.body;

    const contents = [
      ...history.map((h: any) => ({
        role: h.role as "user" | "model",
        parts: [{ text: String(h.content) }]
      })),
      {
        role: "user" as const,
        parts: [{ text: String(message) }]
      }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents
    });

    return res.status(200).json({ text: response.text });

  } catch (error: any) {
    console.error("CHAT ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
