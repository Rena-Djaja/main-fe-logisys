'use client'

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl, { MapOptions } from 'mapbox-gl'
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
  const [locationList, setLocationList] = useState<LocationFeature[]>([])
  const [selectedLocations, setSelectedLocations] = useState<LocationFeature[]>(
    []
  )
  const [currentPosition, setCurrentPosition] = useState({
    hasLocation: false,
    latitude: -6.175,
    longitude: 106.8283,
  })

  const loadMap = () => {
    if (!mapContainerRef) return

    const mapConfig: MapOptions = {
      container: mapContainerRef,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 15,
      attributionControl: false,
      logoPosition: 'bottom-right',
    }

    if (selectedLocation) {
      mapConfig.center = [
        selectedLocation.properties.coordinates.longitude,
        selectedLocation.properties.coordinates.latitude,
      ]
    } else {
      mapConfig.center = [currentPosition.longitude, currentPosition.latitude]
    }

    map.current = new mapboxgl.Map(mapConfig)

    map.current.on('load', () => {
      setIsLoaded(true)
      if (selectedLocation) {
        map?.current?.flyTo({
          center: [
            selectedLocation.properties.coordinates.longitude,
            selectedLocation.properties.coordinates.latitude,
          ],
          zoom: 15,
          speed: 4,
          duration: 1000,
          essential: true,
        })
      }
      setMapContextValue(map.current)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }

  const handleResetSelectedLocations = () => {
    setSelectedLocations([])
  }

  useEffect(() => {
    loadMap()
  }, [mapContainerRef, selectedLocation])

  return (
    <div className="z-1">
      <MapContext.Provider
        value={{
          map: mapContextValue,
          isLoaded,
          currentPosition,
          selectedLocation,
          locationList,
          selectedLocations,
          setMapContainerRef,
          setCurrentPosition,
          setSelectedLocations,
          setLocationList,
          setSelectedLocation,
          resetSelectedLocations: handleResetSelectedLocations,
        }}
      >
        {children}
      </MapContext.Provider>
    </div>
  )
}

export default MapProvider
