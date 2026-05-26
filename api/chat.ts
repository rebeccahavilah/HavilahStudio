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

// DOCUMENTAÇÃO: Removido o "runtime: edge". Agora rodamos no ambiente Node.js completo do Vercel.
// No Node.js do Vercel, usamos a sintaxe Express-like (req, res).
export default async function handler(req: any, res: any) {
  // Evita erros de requisição inválida
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // DOCUMENTAÇÃO: No Node.js do Vercel, o corpo da requisição já vem convertido como objeto
    const { history, message } = req.body;

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).send("A API_KEY não foi encontrada no painel do Vercel.");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // DOCUMENTAÇÃO: Versão oficial de performance da nova biblioteca
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

    // DOCUMENTAÇÃO: Configura os cabeçalhos para enviar o texto em "pedaços" (Stream) no formato Node.js
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    // Manda cada palavra para a tela do app assim que o Gemini processa
    for await (const chunk of streamResponse) {
      if (chunk.text) {
         res.write(chunk.text);
      }
    }
    
    // Encerra a comunicação de forma segura
    res.end();

  } catch (error: any) {
    console.error("API Chat Error Detalhado:", error);
    // Agora, se algo der errado, a tela vai nos mostrar exatamente o motivo!
    return res.status(500).send(`Erro interno: ${error.message || 'Falha de comunicação no servidor.'}`);
  }
}
