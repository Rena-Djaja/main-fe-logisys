'use client'

import React, { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface SettingsPageProps {
  children: ReactNode
}

const SettingsPage: FC<SettingsPageProps> = ({ children }) => {
  const pathname = usePathname()

  const menuItems = [
    {
      name: 'Profil',
      href: '/dashboard/settings/profile',
    },
    {
      name: 'Ubah Kata Sandi',
      href: '/dashboard/settings/change-password',
    },
    {
      name: 'Pengaturan',
      href: '/dashboard/settings/preferences',
    },
  ]

  return (
    <div className="mt-12 w-full h-full flex gap-14">
      <div className="hidden lg:flex w-max h-full flex-col border-r border-r-muted/50">
        {menuItems.map((each, idx) => (
          <Link key={idx} href={each.href}>
            <div
              className={cn(
                'w-max p-2.5 pl-[2.5rem] pr-[6.5rem] text-[0.925rem]',
                each.href === pathname
                  ? 'border-r-2 border-r-foreground text-foreground'
                  : 'text-muted-foreground/60'
              )}
            >
              {each.name}
            </div>
          </Link>
        ))}
      </div>
      {children}
    </div>
  )
}

export default SettingsPage
