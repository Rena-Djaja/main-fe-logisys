'use client'

import React from 'react'
import { useMapContext } from '@/components/shared/context/MapContext'
import { Button } from '@/components/shared/ui/button'
import { Locate, Minus, Plus } from 'lucide-react'

const Controls = () => {
  const { map, setCurrentPosition } = useMapContext()

  const handleZoomIn = () => {
    map?.zoomIn()
  }

  const handleZoomOut = () => {
    map?.zoomOut()
  }

  const handleLocate = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map?.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 15,
          speed: 4,
          duration: 1000,
          essential: true,
        })

        setCurrentPosition({
          hasLocation: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  return (
    <aside className="absolute bottom-2 md:bottom-8 right-2 md:right-4 z-10 bg-background p-0 md:p-1 rounded-lg shadow-lg flex flex-col divide-y">
      <Button
        className="hidden md:flex"
        variant="ghost"
        size="icon"
        onClick={handleZoomIn}
      >
        <Plus className="size-4 md:size-5" />
        <span className="sr-only">Zoom in</span>
      </Button>
      <Button
        className="hidden md:flex"
        variant="ghost"
        size="icon"
        onClick={handleZoomOut}
      >
        <Minus className="size-4 md:size-5" />
        <span className="sr-only">Zoom out</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={handleLocate}>
        <Locate className="size-4 md:size-5" />
        <span className="sr-only">Locate</span>
      </Button>
    </aside>
  )
}

export default Controls
