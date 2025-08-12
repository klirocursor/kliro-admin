import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hasIntersection = (arr1: any[], arr2: any[]) => {
  return arr1.filter((item) => arr2?.includes(item)).length > 0
}
