'use client'

import React, { useRef, useState } from 'react'
import Marker from '@/components/shared/Map/Tools/Marker/Marker'
import { MapPin, MapPinCheck } from 'lucide-react'
import { LocationFeature } from '@/type/Map'
import { useMapContext } from '@/components/shared/context/MapContext'

interface LocationMarkerProps {
  location: LocationFeature
  enableClick: boolean
  onHover?: (data: LocationFeature) => void
  onClick?: (data: LocationFeature) => void
}

const LocationMarker = (props: LocationMarkerProps) => {
  const { location, enableClick, onClick, onHover } = props
  const { selectedLocations, setSelectedLocations } = useMapContext()

  const debounce = useRef(0)
  const [showDetails, setShowDetails] = useState(false)
  const isSelected = selectedLocations.find(
    (each) => each.properties.mapbox_id === location.properties.mapbox_id
  )

  const handleHover = (isHovered: boolean, location: LocationFeature) => {
    if (!isHovered) {
      setShowDetails(false)
    }

    if (debounce.current) {
      clearTimeout(debounce.current)
    }
    debounce.current = window.setTimeout(() => {
      if (isHovered) {
        setShowDetails(true)
        onHover && onHover(location)
      }
    }, 500)
  }

  const handleClick = (location: LocationFeature) => {
    if (enableClick) {
      setSelectedLocations((prev) => {
        const newState = [...prev]
        const existedIdx = newState.findIndex(
          (each) => each.properties.mapbox_id === location.properties.mapbox_id
        )

        if (existedIdx !== -1) {
          newState.splice(existedIdx, 1)
        } else {
          newState.push(location)
        }

        return newState
      })
    }
    onClick && onClick(location)
  }

  return (
    <Marker
      longitude={location.properties.coordinates.longitude}
      latitude={location.properties.coordinates.latitude}
      data={location}
      onHover={({ isHovered, data }) => handleHover(isHovered, data)}
      onClick={({ data }) => handleClick && handleClick(data)}
    >
      <div className="flex items-center justify-center transform transition-all duration-200 drop-shadow-lg cursor-pointer hover:scale-110">
        {isSelected ? (
          <MapPinCheck className="stroke-[2.5px] size-8 text-chart-2 fill-green-200" />
        ) : (
          <MapPin className="stroke-[2.5px] size-8 text-white fill-red-500" />
        )}
        {showDetails && (
          <div className="absolute -top-14">
            <div className="w-[10rem] md:w-[12.5rem] bg-background rounded py-2 px-4">
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-full shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-between gap-1">
                  <span className="font-medium text-[0.85rem] truncate">
                    {location.properties.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Marker>
  )
}

export default LocationMarker
