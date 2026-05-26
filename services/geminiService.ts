export const sendMessageToApi = async (
  history: any[],
  message: string
) => {

  const response = await fetch(
    '/api/chat',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        history,
        message
      })
    }
  );

  if (!response.ok) {

    const errorText =
      await response.text();

    console.error(
      'CHAT API ERROR:',
      errorText
    );

    throw new Error(errorText);

  }

  return response.body;

};

export const sendImageForConsultancy = async (
  base64Image: string
) => {

  const response = await fetch(
    '/api/consultancy',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        base64Image
      })
    }
  );

  const data =
    await response.json();

  if (!response.ok) {

    console.error(
      'CONSULTANCY API ERROR:',
      data
    );

    throw new Error(
      data.error || 'Erro na análise'
    );

  }

  return data.result;

};
