import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  if (seconds <= 0) return '0s';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

export function calculateReadingStats(
  text: string,
  wpm: number
): {
  wordCount: number;
  estimatedReadTime: number;
} {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordCount = words.length;
  const estimatedReadTime = Math.ceil((wordCount / wpm) * 60); // in seconds

  return {
    wordCount,
    estimatedReadTime,
  };
}
