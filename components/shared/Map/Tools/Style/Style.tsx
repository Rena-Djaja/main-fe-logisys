'use client'

import React, { useState } from 'react'
import { useMapContext } from '@/components/shared/context/MapContext'
import { Tabs, TabsList, TabsTrigger } from '@/components/shared/ui/tabs'
import { STYLE_OPTIONS } from '@/components/shared/Map/Resource'
import { useTheme } from 'next-themes'

const Style = () => {
  const { map } = useMapContext()
  const { theme } = useTheme()
  const [activeStyle, setActiveStyle] = useState(STYLE_OPTIONS[0].id)

  const handleChange = (value: string) => {
    if (!map) return
    let mapTheme = value

    if (value === 'system') {
      if (theme === 'dark') {
        mapTheme = 'dark-v11'
      } else {
        mapTheme = 'light-v11'
      }
    }

    map.setStyle(`mapbox://styles/mapbox/${mapTheme}`)
    setActiveStyle(value)
  }

  return (
    <aside className="absolute bottom-4 left-4 z-10">
      <Tabs value={activeStyle} onValueChange={handleChange}>
        <TabsList className="bg-background shadow-lg">
          {STYLE_OPTIONS.map((style) => (
            <TabsTrigger
              key={style.id}
              value={style.id}
              onClick={() => handleChange(style.id)}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm flex items-center sm:px-3 sm:py-1.5"
            >
              {style.icon}
              <span className="hidden lg:inline">{style.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </aside>
  )
}

export default Style
