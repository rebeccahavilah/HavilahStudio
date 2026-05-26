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

    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {

      return res.status(500).json({
        error: 'API KEY não encontrada'
      });

    }

    const { message } = req.body;

    if (!message) {

      return res.status(400).json({
        error: 'Mensagem obrigatória'
      });

    }

    const genAI =
      new GoogleGenerativeAI(apiKey);

    const model =
      genAI.getGenerativeModel({
        model: 'gemini-1.5-flash-latest'
      });

    const result =
      await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `
Você é a assistente premium do Havilah Lash Studio.

Responda de forma elegante, acolhedora e sofisticada.

Mensagem da cliente:
${message}
`
              }
            ]
          }
        ]
      });

    const response =
      result.response.text();

    return res.status(200).json({
      text: response
    });

  } catch (error: any) {

    console.error(
      'ERRO GEMINI:',
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        'Erro interno Gemini'
    });

  }

}
