'use client'

import React from 'react'
import Marker from '@/components/shared/Map/Tools/Marker/Marker'

interface UserMarkerProps {
  hasLocation: boolean
  latitude: number
  longitude: number
}

const UserMarker = (props: UserMarkerProps) => {
  const { hasLocation, latitude, longitude } = props

  if (!hasLocation) return null

  return (
    <Marker longitude={longitude} latitude={latitude} data={location}>
      <div className="transform transition-all duration-200 bg-blue-400 text-white shadow-lg cursor-pointer stroke-[2.5px] size-3.5 rounded-full outline-[0.4rem] outline-blue-400/30 border-[0.107rem] border-black" />
    </Marker>
  )
}

export default UserMarker
