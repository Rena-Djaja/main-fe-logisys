'use client'

import React, { useCallback, useEffect, useMemo } from 'react'
import { useMapContext } from '@/components/shared/context/MapContext'
import mapboxgl from 'mapbox-gl'
import { createPortal } from 'react-dom'

type PopupProps = {
  children: React.ReactNode
  latitude?: number
  longitude?: number
  onClose?: () => void
  marker?: mapboxgl.Marker
} & mapboxgl.PopupOptions

const PopupWrapper = (props: PopupProps) => {
  const { latitude, longitude, children, marker, onClose, className } = props
  const { map } = useMapContext()

  const container = useMemo(() => {
    return document.createElement('div')
  }, [])

  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  useEffect(() => {
    if (!map) return

    const popupOptions: mapboxgl.PopupOptions = {
      ...props,
      className: `mapboxgl-custom-popup ${className ?? ''}`,
    }

    const popup = new mapboxgl.Popup(popupOptions)
      .setDOMContent(container)
      .setMaxWidth('none')

    popup.on('close', handleClose)

    if (marker) {
      const currentPopup = marker.getPopup()
      if (currentPopup) {
        currentPopup.remove()
      }

      marker.setPopup(popup)

      marker.togglePopup()
    } else if (latitude !== undefined && longitude !== undefined) {
      popup.setLngLat([longitude, latitude]).addTo(map)
    }

    return () => {
      popup.off('close', handleClose)
      popup.remove()

      if (marker && marker.getPopup()) {
        marker.setPopup(null)
      }
    }
  }, [
    map,
    marker,
    latitude,
    longitude,
    props,
    className,
    container,
    handleClose,
  ])

  return createPortal(children, container)
}

export default PopupWrapper
