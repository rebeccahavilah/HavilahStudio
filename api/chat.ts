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

  try {

    const genAI =
      new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY!
      );

    const model =
      genAI.getGenerativeModel({
        model: 'gemini-pro'
      });

    const result =
      await model.generateContent(
        'Diga apenas: olá'
      );

    const response =
      result.response.text();

    return res.status(200).json({
      text: response
    });

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }

}
