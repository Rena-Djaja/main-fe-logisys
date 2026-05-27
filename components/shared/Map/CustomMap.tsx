'use client'

import React, { useEffect } from 'react'
import Searchbox from '@/components/shared/Map/Tools/Searchbox/Searchbox'
import { Spinner } from '@/components/shared/ui/spinner'
import UserMarker from '@/components/shared/Map/Tools/Marker/UserMarker'
import Controls from '@/components/shared/Map/Tools/Controls/Controls'
import Style from '@/components/shared/Map/Tools/Style/Style'
import { useMapContext } from '@/components/shared/context/MapContext'
import LocationMarker from '@/components/shared/Map/Tools/Marker/LocationMarker'
import LocationPopup from '@/components/shared/Map/Tools/Popup/LocationPopup'
import { LocationFeature } from '@/type/Map'

interface MapProps {
  mapId: string
  withSearchbox?: boolean
  isLoading?: boolean
  withMarkerClick?: boolean
  onMarkerHover?: (data: LocationFeature) => void
  onMarkerClick?: (data: LocationFeature) => void
  onMarkerRemoveClick?: (data: LocationFeature) => void
  disabledAreas?: string[]
}

const CustomMap = ({
  mapId,
  withSearchbox = true,
  isLoading,
  withMarkerClick = true,
  onMarkerClick,
  onMarkerRemoveClick,
  onMarkerHover,
  disabledAreas,
}: MapProps) => {
  const {
    map,
    isLoaded,
    currentPosition,
    selectedLocation,
    locationList,
    selectedLocations,
    setMapContainerRef,
    setCurrentPosition,
  } = useMapContext()

  const combinedLocations = [...locationList, ...selectedLocations]
  const locations = [
    ...new Map(
      combinedLocations.map((item) => [item.properties.mapbox_id, item])
    ).values(),
  ]

  const locateCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          hasLocation: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })

        map?.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 15,
          speed: 4,
          duration: 1000,
          essential: true,
        })
      })
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  useEffect(() => {
    locateCurrentLocation()
  }, [map])

  return (
    <div className="w-full h-full relative">
      <div
        ref={(ref) => setMapContainerRef(ref)}
        id={mapId}
        className="absolute inset-0 h-full w-full"
      >
        {(!isLoaded || isLoading) && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-100">
            <div className="flex gap-2 items-center">
              <Spinner className="size-5" />
              <span className="text-lg font-medium">Loading map...</span>
            </div>
          </div>
        )}
        <Style />
        {withSearchbox && <Searchbox />}
        <UserMarker {...currentPosition} />
        <Controls />
        {locations.map((location) => (
          <LocationMarker
            key={location.properties.mapbox_id}
            location={location}
            enableClick={withMarkerClick}
            disabledAreas={disabledAreas}
            onHover={(data) => onMarkerHover && onMarkerHover(data)}
            onClick={(data) => onMarkerClick && onMarkerClick(data)}
            onRemoveClick={(data) =>
              onMarkerRemoveClick && onMarkerRemoveClick(data)
            }
          />
        ))}

        {selectedLocation && (
          <LocationPopup
            location={selectedLocation}
            onClose={() => console.log(null)}
          />
        )}
      </div>
    </div>
  )
}

export default CustomMap
