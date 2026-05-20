'use client'

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapContext } from '@/components/shared/context/MapContext'
import { LocationFeature } from '@/type/Map'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

type MapComponentProps = {
  children?: React.ReactNode
}

const MapProvider = ({ children }: MapComponentProps) => {
  const map = useRef<mapboxgl.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mapContainerRef, setMapContainerRef] =
    useState<HTMLDivElement | null>()
  const [mapContextValue, setMapContextValue] = useState<mapboxgl.Map | null>(
    null
  )
  const [selectedLocation, setSelectedLocation] =
    useState<LocationFeature | null>(null)
  const [selectedLocations, setSelectedLocations] = useState<LocationFeature[]>(
    []
  )
  const [currentPosition, setCurrentPosition] = useState({
    hasLocation: false,
    latitude: -6.175,
    longitude: 106.8283,
  })

  const loadMap = () => {
    console.log(map)
    if (!mapContainerRef) return

    map.current = new mapboxgl.Map({
      container: mapContainerRef,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [currentPosition.longitude, currentPosition.latitude],
      zoom: 15,
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
  }, [mapContainerRef])

  return (
    <div className="z-1000">
      <MapContext.Provider
        value={{
          map: mapContextValue,
          isLoaded,
          currentPosition,
          setMapContainerRef,
          setCurrentPosition,
          selectedLocation,
          selectedLocations,
          setSelectedLocations,
          setSelectedLocation,
        }}
      >
        {children}
      </MapContext.Provider>
    </div>
  )
}

export default MapProvider
