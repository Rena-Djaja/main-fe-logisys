import React from 'react'
import MainLayout from '@/components/shared/MainLayout/MainLayout'
import { AuthAPI } from '@/constant/APIUrls'
import { redirect } from 'next/navigation'
import { getServerCookies } from '@/lib/servers'
import { PostAuthInfoResponse } from '@/type/Auth'

const fetchAuthInfo = async () => {
  const accessToken = await getServerCookies('access_token')

  const res = await fetch(AuthAPI.POST_AUTH_INFO, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-cache',
  })

  if (!res.ok) {
    redirect('/login')
  }

  const response: PostAuthInfoResponse = await res.json()

  return response
}

const DashboardMainLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const response = await fetchAuthInfo()

  return <MainLayout authData={response.data}>{children}</MainLayout>
}

export default DashboardMainLayout
