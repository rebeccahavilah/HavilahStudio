import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método não permitido"
    });
  }

  try {

    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    const message = body?.message;

    if (!message) {
      return res.status(400).json({
        error: "Mensagem obrigatória"
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY não encontrada"
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
Você é a assistente premium do Havilah Lash Studio.

Seu tom é:
- elegante
- sofisticado
- acolhedor
- feminino
- premium

Você ajuda clientes sobre:
- extensões de cílios
- cuidados
- agendamento
- estilos
- manutenção

Modelos disponíveis:
- Volume Premium
- Efeito Princesa
- Volume Havilah
- Fox Eyes
- Volume Divino
- Capping
- Combo Glamour
- Natural Soft

Mensagem da cliente:
${message}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return res.status(200).json({
      text: response
    });

  } catch (error: any) {

    console.error("ERRO API:", error);

    return res.status(500).json({
      error: error.message
    });

  }

}
