import { GoogleGenAI } from "@google/genai";

const lashModelNames = [
  "Volume Premium", "Efeito Princesa", "Volume Havilah", "Fox Eyes",
  "Volume Divino", "Capping", "Combo Glamour", "Natural Soft"
].join(', ');

const SYSTEM_INSTRUCTION_CHAT = `
You are the virtual assistant for Havilah Lash Studio, a premium luxury lash extension salon by Rebecca Havilah.
Your tone is elegant, sophisticated, welcoming, and knowledgeable.
You help clients choose lash styles from the following catalog: ${lashModelNames}.
You explain aftercare procedures (washing with neutral soap, brushing, avoiding oil).
You encourage booking but do not process payments directly.
Always maintain a 'premium service' persona. Use formatting like bullet points for clarity.
If asked about prices, you can mention ranges but encourage checking the 'Valores' section for specifics.
`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { history, message } = req.body;

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).send("A API_KEY não foi configurada corretamente.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash'; 

    const formattedHistory = history.map((msg: any) => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model,
      config: { systemInstruction: SYSTEM_INSTRUCTION_CHAT },
      history: formattedHistory
    });

    const streamResponse = await chat.sendMessageStream({ message });

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of streamResponse) {
      if (chunk.text) {
         res.write(chunk.text);
      }
    }
    
    res.end();

  } catch (error: any) {
    console.error("API Chat Error Detalhado:", error);
    return res.status(500).send(`Erro interno no servidor: ${error.message}`);
  }
}
