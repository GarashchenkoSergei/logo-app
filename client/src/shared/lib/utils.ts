import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorMessage = `Network error: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
};
