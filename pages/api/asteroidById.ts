// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const {
    query: { id, name },
    method,
  } = req;

  try {
    const responseFromNASA = await fetch(
      `${API_BASE_URL}/asteroids`,
      { method: 'GET' },
    )

    if (!responseFromNASA.ok) throw new Error(`Error with status code ${responseFromNASA.status}`);


    if (method === 'GET') {
      res.status(200).json({ id, name: `User ${id}` });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
