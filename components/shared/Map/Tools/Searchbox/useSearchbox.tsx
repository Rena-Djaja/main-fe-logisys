'use client'

import { useRef, useState } from 'react'
import {
  LocationFeature,
  LocationSuggestion,
  RetrievedLocationProps,
  RetrieveLocationRequest,
  RetrieveLocationResponse,
  SearchLocationRequest,
  SearchLocationResponse,
} from '@/type/Map'
import { callAPI } from '@/lib/fetchers'
import { LocationAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import { useMapContext } from '@/components/shared/context/MapContext'
import { LngLatLike } from 'mapbox-gl'

const useSearchbox = () => {
  const { map } = useMapContext()
  const debounce = useRef(0)
  const [displayValue, setDisplayValue] = useState('')
  const [results, setResults] = useState<LocationSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] =
    useState<LocationFeature | null>(null)
  const [selectedLocations, setSelectedLocations] = useState<LocationFeature[]>(
    []
  )

  if (map) {
    map.on('click', (e) => {
      const coordinates = e.lngLat
      // Start the countdown
      const result: RetrievedLocationProps = {
        properties: {
          name: `${coordinates.lat}, ${coordinates.lng}`,
          feature_type: '',
          mapbox_id: '',
          full_address: '',
          coordinates: {
            longitude: coordinates.lng,
            latitude: coordinates.lat,
          },
        },
      }

      map.flyTo({
        center: [coordinates.lng, coordinates.lat],
        zoom: 15,
        speed: 4,
        duration: 1000,
        essential: true,
      })

      setSelectedLocation(result)
    })
  }

  const handleSearch = (val: string) => {
    setDisplayValue(val)

    if (debounce.current) {
      clearTimeout(debounce.current)
    }
    debounce.current = window.setTimeout(() => {
      onSearch(val)
    }, 700)
  }

  const onSearch = async (val: string) => {
    setIsLoading(true)

    try {
      const req: SearchLocationRequest = {
        q: val,
      }

      const apiRes = await callAPI<
        SearchLocationRequest,
        SearchLocationResponse
      >(LocationAPI.GET_LOCATION_SUGGESTIONS, req, { method: 'GET' })

      const { data: locationSuggestionRes, status } = apiRes

      if (apiStatusChecker(status) && locationSuggestionRes) {
        setResults(locationSuggestionRes.data)
      }
    } catch {
      throw 'Failed to fetch locations'
    } finally {
      setIsOpen(true)
      setIsLoading(false)
    }
  }

  const handleSelect = async (id: string) => {
    try {
      setIsLoading(true)

      const apiRes = await callAPI<
        RetrieveLocationRequest,
        RetrieveLocationResponse
      >(LocationAPI.GET_RETRIEVED_LOCATION, { id }, { method: 'GET' })
      const { data: retrievedLocationRes, status } = apiRes

      if (apiStatusChecker(status) && retrievedLocationRes) {
        const locationData = retrievedLocationRes.data.data
        if (map && locationData?.length > 0) {
          const loc = locationData[0]
          const coordinates = [
            loc.properties.coordinates.longitude,
            loc.properties.coordinates.latitude,
          ]

          map.flyTo({
            center: coordinates as LngLatLike,
            zoom: 15,
            speed: 4,
            duration: 1000,
            essential: true,
          })

          setDisplayValue(loc.properties.name)

          setSelectedLocations((prev) => [...prev, loc])
          setSelectedLocation(loc)

          setResults([])
          setIsOpen(false)
        }
      }
    } catch {
      throw 'Failed to retrieve location'
    } finally {
      setIsLoading(false)
    }
  }

  const clearSearch = () => {
    setDisplayValue('')
    setResults([])
    setIsOpen(false)
    setSelectedLocation(null)
    setSelectedLocations([])
  }

  return {
    isOpen,
    isLoading,
    displayValue,
    results,
    selectedLocations,
    selectedLocation,
    handleSearch,
    clearSearch,
    handleSelect,
    setSelectedLocation,
  }
}

export default useSearchbox
