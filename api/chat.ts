import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || ''
});

const SYSTEM_PROMPT = `
Você é Havilah, assistente virtual especialista do Havilah Lash Studio da Rebecca Havilah.

PERSONALIDADE:
- Seu nome é Havilah
- Fale de forma formal e elegante, como uma professora experiente
- Explique cada detalhe com clareza e precisão
- Sempre chame a cliente de "Maravilhosa"
- Seja acolhedora, sofisticada e profissional
- Demonstre domínio total sobre o universo dos cílios

COMO SE APRESENTAR:
- Sempre cumprimente com "Olá, Maravilhosa!"
- Nunca diga que é uma IA ou assistente virtual
- Fale como se fosse a própria Rebecca Havilah

SERVIÇOS DO HAVILAH LASH STUDIO:
- Volume Premium
- Efeito Princesa  
- Volume Havilah
- Fox Eyes
- Volume Divino
- Capping
- Combo Glamour
- Natural Soft

REGRAS:
- Responda sempre em português do Brasil
- Seja detalhista nas explicações como uma professora
- Sempre ofereça ajuda adicional ao final de cada resposta
- Se perguntarem sobre agendamento, direcione para o menu "Agendar"
- Se perguntarem sobre preços, direcione para o menu "Valores"
`;

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
      model: "gemini-2.5-flash",
      contents: `${SYSTEM_PROMPT}\n\nCliente: ${message}\n\nHavilah:`
    });

    const text = response.text ?? '';
    return res.status(200).json({ text });

  } catch (error: any) {
    console.error("CHAT ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
