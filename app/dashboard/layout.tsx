import React from 'react'
import MainLayout from '@/components/shared/MainLayout/MainLayout'

const DashboardMainLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>
}

export default DashboardMainLayout
