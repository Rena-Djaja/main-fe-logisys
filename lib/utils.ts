import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { removeCookie } from '@/lib/cookies'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function apiStatusChecker(status: number | undefined) {
  return [200, 201].includes(Number(status))
}

export const formattedDate = (dateString?: string | null, withTime = false) => {
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

export const parseDate = (dateString: string) => {
  const slicedDate = dateString.slice(0, 19)

  return slicedDate + '+07:00'
}

export const thousandFormat = (number = 0) => {
  let thousand = ''
  const numberRev = number.toString().split('').reverse().join('')
  for (let i = 0; i < numberRev.length; i++)
    if (i % 3 == 0) thousand += numberRev.substr(i, 3) + '.'
  return thousand
    .split('', thousand.length - 1)
    .reverse()
    .join('')
}

export const handleLogout = () => {
  removeCookie('access_token')
  return (window.location.href = '/login')
}
