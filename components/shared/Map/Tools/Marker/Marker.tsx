'use client'

import React, { useEffect, useRef } from 'react'
import mapboxgl, { MarkerOptions } from 'mapbox-gl'
import { useMapContext } from '@/components/shared/context/MapContext'
import { LocationFeature } from '@/type/Map'

type Props = {
  longitude: number
  latitude: number
  data: any
  onHover?: ({
    isHovered,
    position,
    marker,
    data,
  }: {
    isHovered: boolean
    position: { longitude: number; latitude: number }
    marker: mapboxgl.Marker
    data: LocationFeature
  }) => void
  onClick?: ({
    position,
    marker,
    data,
  }: {
    position: { longitude: number; latitude: number }
    marker: mapboxgl.Marker
    data: LocationFeature
  }) => void
  children?: React.ReactNode
} & MarkerOptions

const Marker = (props: Props) => {
  const { onHover, onClick, latitude, longitude, data, children } = props
  const { map } = useMapContext()
  const markerRef = useRef<HTMLDivElement | null>(null)
  const markerInstanceRef = useRef<mapboxgl.Marker | null>(null)

  const handleHover = (isHovered: boolean) => {
    if (onHover && markerInstanceRef.current) {
      onHover({
        isHovered,
        position: { longitude, latitude },
        marker: markerInstanceRef.current,
        data,
      })
    }
  }

  const handleClick = () => {
    if (onClick && markerInstanceRef.current) {
      onClick({
        position: { longitude, latitude },
        marker: markerInstanceRef.current,
        data,
      })
    }
  }

  useEffect(() => {
    const markerEl = markerRef.current
    if (!map || !markerEl) return

    const handleMouseEnter = () => handleHover(true)
    const handleMouseLeave = () => handleHover(false)

    // Add event listeners
    markerEl.addEventListener('mouseenter', handleMouseEnter)
    markerEl.addEventListener('mouseleave', handleMouseLeave)
    markerEl.addEventListener('click', handleClick)

    // Marker options
    const options = {
      element: markerEl,
      ...props,
    }

    // @ts-ignore
    markerInstanceRef.current = new mapboxgl.Marker(options)
      .setLngLat([longitude, latitude])
      .addTo(map)

    return () => {
      // Cleanup on unmount
      if (markerInstanceRef.current) markerInstanceRef.current.remove()
      if (markerEl) {
        markerEl.removeEventListener('mouseenter', handleMouseEnter)
        markerEl.removeEventListener('mouseleave', handleMouseLeave)
        markerEl.removeEventListener('click', handleClick)
      }
    }
  }, [map, longitude, latitude, props])

  return (
    <div>
      <div ref={markerRef}>{children}</div>
    </div>
  )
}

export default Marker
