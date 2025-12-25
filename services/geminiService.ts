// File: services/geminiService.ts

// A sessão de chat agora é apenas uma representação do histórico no lado do cliente
export const startChatSession = () => {
  return {
    history: [], // Começa com um histórico vazio
  };
};

// Envia a mensagem para a nossa API segura, não mais para o Google diretamente
export const sendMessageToApi = async (history: { role: string; text: string }[], message: string): Promise<ReadableStream<Uint8Array>> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ history, message }),
  });

  if (!response.ok || !response.body) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${errorText}`);
  }

  return response.body;
};

// Envia a imagem para a nossa API segura
export const analyzeImageForConsultancy = async (base64Image: string): Promise<string> => {
  const response = await fetch('/api/consultancy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ base64Image }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.result || "Não foi possível analisar a imagem.";
};