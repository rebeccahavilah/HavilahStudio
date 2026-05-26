import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req: Request) {

  try {

    if (req.method !== "POST") {

      return new Response(
        JSON.stringify({
          error: "Método não permitido"
        }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

    }

    const body = await req.json();

    const message = body?.message;

    if (!message) {

      return new Response(
        JSON.stringify({
          error: "Mensagem obrigatória"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {

      return new Response(
        JSON.stringify({
          error: "GEMINI_API_KEY não encontrada"
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
Você é a assistente premium do Havilah Lash Studio.

Tom:
- elegante
- sofisticado
- acolhedor
- premium

Você ajuda clientes sobre:
- extensões de cílios
- cuidados
- manutenção
- agendamento
- estilos

Modelos:
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

    return new Response(
      JSON.stringify({
        text: response
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error: any) {

    console.error("ERRO API:", error);

    return new Response(
      JSON.stringify({
        error: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  }

}
