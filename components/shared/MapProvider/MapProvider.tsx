'use client'

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapContext } from '@/components/shared/context/MapContext'
import { Spinner } from '@/components/shared/ui/spinner'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

type MapComponentProps = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>
  initialViewState: {
    longitude: number
    latitude: number
    zoom: number
  }
  setCurrentPosition: (position: {
    hasLocation: boolean
    latitude: number
    longitude: number
  }) => void
  children?: React.ReactNode
}

const MapProvider = ({
  mapContainerRef,
  initialViewState,
  setCurrentPosition,
  children,
}: MapComponentProps) => {
  const map = useRef<mapboxgl.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mapContextValue, setMapContextValue] = useState<mapboxgl.Map | null>(
    null
  )

  const loadMap = () => {
    if (!mapContainerRef.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [initialViewState.longitude, initialViewState.latitude],
      zoom: initialViewState.zoom,
      attributionControl: false,
      logoPosition: 'bottom-right',
    })

    map.current.on('load', () => {
      setIsLoaded(true)
      setMapContextValue(map.current)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }

  useEffect(() => {
    loadMap()
  }, [initialViewState, mapContainerRef])

  return (
    <div className="z-[1000]">
      <MapContext.Provider value={{ map: mapContextValue, setCurrentPosition }}>
        {children}
      </MapContext.Provider>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-[1000]">
          <div className="flex gap-2 items-center">
            <Spinner className="size-5" />
            <span className="text-lg font-medium">Loading map...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapProvider
