import type {
  VercelRequest,
  VercelResponse
} from '@vercel/node';

import {
  GoogleGenAI
} from '@google/genai';

const ai =
  new GoogleGenAI({
    apiKey:
      process.env.GEMINI_API_KEY
  });

const SYSTEM_PROMPT = `
Você é especialista premium do Havilah Lash Studio.

Analise o rosto e recomende os melhores estilos de cílios.

Responda em português.
`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {

  if (req.method !== 'POST') {

    return res.status(405).json({
      error: 'Método não permitido'
    });

  }

  try {

    const { base64Image } =
      req.body;

    const response =
      await ai.models.generateContent({
        model: 'gemini-1.5-flash-latest',
        contents: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: SYSTEM_PROMPT
          }
        ]
      });

    return res.status(200).json({
      result: response.text
    });

  } catch (error: any) {

    console.error(
      'CONSULTANCY ERROR:',
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        'Erro Gemini Vision'
    });

  }

}
