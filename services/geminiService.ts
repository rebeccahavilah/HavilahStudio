export const sendMessageToApi = async (
  history: any[],
  message: string
): Promise<string> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history, message })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('CHAT API ERROR:', data);
    throw new Error(data.error || 'Erro na API');
  }

  return data.text;
};

export const sendImageForConsultancy = async (
  base64Image: string
): Promise<string> => {
  const response = await fetch('/api/consultancy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64Image })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('CONSULTANCY API ERROR:', data);
    throw new Error(data.error || 'Erro na análise');
  }

  return data.result;
};
