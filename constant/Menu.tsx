import {
  ArrowRightLeft,
  Boxes,
  LayoutGrid,
  MapIcon,
  MapPin,
  Network,
  RectangleEllipsis,
  SlidersHorizontal,
  UserPen,
  UserRoundKey,
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
        title: 'Supplier',
        url: '/dashboard/suppliers',
        icon: Network,
        resourceID: [
          PermissionTypes.READ_SUPPLIER,
          PermissionTypes.WRITE_SUPPLIER,
        ],
      },
      {
        title: 'Pelanggan',
        url: '/dashboard/customers',
        icon: UsersRound,
        resourceID: [PermissionTypes.PUBLIC, PermissionTypes.PUBLIC],
      },
      {
        title: 'Lokasi Penjualan',
        url: '/dashboard/locations',
        icon: MapIcon,
        resourceID: [
          PermissionTypes.READ_LOCATION,
          PermissionTypes.WRITE_LOCATION,
        ],
      },
      {
        title: 'Manajemen Produk',
        icon: Boxes,
        children: [
          {
            title: 'Produk',
            url: '/dashboard/products',
            resourceID: [PermissionTypes.READ_PRODUCT],
          },
          {
            title: 'Diskon',
            url: '/dashboard/discounts',
            resourceID: [PermissionTypes.READ_DISCOUNT],
          },
          {
            title: 'Hadiah',
            url: '/dashboard/complimentaries',
            resourceID: [PermissionTypes.PUBLIC],
          },
        ],
        resourceID: [
          PermissionTypes.READ_PRODUCT,
          PermissionTypes.WRITE_PRODUCT,
        ],
      },
      {
        title: 'Manajemen User',
        icon: UserRoundKey,
        children: [
          {
            title: 'Pengguna',
            url: '/dashboard/users',
            resourceID: [PermissionTypes.READ_USER, PermissionTypes.WRITE_USER],
          },
          // {
          //   title: 'Jenis Pengguna',
          //   url: '/dashboard/roles',
          //   resourceID: [PermissionTypes.READ_ROLE, PermissionTypes.WRITE_ROLE],
          // },
        ],
        resourceID: [PermissionTypes.READ_USER, PermissionTypes.WRITE_USER],
      },
      {
        title: 'Lokasi Tersimpan',
        icon: MapPin,
        url: '/dashboard/saved-location',
        resourceID: [PermissionTypes.PUBLIC],
      },
    ],
  },
  {
    title: 'Aktivitas',
    menuItems: [
      {
        title: 'Stok Gudang',
        url: '/dashboard/inventory',
        icon: Boxes,
        resourceID: [PermissionTypes.PUBLIC],
      },
      {
        title: 'Transaksi',
        icon: ArrowRightLeft,
        children: [
          {
            title: 'Pembelian',
            url: '/dashboard/purchase',
            resourceID: [PermissionTypes.PUBLIC],
          },
          {
            title: 'Penjualan',
            url: '/dashboard/sales',
            resourceID: [PermissionTypes.PUBLIC],
          },
          {
            title: 'Transfer',
            url: '/dashboard/transfer',
            resourceID: [PermissionTypes.PUBLIC],
          },
          {
            title: 'Barang Masuk & Keluar',
            url: '/dashboard/in-out',
            resourceID: [PermissionTypes.PUBLIC],
          },
        ],
        resourceID: [PermissionTypes.PUBLIC],
      },
    ],
  },
]

export const userMenuList = [
  {
    name: 'Profil Pengguna',
    href: '/dashboard/settings/profile',
    icon: UserPen,
  },
  {
    name: 'Ganti Kata Sandi',
    href: '/dashboard/settings/change-password',
    icon: RectangleEllipsis,
  },
  {
    name: 'Pengaturan',
    href: '/dashboard/settings/preferences',
    icon: SlidersHorizontal,
  },
]

export const breadcrumbMap: Record<string, string> = {
  users: 'Pengguna',
  'saved-location': 'Lokasi Tersimpan',
  locations: 'Lokasi Penjualan',
}
