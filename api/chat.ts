import type {
  VercelRequest,
  VercelResponse
} from '@vercel/node';

import {
  GoogleGenerativeAI
} from '@google/generative-ai';

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

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY!
    );

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash'
    });

    const result = await model.generateContent(
      'Responda apenas: Olá, funcionando.'
    );

    const text = result.response.text();

    return res.status(200).json({
      text
    });

  } catch (error: any) {

    console.error('ERRO GEMINI:', error);

    return res.status(500).json({
      error: error.message,
      details: error.toString()
    });

  }

}
