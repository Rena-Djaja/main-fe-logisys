'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/shared/ui/sidebar'
import AppSidebar from '@/components/shared/MainLayout/AppSidebar/AppSidebar'
import { breadcrumbMap, menuList } from '@/constant/Menu'
import { Separator } from '@/components/shared/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shared/ui/breadcrumb'
import Link from 'next/link'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  console.log(process.env.BASE_API_URL, 'halo')

  return (
    <SidebarProvider
    // style={
    //   {
    //     "--sidebar-width": "calc(var(--spacing) * 72)",
    //     "--header-height": "calc(var(--spacing) * 12)",
    //   } as React.CSSProperties
    // }
    >
      <AppSidebar menu={menuList} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {segments.map((segment, index) => {
                  const href = '/' + segments.slice(0, index + 1).join('/')
                  const isLast = index === segments.length - 1
                  const label =
                    breadcrumbMap[segment] ||
                    segment
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase()) // Capitalize

                  return (
                    <BreadcrumbItem key={href}>
                      {isLast ? (
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                      ) : (
                        <>
                          <BreadcrumbLink asChild>
                            <Link href={href}>{label}</Link>
                          </BreadcrumbLink>
                          <BreadcrumbSeparator />
                        </>
                      )}
                    </BreadcrumbItem>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
