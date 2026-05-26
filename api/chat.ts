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

    const { message } =
      req.body;

    const response =
      await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: message
      });

    return res.status(200).json({
      text: response.text
    });

  } catch (error: any) {

    console.error(
      'CHAT ERROR:',
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        'Erro Gemini'
    });

  }

}
