import type {
  VercelRequest,
  VercelResponse
} from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {

  if (req.method !== 'POST') {

    return res.status(405).json({
      error: 'Método não permitido'
    });

  }

  return res.status(200).json({
    text: 'API funcionando perfeitamente'
  });

}
