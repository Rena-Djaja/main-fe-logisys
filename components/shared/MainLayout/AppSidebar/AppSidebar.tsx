import React, { FC } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/shared/ui/sidebar'
import { ChevronRight, Shapes } from 'lucide-react'
import { AppSidebarProps } from '@/type/MainLayout'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/shared/ui/collapsible'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserNav } from '@/components/shared/MainLayout/AppSidebar/Sections/UserNav'
import { useAuthContext } from '@/components/shared/context/AuthContext'
import { PermissionTypes } from '@/type/Auth'

const AppSidebar: FC<AppSidebarProps> = ({ menu, ...props }) => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const auth = useAuthContext()

  return (
    <Sidebar collapsible={'icon'} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div>
                <Shapes />
                <span className="text-base font-semibold">
                  Motomobil Logisys
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {menu.map((m, menuIdx) => {
          const authIDs = auth.permissions.map((each) => each.id)
          const items = m.menuItems.filter((each) =>
            each.resourceID.some(
              (r) => authIDs.includes(r) || r === PermissionTypes.PUBLIC
            )
          )

          if (!items.length) {
            return null
          }

          return (
            <SidebarGroup key={menuIdx}>
              <SidebarGroupLabel className="capitalize">
                {m.title}
              </SidebarGroupLabel>
              <SidebarMenu>
                {items.map((parent, parentIdx) => {
                  return parent.children?.length ? (
                    <Collapsible
                      key={parentIdx}
                      asChild
                      defaultOpen={
                        !!parent?.children?.find(
                          (each) => each.url.split('/')?.[2] === segments?.[1]
                        )
                      }
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={parent.title}>
                            {<parent.icon />}
                            <span>{parent.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {parent.children.map((child, childIdx) => {
                              if (
                                child.resourceID.some(
                                  (r) =>
                                    authIDs.includes(r) ||
                                    r === PermissionTypes.PUBLIC
                                )
                              ) {
                                return (
                                  <SidebarMenuSubItem key={childIdx}>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={
                                        segments?.[1] ===
                                        child.url?.split('/')[2]
                                      }
                                    >
                                      <Link href={child.url}>
                                        <span>{child.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                              }
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={parentIdx}>
                      <SidebarMenuButton
                        tooltip={parent.title}
                        asChild
                        isActive={
                          parent.url?.split('/')?.[2] && !segments?.[1]
                            ? segments?.[1] === parent.url?.split('/')[2]
                            : segments?.[1] === parent.url?.split('/')[2]
                        }
                      >
                        <Link href={parent.url || ''}>
                          {<parent.icon />}
                          <span>{parent.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
      <SidebarFooter>
        <UserNav
          user={{
            name: auth.authInfo.name,
            email: auth.authInfo.email,
            role: auth.authInfo.role_name,
            avatar: '/common/user-placeholder.webp',
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
