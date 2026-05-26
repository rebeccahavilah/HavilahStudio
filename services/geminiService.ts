export const sendMessageToApi = async (
  history: any[],
  message: string
) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history, message })
  });

  // ✅ Trata como JSON, não como stream
  const data = await response.json();

  if (!response.ok) {
    console.error('CHAT API ERROR:', data);
    throw new Error(data.error || 'Erro na API');
  }

  return data.text; // ✅ retorna o texto direto
};
