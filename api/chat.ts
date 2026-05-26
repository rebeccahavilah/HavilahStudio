import type {
  VercelRequest,
  VercelResponse
} from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {

  try {

    return res.status(200).json({
      funcionando: true,
      env: !!process.env.GEMINI_API_KEY
    });

  } catch (error: any) {

    return res.status(500).json({
      error: error.message
    });

  }

}
