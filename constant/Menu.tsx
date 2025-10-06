import {ArrowRightLeft, Boxes, HardDriveIcon, LayoutGrid, UsersRound} from "lucide-react";
import {MenuListProps} from "@/type/MainLayout";

export const menuList: MenuListProps[] = [
  {
    title: 'main',
    menuItems: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,

      }
    ]
  },
  {
    title: 'app management',
    menuItems: [
      {
        title: 'Users',
        url: '/dashboard/users',
        icon: UsersRound,
      },
      {
        title: 'Master Data',
        icon: HardDriveIcon,
        children: [
          {
            title: 'Products',
            url: '/dashboard/products',
          },
          {
            title: 'Promo',
            url: '/dashboard/promo',
          },
        ]
      }
    ]
  },
  {
    title: 'activity',
    menuItems: [
      {
        title: 'Inventory',
        url: '/dashboard/inventory',
        icon: Boxes,
      },
      {
        title: 'Transactions',
        icon: ArrowRightLeft,
        children: [
          {
            title: 'Purchases',
            url: '/dashboard/purchase',
          },
          {
            title: 'Sales',
            url: '/dashboard/sales',
          },
          {
            title: 'Transfers',
            url: '/dashboard/transfer',
          },
          {
            title: 'In & Out',
            url: '/dashboard/in-out',
          },
        ]
      }
    ]
  },
]

export const breadcrumbMap: Record<string, string> = {
  dashboard: 'Dashboard',
  users: 'User Management'
}