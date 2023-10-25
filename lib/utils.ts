import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("hu-HU", {
  style: 'currency',
  currency: 'HUF',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})
