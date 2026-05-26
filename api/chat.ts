import { GoogleGenAI } from "@google/genai";

// DOCUMENTAÇÃO: Isso avisa ao Vercel para usar o servidor moderno "Edge".
// Sem isso, o req.json() e o ReadableStream falham com erro 500.
export const config = {
  runtime: 'edge',
};

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

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { history, message } = await req.json();

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return new Response("API key not configured no Vercel", { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // DOCUMENTAÇÃO CORRIGIDA: Utilizando o modelo oficial e estável do Gemini.
    const model = 'gemini-1.5-flash';

    const formattedHistory = history.map((msg: { role: string, text: string }) => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model,
      config: { systemInstruction: SYSTEM_INSTRUCTION_CHAT },
      history: formattedHistory
    });

    const streamResponse = await chat.sendMessageStream({ message });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of streamResponse) {
          if (chunk.text) {
             controller.enqueue(new TextEncoder().encode(chunk.text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error: any) {
    console.error("API Chat Error Detalhado:", error);
    // Retorna a mensagem de erro real para ajudar no debug
    return new Response(`Erro interno no servidor: ${error.message}`, { status: 500 });
  }
}
