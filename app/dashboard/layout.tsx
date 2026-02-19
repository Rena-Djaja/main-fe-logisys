import React from 'react'
import MainLayout from '@/components/shared/MainLayout/MainLayout'
import { redirect } from 'next/navigation'
import { getServerCookies } from '@/lib/servers'

const fetchAuthInfo = async () => {
  const accessToken = await getServerCookies('access_token')

  const res = await fetch(`${process.env.APP_INTERNAL_URL}/api/authenticate`, {
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
