import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { LocationFeature } from '@/type/Map'

interface MapContextType {
  map: mapboxgl.Map | null
  isLoaded: boolean
  setMapContainerRef: (ref: HTMLDivElement | null) => void
  selectedLocation: LocationFeature | null
  setSelectedLocation: Dispatch<SetStateAction<LocationFeature | null>>
  locationList: LocationFeature[]
  setLocationList: Dispatch<SetStateAction<LocationFeature[]>>
  selectedLocations: LocationFeature[]
  setSelectedLocations: Dispatch<SetStateAction<LocationFeature[]>>
  currentPosition: {
    hasLocation: boolean
    latitude: number
    longitude: number
  }
  setCurrentPosition: (position: {
    hasLocation: boolean
    latitude: number
    longitude: number
  }) => void
  resetSelectedLocations: () => void
}

export const MapContext = createContext<MapContextType | null>(null)

export function useMapContext() {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMap must be used within a MapProvider')
  }
  return context
}
