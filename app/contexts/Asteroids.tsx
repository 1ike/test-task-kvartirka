import React, {
  useCallback, useMemo, useState,
} from 'react';

import { Asteroids } from '../types';


export type StartDate = Date;

export enum MissDistanceDisplay {
  kilometers = 'kilometers',
  lunar = 'lunar',
}

export type OnlyDangerous = boolean;

interface IAsteroidsContext {
  asteroids: Asteroids;
  setAsteroids?: (asteroids: Asteroids) => void;
  startDate: StartDate;
  setStartDate?: (startDate: StartDate) => void;
  missDistanceDisplay: MissDistanceDisplay;
  setMissDistanceDisplay?: (display: MissDistanceDisplay) => void;
  onlyDangerous: OnlyDangerous;
  setOnlyDangerous?: (value: OnlyDangerous) => void;
  filteredAsteroids: Asteroids;
}

const asteroidsInitial: Asteroids = [];
const startDateInitial: StartDate = new Date();
const missDistanceDisplayInitial = MissDistanceDisplay.kilometers;
const onlyDangerousInitial = false;

export const AsteroidsContext = React.createContext<IAsteroidsContext>({
  asteroids: asteroidsInitial,
  startDate: startDateInitial,
  missDistanceDisplay: missDistanceDisplayInitial,
  onlyDangerous: onlyDangerousInitial,
  filteredAsteroids: asteroidsInitial,
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


  const value = useMemo(
    () => ({
      asteroids,
      setAsteroids,
      startDate,
      setStartDate,
      missDistanceDisplay,
      setMissDistanceDisplay,
      onlyDangerous,
      setOnlyDangerous,
      filteredAsteroids,
    }),
    [
      asteroids,
      setAsteroids,
      startDate,
      setStartDate,
      missDistanceDisplay,
      setMissDistanceDisplay,
      onlyDangerous,
      setOnlyDangerous,
      filteredAsteroids,
    ],
  );

  return (
    <AsteroidsContext.Provider value={value}>
      {children}
    </AsteroidsContext.Provider>
  );
}
