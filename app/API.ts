import { API_BASE_URL, DAY_STEP } from './config';
import { Asteroid, ID } from './types';
import { addDaysToNewDate, formatDateForQuery } from './shared';
import { NearEarthObjects } from '../pages/api/asteroids';
import { APOD } from '../pages/api/apod';


interface AsteroidsParams {
  startDate: Date;
  endDate?: Date;
}

const fetchAsteroids = ({ startDate, endDate }: AsteroidsParams): Promise<(NearEarthObjects)> => {
  let end;
  if (!endDate) {
    end = formatDateForQuery(addDaysToNewDate(startDate, DAY_STEP - 1));
  } else {
    end = formatDateForQuery(endDate);
  }

  return fetch(
    `${API_BASE_URL}/asteroids?${new URLSearchParams({
      start_date: formatDateForQuery(startDate),
      end_date: end,
    })}`,
    { method: 'GET' },
  )
    .then((response) => {
      if (response.ok) return response.json();

      throw new Error(`Error with status code ${response.status}`);
    });
};


const fetchAsteroidById = (id: ID): Promise<(Asteroid)> => fetch(
  `${API_BASE_URL}${id}`,
  { method: 'GET' },
)
  .then((response) => {
    if (response.ok) return response.json();

    throw new Error(`Error with status code ${response.status}`);
  });


const fetchAPOD = (): Promise<APOD> => fetch(
  `${API_BASE_URL}/apod`,
  { method: 'GET' },
)
  .then((response) => {
    if (response.ok) return response.json();

    throw new Error(`Error with status code ${response.status}`);
  });


export default {
  fetchAsteroids,
  fetchAsteroidById,
  fetchAPOD,
};
