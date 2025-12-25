import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

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

// This function is executed on the server, not in the browser.
export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { history, message } = await req.json();

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return new Response("API key not configured", { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-3-flash-preview';

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
          const c = chunk as GenerateContentResponse;
          if (c.text) {
             controller.enqueue(new TextEncoder().encode(c.text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    console.error("API Chat Error:", error);
    return new Response("Error processing chat request.", { status: 500 });
  }
}
