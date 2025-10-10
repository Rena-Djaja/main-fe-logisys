import {
  ArrowRightLeft,
  Boxes,
  HardDriveIcon,
  LayoutGrid,
  UsersRound,
} from 'lucide-react'
import { MenuListProps } from '@/type/MainLayout'
import { PermissionTypes } from '@/type/Auth'

export const menuList: MenuListProps[] = [
  {
    title: 'main',
    menuItems: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
        resourceID: [PermissionTypes.PUBLIC],
      },
    ],
  },
  {
    title: 'app management',
    menuItems: [
      {
        title: 'Users',
        url: '/dashboard/users',
        icon: UsersRound,
        resourceID: [PermissionTypes.READ_USER, PermissionTypes.WRITE_USER],
      },
      {
        title: 'Master Data',
        icon: HardDriveIcon,
        children: [
          {
            title: 'Products',
            url: '/dashboard/products',
            resourceID: [PermissionTypes.PUBLIC],
          },
          {
            title: 'Promo',
            url: '/dashboard/promo',
            resourceID: [PermissionTypes.PUBLIC],
          },
        ],
        resourceID: [PermissionTypes.PUBLIC],
      },
    ],
  },
  {
    title: 'activity',
    menuItems: [
      {
        title: 'Inventory',
        url: '/dashboard/inventory',
        icon: Boxes,
        resourceID: [PermissionTypes.PUBLIC],
      },
      {
        title: 'Transactions',
        icon: ArrowRightLeft,
        children: [
          {
            title: 'Purchases',
            url: '/dashboard/purchase',
            resourceID: [PermissionTypes.PUBLIC],
          },
          {
            title: 'Sales',
            url: '/dashboard/sales',
            resourceID: [PermissionTypes.PUBLIC],
          },
          {
            title: 'Transfers',
            url: '/dashboard/transfer',
            resourceID: [PermissionTypes.PUBLIC],
          },
          {
            title: 'In & Out',
            url: '/dashboard/in-out',
            resourceID: [PermissionTypes.PUBLIC],
          },
        ],
        resourceID: [PermissionTypes.PUBLIC],
      },
    ],
  },
]

export const breadcrumbMap: Record<string, string> = {
  dashboard: 'Dashboard',
  users: 'User Management',
}
