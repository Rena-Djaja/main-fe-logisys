import React from 'react'
import MainLayout from '@/components/shared/MainLayout/MainLayout'
import { AuthAPI } from '@/constant/APIUrls'
import { redirect } from 'next/navigation'
import { getServerCookies } from '@/lib/servers'
import { PostAuthInfoResponse } from '@/type/Auth'

const fetchAuthInfo = async () => {
  const accessToken = await getServerCookies('access_token')

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const response = await res.json()
  if (!response?.success) {
    redirect(`/login`)
  }

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
