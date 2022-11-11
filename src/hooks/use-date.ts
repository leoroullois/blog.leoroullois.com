import {months} from '@lib/constants';

export const useDate = (date: Date): string => {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};
