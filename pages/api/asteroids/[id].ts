import type { NextApiRequest, NextApiResponse } from 'next';

import { NASA_API_BASE_URL, NASA_API_NEO_URL } from '../../../app/config';
import { apiKeyParam } from '../shared';
import { Asteroid } from '../../../app/types';


type Data = Asteroid;


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { method, query: { id } } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed.`);
  }

  if (!id) {
    res.status(422).end('"id" query param is needed.');
  }

  try {
    const responseFromNASA = await fetch(
      `${NASA_API_BASE_URL}${NASA_API_NEO_URL}${String(id)}?${new URLSearchParams({
        ...apiKeyParam,
      })}`,
      { method: 'GET' },
    );

    if (!responseFromNASA.ok) throw new Error(`Error with status code ${responseFromNASA.status}`);

    const data = await responseFromNASA.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).end('Failed to load data.');
  }
}
