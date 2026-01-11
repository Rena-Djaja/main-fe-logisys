'use client'

import Warehouse from '@/components/InventoryPage/Tabs/Warehouse/Warehouse'
import Trucks from '@/components/InventoryPage/Tabs/Trucks/Trucks'

const useInventoryPage = () => {
  const tabs = [
    {
      name: 'Warehouse',
      value: 'warehouse',
      component: () => <Warehouse />,
    },
    {
      name: 'Truck',
      value: 'truck',
      component: () => <Trucks />,
    },
  ]

  return {
    tabs,
  }
}

export default useInventoryPage
