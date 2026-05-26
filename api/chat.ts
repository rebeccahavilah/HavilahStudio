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

    // ✅ Formata histórico corretamente
    const contents = [
      ...history.map((h: any) => ({
        role: h.role,
        parts: [{ text: h.content }]
      })),
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents  // ✅ Array de objetos, não string
    });

    return res.status(200).json({
      text: response.text  // retorna JSON simples
    });

  } catch (error: any) {
    console.error("CHAT ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
