import Cookies from 'js-cookie'

export type CookieName = 'access_token'

type CookieOption = Partial<{
  expires: number
  path: string
  domain: string
}>

export const getCookie = (name: CookieName) => {
  const cookieValue = Cookies.get(name)
  if (typeof cookieValue !== 'undefined') {
    return cookieValue
  }
  return null
}

export const setCookie = (
  name: CookieName,
  value: string | number,
  options: CookieOption = {}
) => {
  Cookies.set(name, String(value), {
    ...options,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production',
  })
}

export const removeCookie = (name: CookieName, options: CookieOption = {}) => {
  Cookies.remove(name, {
    ...options,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production',
  })
}
