// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { NASA_API_BASE_URL, NASA_API_NEO_FEED_URL } from '../../app/config';
import { apiKeyParam } from './shared';
import { Asteroids } from '../../app/types';


export interface Links {
  next: string;
  prev: string;
  self: string;
}

export type NearEarthObjects = Record<string, Asteroids>;

export interface ResponseFromNASA {
  links: Links;
  element_count: number;
  near_earth_objects: NearEarthObjects;
}

type Data = NearEarthObjects;


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { method, query: { start_date, end_date } } = req;

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed.`);
  }

  if (!start_date) {
    res.status(422).end('"start_date" query param is needed.');
  }

  try {
    const responseFromNASA = await fetch(
      `${NASA_API_BASE_URL}${NASA_API_NEO_FEED_URL}?${new URLSearchParams({
        ...apiKeyParam,
        start_date: String(start_date),
        ...(end_date && { end_date: String(end_date) }),
      })}`,
      { method: 'GET' },
    );

    if (!responseFromNASA.ok) throw new Error(`Error with status code ${responseFromNASA.status}`);

    const data = await responseFromNASA.json();

    res.status(200).json(data.near_earth_objects);
  } catch (err) {
    res.status(500).end('Failed to load data.');
  }
}
