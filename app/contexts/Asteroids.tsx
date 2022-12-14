import React, {
  useCallback, useMemo, useState,
} from 'react';

import { Asteroid, Asteroids } from '../types';


export type StartDate = Date;

export enum MissDistanceDisplay {
  kilometers = 'kilometers',
  lunar = 'lunar',
}

export type OnlyDangerous = boolean;

interface IAsteroidsContext {
  asteroids: Asteroids;
  setAsteroids?: (asteroids: Asteroids) => void;
  doomedAsteroids: Asteroids;
  addDoomedAsteroid?: (asteroid: Asteroid) => void;
  destroyDoomedAsteroids?: () => void;
  startDate: StartDate;
  setStartDate?: (startDate: StartDate) => void;
  missDistanceDisplay: MissDistanceDisplay;
  setMissDistanceDisplay?: (display: MissDistanceDisplay) => void;
  onlyDangerous: OnlyDangerous;
  setOnlyDangerous?: (value: OnlyDangerous) => void;
  filteredAsteroids: Asteroids;
  scrollPosition: number;
  setScrollPosition?: (val: number) => void;
}

export const asteroidsInitial: Asteroids = [];
const startDateInitial: StartDate = new Date();
const missDistanceDisplayInitial = MissDistanceDisplay.kilometers;
const onlyDangerousInitial = false;
const scrollPositionInitial = 0;

export const AsteroidsContext = React.createContext<IAsteroidsContext>({
  asteroids: asteroidsInitial,
  doomedAsteroids: asteroidsInitial,
  startDate: startDateInitial,
  missDistanceDisplay: missDistanceDisplayInitial,
  onlyDangerous: onlyDangerousInitial,
  filteredAsteroids: asteroidsInitial,
  scrollPosition: scrollPositionInitial,
});


interface Props {
  children: React.ReactNode,
}

export function AsteroidsProvider({ children }: Props) {
  const [asteroids, setAsteroidsState] = useState<Asteroids>(asteroidsInitial);

  const setAsteroids = useCallback(
    (newAsteroids: Asteroids) => setAsteroidsState(newAsteroids),
    [setAsteroidsState],
  );


  const [doomedAsteroids, setDoomedAsteroidsState] = useState<Asteroids>(asteroidsInitial);

  const addDoomedAsteroid = useCallback(
    (newAsteroid: Asteroid) => {
      const alreadyInList = doomedAsteroids.some((asteroid) => asteroid.id === newAsteroid.id);
      if (!alreadyInList) {
        setDoomedAsteroidsState((asteroidsPrev) => asteroidsPrev.concat(newAsteroid));
      }
    },
    [doomedAsteroids, setDoomedAsteroidsState],
  );

  const destroyDoomedAsteroids = useCallback(
    () => {
      const doomedAsteroidIDs = doomedAsteroids.map((doomedAsteroid) => doomedAsteroid.id);

      const filtered = asteroids.filter((asteroid) => !doomedAsteroidIDs.includes(asteroid.id));
      setAsteroidsState(filtered);
      setDoomedAsteroidsState(asteroidsInitial);
    },
    [doomedAsteroids, setDoomedAsteroidsState, asteroids, setAsteroidsState],
  );


  const [startDate, setStartDateState] = useState<StartDate>(startDateInitial);

  const setStartDate = useCallback(
    (newStartDate: StartDate) => setStartDateState(newStartDate),
    [setStartDateState],
  );


  const [
    missDistanceDisplay, setMissDistanceDisplayState,
  ] = useState<MissDistanceDisplay>(missDistanceDisplayInitial);

  const setMissDistanceDisplay = useCallback(
    (display: MissDistanceDisplay) => setMissDistanceDisplayState(display),
    [setMissDistanceDisplayState],
  );


  const [
    onlyDangerous, setOnlyDangerousState,
  ] = useState<OnlyDangerous>(onlyDangerousInitial);

  const setOnlyDangerous = useCallback(
    (value: OnlyDangerous) => setOnlyDangerousState(value),
    [setOnlyDangerousState],
  );


  const filteredAsteroids = useMemo<Asteroids>(() => asteroids.filter(
    (asteroid) => (onlyDangerous ? asteroid.is_potentially_hazardous_asteroid : true),
  ), [asteroids, onlyDangerous]);


  const [scrollPosition, setScrollPositionState] = useState<number>(scrollPositionInitial);

  const setScrollPosition = useCallback(
    (value: number) => setScrollPositionState(value),
    [setScrollPositionState],
  );


  const value = useMemo(
    () => ({
      asteroids,
      setAsteroids,
      doomedAsteroids,
      addDoomedAsteroid,
      destroyDoomedAsteroids,
      startDate,
      setStartDate,
      missDistanceDisplay,
      setMissDistanceDisplay,
      onlyDangerous,
      setOnlyDangerous,
      filteredAsteroids,
      scrollPosition,
      setScrollPosition,
    }),
    [
      asteroids,
      setAsteroids,
      doomedAsteroids,
      addDoomedAsteroid,
      destroyDoomedAsteroids,
      startDate,
      setStartDate,
      missDistanceDisplay,
      setMissDistanceDisplay,
      onlyDangerous,
      setOnlyDangerous,
      filteredAsteroids,
      scrollPosition,
      setScrollPosition,
    ],
  );

  return (
    <AsteroidsContext.Provider value={value}>
      {children}
    </AsteroidsContext.Provider>
  );
}
