import { GoogleGenerativeAI } from "@google/generative-ai";
import { LASH_MODELS } from '../constants';

// 1. Usa o nome correto da variável que definimos na Vercel e no .env
const API_KEY = process.env.GEMINI_API_KEY || '';

if (!API_KEY) {
  console.error("ERRO CRÍTICO: GEMINI_API_KEY não encontrada. Verifique o .env ou as configurações da Vercel.");
}

// 2. Inicializa o SDK padrão do Google
const genAI = new GoogleGenerativeAI(API_KEY);

// Configuração do Modelo (Usando o 1.5 Flash que é rápido e estável)
const MODEL_NAME = "gemini-1.5-flash";

const SYSTEM_INSTRUCTION_CHAT = `
You are the virtual assistant for Havilah Lash Studio, a premium luxury lash extension salon by Rebecca Havilah.
Your tone is elegant, sophisticated, welcoming, and knowledgeable.
You help clients choose lash styles from the following catalog: ${LASH_MODELS.map(m => m.name).join(', ')}.
You explain aftercare procedures (washing with neutral soap, brushing, avoiding oil).
You encourage booking but do not process payments directly.
Always maintain a 'premium service' persona. Use formatting like bullet points for clarity.
If asked about prices, you can mention ranges but encourage checking the 'Valores' section for specifics.
Short answers are preferred.
`;

const SYSTEM_INSTRUCTION_CONSULTANCY = `
You are an expert Lash Designer consultant for Havilah Lash Studio.
Analyze the provided image of a person's face/eyes.
Based on their eye shape (almond, round, hooded, monolid, etc.) and facial features, recommend the BEST 2 options from the following list:
${LASH_MODELS.map(m => `${m.name}: ${m.description}`).join('; ')}

Format your response exactly as follows:
**Análise do Olhar:** [Brief analysis of eye shape]
**Recomendação 1:** [Model Name] - [Reasoning]
**Recomendação 2:** [Model Name] - [Reasoning]
**Dica de Estilo:** [A short premium styling tip]

Keep the tone highly professional, flattering, and technical yet accessible. Portuguese language only.
`;

// --- FUNÇÃO DO CHAT (ASSISTENTE) ---
export const sendMessageToGemini = async (history: { role: string, text: string }[], message: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION_CHAT
    });
    
    // Converte o histórico para o formato que o Google espera
    // O Google espera 'user' ou 'model'. Se o teu app usa outros nomes, ajusta aqui.
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'me' ? 'user' : (msg.role === 'model' ? 'model' : 'user'),
      parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({
      history: formattedHistory,
    });
    
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Desculpe, estou com uma instabilidade momentânea. Poderia tentar novamente? ✨";
  }
};

// --- FUNÇÃO DA CONSULTORIA (VISÃO) ---
export const analyzeImageForConsultancy = async (base64Image: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION_CONSULTANCY
    });
    
    // Limpa o cabeçalho do base64 se vier (ex: "data:image/jpeg;base64,")
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const prompt = "Analise este rosto e recomende o melhor estilo de cílios do catálogo Havilah.";
    
    const imagePart = {
      inlineData: {
        data: cleanBase64,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Não consegui analisar a imagem. Tente uma foto com melhor iluminação. ✨";
  }
};