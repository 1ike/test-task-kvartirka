import type { NextApiRequest, NextApiResponse } from 'next';

import { NASA_API_BASE_URL, NASA_API_APOD_URL } from '../../app/config';
import { apiKeyParam } from './shared';


export interface APOD {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APOD>,
) {
  const { method } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed.`);
  }

  try {
    const responseFromNASA = await fetch(
      `${NASA_API_BASE_URL}${NASA_API_APOD_URL}?${new URLSearchParams({
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
