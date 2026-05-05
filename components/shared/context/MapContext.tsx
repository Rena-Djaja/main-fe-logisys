import { createContext, useContext } from 'react'

interface MapContextType {
  map: mapboxgl.Map | null
}

export const MapContext = createContext<MapContextType | null>(null)

export function useMapContext() {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMap must be used within a MapProvider')
  }
  return context
}
