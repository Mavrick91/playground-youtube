import { clsx, type ClassValue } from 'clsx';
import { isValid, parse } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(numStr: string) {
  const num = parseInt(numStr, 10);

  if (Number.isNaN(num)) {
    return 'Invalid number';
  }

  if (num < 1000) {
    return num.toString();
  }
  if (num < 1000000) {
    return `${(num / 1000).toFixed(1)} K`;
  }
  if (num < 1000000000) {
    return `${(num / 1000000).toFixed(1)} M`;
  }
  return `${(num / 1000000000).toFixed(1)} B`;
}

export function isValidDate(dateString: string) {
  const dateFormat = 'yyyy-MM-dd';
  const parsedDate = parse(dateString, dateFormat, new Date());
  return isValid(parsedDate);
}

export function arePublishedDatesValid(publishedAfter: string | undefined, publishedBefore: string | undefined) {
  const isAfterDateValid = publishedAfter ? isValidDate(publishedAfter) : true;
  const isBeforeDateValid = publishedBefore ? isValidDate(publishedBefore) : true;

  if (!isAfterDateValid || !isBeforeDateValid) return false;

  let afterDate: Date | null;
  let beforeDate: Date | null;

  if (isAfterDateValid && isBeforeDateValid) {
    afterDate = publishedAfter ? new Date(publishedAfter as string) : null;
    beforeDate = publishedBefore ? new Date(publishedBefore as string) : null;

    if (afterDate && beforeDate) {
      return afterDate <= beforeDate;
    }
    if (afterDate || beforeDate) return true;
  }

  return false;
}

export function parseISO8601Duration(duration: string): string {
  const regex = /P(?:\d+Y)?(?:\d+M)?(?:\d+D)?T(?:\d+H)?(?:\d+M)?(?:\d+S)?/;
  const matches = duration.match(regex);

  if (!matches) {
    return '00:00';
  }

  const isoDuration = matches[0];
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  const hoursMatch = isoDuration.match(/(\d+)H/);
  const minutesMatch = isoDuration.match(/(\d+)M/);
  const secondsMatch = isoDuration.match(/(\d+)S/);

  if (hoursMatch) {
    hours = parseInt(hoursMatch[1], 10);
  }
  if (minutesMatch) {
    minutes = parseInt(minutesMatch[1], 10);
  }
  if (secondsMatch) {
    seconds = parseInt(secondsMatch[1], 10);
  }

  let formattedDuration = '';
  if (hours > 0) {
    formattedDuration += `${hours.toString().padStart(2, '0')}:`;
  }
  formattedDuration += `${minutes.toString().padStart(2, '0')}:`;
  formattedDuration += seconds.toString().padStart(2, '0');

  return formattedDuration;
}
