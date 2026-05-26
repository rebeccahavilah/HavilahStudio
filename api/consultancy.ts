import type {
  VercelRequest,
  VercelResponse
} from '@vercel/node';

import {
  GoogleGenerativeAI
} from '@google/generative-ai';

const lashModelsForPrompt = [
  {
    name: "Volume Premium",
    description: "Volume intenso, criado com leques volumosos. Ideal para mulheres que desejam um olhar marcante, cheio e glamouroso."
  },
  {
    name: "Efeito Princesa",
    description: "Alongamento lateral e elevação estratégica para um olhar sedutor e sofisticado."
  },
  {
    name: "Volume Havilah",
    description: "Resultado natural, delicado e elegante."
  },
  {
    name: "Fox Eyes",
    description: "Alongamento nos cantos externos para um visual moderno."
  },
  {
    name: "Volume Divino",
    description: "Aspecto fresh e contemporâneo."
  },
  {
    name: "Capping",
    description: "Equilíbrio entre naturalidade e volume."
  },
  {
    name: "Combo Glamour",
    description: "Abre o olhar com leveza e elegância."
  },
  {
    name: "Natural Soft",
    description: "Efeito extremamente suave e minimalista."
  }
]
.map(
  model =>
    `${model.name}: ${model.description}`
)
.join('; ');

const SYSTEM_PROMPT = `
Você é uma especialista premium em Lash Design do Havilah Lash Studio.

Analise:
- formato dos olhos
- harmonia facial
- expressão
- proporções do rosto

Baseado nisso, escolha as 2 melhores opções do catálogo:

${lashModelsForPrompt}

REGRAS:
- Seja elegante
- Sofisticada
- Técnica
- Feminina
- Acolhedora
- Premium

Responda EXATAMENTE neste formato:

**Análise do Olhar:** texto

**Recomendação 1:** nome - motivo

**Recomendação 2:** nome - motivo

**Dica de Estilo:** texto

Idioma obrigatório:
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
        error: 'Imagem obrigatória'
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
        SYSTEM_PROMPT,
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image
          }
        }
      ]);

    const response =
      result.response.text();

    return res.status(200).json({
      result: response
    });

  } catch (error: any) {

    console.error(
      'CONSULTANCY ERROR:',
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        'Erro ao analisar imagem'
    });

  }

}
