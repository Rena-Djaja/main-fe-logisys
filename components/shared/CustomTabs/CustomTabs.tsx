'use client'

import React, { FC } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shared/ui/tabs'

interface TabsProps {
  tabs: { key: string; title: string; component: FC<any> }[]
  activeTab: string
}

const CustomTabs: FC<TabsProps> = ({ tabs, activeTab }) => {
  return (
    <Tabs className="w-full" defaultValue={activeTab}>
      <TabsList className="w-full">
        {tabs.map((each, idx) => (
          <TabsTrigger key={idx} value={each.key}>
            {each.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((each, idx) => (
        <TabsContent key={idx} value={each.key}>
          <each.component />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default CustomTabs
