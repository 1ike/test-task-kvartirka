import { DAY_STEP } from './config';


export const addDaysToNewDate = (date: Date, days: number = DAY_STEP) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);

  return newDate;
};


export const formatDateForQuery = (date: Date) => date.toISOString().slice(0, 10);
