'use client'

import React, { FC } from 'react'
import useInventoryPage from '@/components/InventoryPage/useInventoryPage'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shared/ui/tabs'
import { InventoryPageProps } from '@/type/Inventory'

const InventoryPage: FC<InventoryPageProps> = ({ tab }) => {
  const { tabs } = useInventoryPage()
  const defaultTab =
    tab && tabs.map((t) => t.value).indexOf(tab) ? tab : tabs[0].value

  console.log(defaultTab)

  return (
    <div className="mt-8 w-full flex flex-col gap-10">
      <Tabs defaultValue={defaultTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default InventoryPage
