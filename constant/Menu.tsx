import {
  ArrowRightLeft,
  Boxes,
  LayoutGrid,
  MapIcon,
  Network,
  UsersRound,
} from 'lucide-react'
import { MenuListProps } from '@/type/MainLayout'
import { PermissionTypes } from '@/type/Auth'

// TODO: Change password menu
// TODO: Role management menu

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
    title: 'master data',
    menuItems: [
      {
        title: 'Suppliers',
        url: '/dashboard/suppliers',
        icon: Network,
        resourceID: [
          PermissionTypes.READ_SUPPLIER,
          PermissionTypes.WRITE_SUPPLIER,
        ],
      },
      {
        title: 'Market Locations',
        url: '/dashboard/locations',
        icon: MapIcon,
        resourceID: [
          PermissionTypes.READ_LOCATION,
          PermissionTypes.WRITE_LOCATION,
        ],
      },
      {
        title: 'Product Management',
        icon: Boxes,
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
      {
        title: 'User Management',
        icon: UsersRound,
        children: [
          {
            title: 'Users',
            url: '/dashboard/users',
            resourceID: [PermissionTypes.READ_USER, PermissionTypes.WRITE_USER],
          },
          {
            title: 'Roles',
            url: '/dashboard/roles',
            resourceID: [PermissionTypes.READ_ROLE, PermissionTypes.WRITE_ROLE],
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
  users: 'User Management',
  locations: 'Market Locations',
}
