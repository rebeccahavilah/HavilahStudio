// DOCUMENTAÇÃO: O serviço agora não usa a biblioteca do Google GenAI diretamente.
// Ele apenas faz requisições HTTP para a sua pasta 'api', mantendo o frontend leve.

/**
 * Envia mensagens para a rota de Chat do nosso backend.
 * @param history Histórico da conversa para manter o contexto.
 * @param message A nova mensagem do usuário.
 * @returns Um ReadableStream contendo a resposta em tempo real.
 */
export const sendMessageToApi = async (history: any[], message: string) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Enviamos os dados exatamente como a sua api/chat.ts espera receber
    body: JSON.stringify({ history, message }),
  });

  if (!response.ok) {
    throw new Error(`Falha na API: ${response.status} - ${response.statusText}`);
  }

  // Retornamos o stream puro da resposta para que o Chat.tsx possa decodificar
  return response.body;
};

/**
 * Envia uma imagem para a rota de Consultoria do backend.
 * @param base64Image A imagem convertida em formato base64.
 * @returns A string contendo a análise do olhar e recomendação de cílios.
 */
export const sendImageForConsultancy = async (base64Image: string) => {
  const response = await fetch('/api/consultancy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ base64Image }),
  });

  if (!response.ok) {
    throw new Error('Falha ao processar a imagem na API.');
  }

  const data = await response.json();
  return data.result;
};
