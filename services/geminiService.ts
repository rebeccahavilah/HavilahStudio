import { GoogleGenerativeAI } from "@google/generative-ai";
import { LASH_MODELS } from '../constants';

// Tenta pegar a chave de todas as formas possíveis
const API_KEY = process.env.GEMINI_API_KEY || '';

// Inicialização segura
let genAI: GoogleGenerativeAI | null = null;
try {
  if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
  }
} catch (e) {
  console.error("Erro ao iniciar Google AI", e);
}

const MODEL_NAME = "gemini-1.5-flash";

const SYSTEM_INSTRUCTION_CHAT = `
You are the virtual assistant for Havilah Lash Studio.
Tone: Elegant, sophisticated.
Context: Lash extensions catalog and aftercare.
`;

const SYSTEM_INSTRUCTION_CONSULTANCY = `
Analyze the face and recommend 2 lash styles. Portuguese.
`;

export const sendMessageToGemini = async (history: { role: string, text: string }[], message: string): Promise<string> => {
  // 1. Verificação de Segurança da Chave
  if (!API_KEY) {
    return "ERRO TÉCNICO: A Chave de API (GEMINI_API_KEY) não foi encontrada. Verifique as variáveis de ambiente na Vercel.";
  }
  if (!genAI) {
    return "ERRO TÉCNICO: O serviço de IA não foi iniciado corretamente.";
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION_CHAT
    });

    // 2. Tratamento do Histórico (O ponto crítico)
    // O Google exige alternância User -> Model -> User.
    // O histórico não pode começar com 'model'.
    const validHistory = history.filter((msg, index) => {
      // Remove mensagem inicial do sistema se for a primeira
      if (index === 0 && msg.role === 'model') return false;
      return true;
    }).map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Logs para o Console do Navegador (F12) para ajudar a depurar
    console.log("Enviando mensagem...", { validHistory, message });

    const chat = model.startChat({
      history: validHistory,
    });
    
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();

  } catch (error: any) {
    // 3. CAPTURA DO ERRO REAL
    console.error("ERRO GEMINI DETALHADO:", error);
    
    // Retorna a mensagem de erro direto no chat para lermos
    return `⚠️ ERRO DO SISTEMA: ${error.message || error.toString()}`;
  }
};

export const analyzeImageForConsultancy = async (base64Image: string): Promise<string> => {
  if (!API_KEY || !genAI) return "Erro de Configuração da API Key.";

  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION_CONSULTANCY
    });
    
    const cleanBase64 = base64Image.split(',')[1] || base64Image;
    const result = await model.generateContent([
      "Analise este rosto.", 
      { inlineData: { data: cleanBase64, mimeType: "image/jpeg" } }
    ]);
    
    return result.response.text();
  } catch (error) {
    console.error("Erro Visão:", error);
    return "Não foi possível analisar a imagem.";
  }
};