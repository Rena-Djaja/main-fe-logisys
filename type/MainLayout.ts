import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Sidebar } from '@/components/shared/ui/sidebar'
import { LucideProps } from 'lucide-react'
import { PermissionTypes } from '@/type/Auth'

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menu: MenuListProps[]
}

export interface MenuListProps {
  title: string
  menuItems: MenuItemProps[]
}

export interface MenuItemProps {
  title: string
  url?: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  children?: ChildMenuItemProps[]
  resourceID: PermissionTypes[]
}

export interface ChildMenuItemProps {
  title: string
  url: string
  resourceID: PermissionTypes[]
}
