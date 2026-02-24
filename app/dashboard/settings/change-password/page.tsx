import React from 'react'
import SettingsPage from '@/components/SettingsPage/SettingsPage'
import ChangePasswordPage from '@/components/SettingsPage/Tabs/ChangePasswordPage/ChangePasswordPage'

const Page = () => {
  return (
    <SettingsPage>
      <ChangePasswordPage />
    </SettingsPage>
  )
}

export default Page
