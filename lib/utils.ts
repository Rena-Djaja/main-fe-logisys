import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function apiStatusChecker(status: number | undefined) {
  return [200, 201].includes(Number(status))
}
