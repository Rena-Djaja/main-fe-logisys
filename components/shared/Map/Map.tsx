'use client'

import React, { useRef } from 'react'
import MapProvider from '@/components/shared/MapProvider/MapProvider'

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="w-screen h-screen">
      <div
        id="map-container"
        ref={mapContainerRef}
        className="absolute inset-0 h-full w-full"
      >
        <MapProvider
          mapContainerRef={mapContainerRef}
          initialViewState={{
            longitude: -122.4194,
            latitude: 37.7749,
            zoom: 10,
          }}
        >
          <></>
        </MapProvider>
      </div>
    </div>
  )
}

export default Map
