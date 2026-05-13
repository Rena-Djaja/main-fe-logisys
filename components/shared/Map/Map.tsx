'use client'

import React, { useEffect, useRef, useState } from 'react'
import MapProvider from '@/components/shared/MapProvider/MapProvider'
import Searchbox from '@/components/shared/Map/Tools/Searchbox/Searchbox'
import { Spinner } from '@/components/shared/ui/spinner'
import UserMarker from '@/components/shared/Map/Tools/Marker/UserMarker'
import Controls from '@/components/shared/Map/Tools/Controls/Controls'
import Style from '@/components/shared/Map/Tools/Style/Style'

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currPosition, setCurrPosition] = useState({
    hasLocation: false,
    latitude: -6.175,
    longitude: 106.8283,
  })

  const locateCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrPosition({
          hasLocation: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
    } else {
      console.error('Geolocation is not supported by this browser.')
    }

    setTimeout(() => {
      setIsLoaded(true)
    }, 500)
  }

  useEffect(() => {
    locateCurrentLocation()
  }, [])

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-[1000]">
        <div className="flex gap-2 items-center">
          <Spinner className="size-5" />
          <span className="text-lg font-medium">Loading map...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <div
        id="map-container"
        ref={mapContainerRef}
        className="absolute inset-0 h-full w-full"
      >
        <MapProvider
          mapContainerRef={mapContainerRef}
          initialViewState={{
            longitude: currPosition.longitude,
            latitude: currPosition.latitude,
            zoom: 15,
          }}
          setCurrentPosition={setCurrPosition}
        >
          <Style />
          <Searchbox />
          <UserMarker {...currPosition} />
          <Controls />
        </MapProvider>
      </div>
    </div>
  )
}

export default Map
