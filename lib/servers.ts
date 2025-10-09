import { cookies } from 'next/headers'

export const getServerCookies = async (key: string) => {
  return (await cookies()).get(key)?.value
}
