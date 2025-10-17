import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { removeCookie } from '@/lib/cookies'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function apiStatusChecker(status: number | undefined) {
  return [200, 201].includes(Number(status))
}

export const formattedDate = (dateString?: string, withTime = false) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(withTime && {
      hour: 'numeric',
      minute: 'numeric',
    }),
  })
}

export const handleLogout = () => {
  removeCookie('access_token')
  return (window.location.href = '/login')
}
