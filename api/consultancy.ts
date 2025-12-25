import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const lashModelsForPrompt = [
  { name: "Volume Premium", description: "Volume intenso, criado com leques volumosos. Ideal para mulheres que desejam um olhar marcante, cheio e glamouroso. Recomendado para quem gosta de destaque, maquiagem e presença forte." },
  { name: "Efeito Princesa", description: "Traz alongamento lateral e elevação estratégica que criam um olhar sedutor, misterioso e levemente “esticado”. Favorece quem tem olhos redondos ou pequenos." },
  { name: "Volume Havilah", description: "Resultado natural, delicado e elegante. Indicado para quem está aplicando cílios pela primeira vez ou busca um efeito discreto. Realça a beleza natural sem exageros." },
  { name: "Fox Eyes", description: "Efeito de olhar de raposa, com alongamento nos cantos externos. Deixa o rosto mais harmônico e sofisticado. Excelente para mulheres que gostam de um visual moderno e expressivo." },
  { name: "Volume Divino", description: "Leques mais fechados que criam um aspecto “fresh”, como se tivesse saído da água. Queridinho no Instagram. Perfeito para quem ama tendência e estética contemporânea." },
  { name: "Capping", description: "Combinação equilibrada de naturalidade com volume. Recomendado para quem quer um meio-termo: mais cheio que o clássico, mais leve que o volume russo." },
  { name: "Combo Glamour", description: "Abre o olhar e cria sensação de leveza. Modela suavemente e dá um brilho elegante ao olhar. Ótimo para fotos e eventos." },
  { name: "Natural Soft", description: "Efeito extremamente suave, simulando cílios naturais porém mais longos e curvados. Ideal para clientes discretas e minimalistas." }
].map(m => `${m.name}: ${m.description}`).join('; ');


const SYSTEM_INSTRUCTION_CONSULTANCY = `
You are an expert Lash Designer consultant for Havilah Lash Studio.
Analyze the provided image of a person's face/eyes.
Based on their eye shape (almond, round, hooded, monolid, etc.) and facial features, recommend the BEST 2 options from the following list:
${lashModelsForPrompt}

Format your response exactly as follows:
**Análise do Olhar:** [Brief analysis of eye shape]
**Recomendação 1:** [Model Name] - [Reasoning]
**Recomendação 2:** [Model Name] - [Reasoning]
**Dica de Estilo:** [A short premium styling tip]

Keep the tone highly professional, flattering, and technical yet accessible. Portuguese language only.
`;


export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { base64Image } = await req.json();
    
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return new Response("API key not configured", { status: 500 });
    }
    
    const ai = new GoogleGenAI({ apiKey });

    const model = 'gemini-3-flash-preview';

    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: "Analise este rosto e recomende o melhor estilo de cílios do catálogo Havilah." }
        ]
      },
      config: { systemInstruction: SYSTEM_INSTRUCTION_CONSULTANCY }
    });

    return new Response(JSON.stringify({ result: response.text }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("API Consultancy Error:", error);
    return new Response("Error processing image analysis.", { status: 500 });
  }
}
