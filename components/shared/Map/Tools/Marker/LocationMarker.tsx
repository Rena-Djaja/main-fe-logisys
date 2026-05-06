'use client'

import React from 'react'
import Marker from '@/components/shared/Map/Tools/Marker/Marker'
import { MapPin } from 'lucide-react'
import { LocationFeature } from '@/type/Map'

interface LocationMarkerProps {
  location: LocationFeature
  onHover: (data: LocationFeature) => void
}

const LocationMarker = (props: LocationMarkerProps) => {
  const { location, onHover } = props

  return (
    <Marker
      longitude={location.properties.coordinates.longitude}
      latitude={location.properties.coordinates.latitude}
      data={location}
      onHover={({ data }) => onHover(data)}
    >
      <div className="rounded-full flex items-center justify-center transform transition-all duration-200 bg-rose-500 text-white shadow-lg size-8 cursor-pointer hover:scale-110">
        <MapPin className="stroke-[2.5px] size-4.5" />
      </div>
    </Marker>
  )
}

export default LocationMarker
