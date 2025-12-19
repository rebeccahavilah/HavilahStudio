import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { LASH_MODELS } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION_CHAT = `
You are the virtual assistant for Havilah Lash Studio, a premium luxury lash extension salon by Rebecca Havilah.
Your tone is elegant, sophisticated, welcoming, and knowledgeable.
You help clients choose lash styles from the following catalog: ${LASH_MODELS.map(m => m.name).join(', ')}.
You explain aftercare procedures (washing with neutral soap, brushing, avoiding oil).
You encourage booking but do not process payments directly.
Always maintain a 'premium service' persona. Use formatting like bullet points for clarity.
If asked about prices, you can mention ranges but encourage checking the 'Valores' section for specifics.
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

export const sendMessageToGemini = async (history: { role: string, text: string }[], message: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Map the simplified history to the Content format expected by the SDK
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_CHAT,
      },
      history: formattedHistory
    });
    
    const response: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return response.text || "Desculpe, não consegui processar sua solicitação no momento.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Ocorreu um erro ao conectar com a assistente. Tente novamente.";
  }
};

export const analyzeImageForConsultancy = async (base64Image: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg for simplicity
              data: base64Image
            }
          },
          {
            text: "Analise este rosto e recomende o melhor estilo de cílios do catálogo Havilah."
          }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_CONSULTANCY,
      }
    });

    return response.text || "Não foi possível analisar a imagem.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Erro ao analisar a imagem. Por favor, verifique sua conexão ou tente outra foto.";
  }
};