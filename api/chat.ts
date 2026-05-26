import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || ''
});

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensagem vazia" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: message
    });

    const text = response.text ?? '';
    return res.status(200).json({ text });

  } catch (error: any) {
    console.error("CHAT ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
