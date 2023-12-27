import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(numStr: string) {
  const num = parseInt(numStr, 10);

  if (isNaN(num)) {
    return 'Invalid number';
  }

  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(1) + ' K';
  } else if (num < 1000000000) {
    return (num / 1000000).toFixed(1) + ' M';
  } else {
    return (num / 1000000000).toFixed(1) + ' B';
  }
}