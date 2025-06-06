import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// End of utility functions

export function formatDate(date: string, format: string): string {
  const d = new Date(date);
  if (format === 'long') {
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return d.toLocaleDateString();
}

// lib/utils.ts
export function formatDateTime(dateString: string, timeString: string) {
  const date = new Date(`${dateString}T${timeString}`);
  return date.toLocaleDateString("en-US", {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}