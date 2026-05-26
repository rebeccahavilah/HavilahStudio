import type {
  VercelRequest,
  VercelResponse
} from '@vercel/node';

import {
  GoogleGenerativeAI
} from '@google/generative-ai';

const SYSTEM_PROMPT = `
Você é uma especialista premium em Lash Design do Havilah Lash Studio.

Analise:
- formato dos olhos
- harmonia facial
- expressão facial
- proporções

E recomende os 2 melhores estilos.

Catálogo:
- Volume Premium
- Efeito Princesa
- Volume Havilah
- Fox Eyes
- Volume Divino
- Capping
- Combo Glamour
- Natural Soft

Responda exatamente assim:

**Análise do Olhar:** texto

**Recomendação 1:** texto

**Recomendação 2:** texto

**Dica de Estilo:** texto

Idioma:
Português do Brasil.
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

    const apiKey =
      process.env.GEMINI_API_KEY;

    if (!apiKey) {

      return res.status(500).json({
        error: 'GEMINI_API_KEY não encontrada'
      });

    }

    const { base64Image } =
      req.body;

    if (!base64Image) {

      return res.status(400).json({
        error: 'Imagem não enviada'
      });

    }

    const genAI =
      new GoogleGenerativeAI(apiKey);

    const model =
      genAI.getGenerativeModel({
        model: 'gemini-1.5-flash'
      });

    const result =
      await model.generateContent([
        {
          text: SYSTEM_PROMPT
        },
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image
          }
        }
      ]);

    const response =
      await result.response;

    const text =
      response.text();

    return res.status(200).json({
      result: text
    });

  } catch (error: any) {

    console.error(
      'CONSULTANCY ERROR:',
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        'Erro interno'
    });

  }

}
