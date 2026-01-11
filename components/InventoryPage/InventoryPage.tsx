'use client'

import React from 'react'
import useInventoryPage from '@/components/InventoryPage/useInventoryPage'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shared/ui/tabs'

const InventoryPage = () => {
  const { tabs } = useInventoryPage()

  return (
    <div className="mt-8 w-full flex flex-col gap-10">
      <Tabs defaultValue={tabs[0].value}>
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
