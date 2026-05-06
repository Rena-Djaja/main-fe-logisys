'use client'

import { useRef, useState } from 'react'
import {
  LocationSuggestion,
  SearchLocationRequest,
  SearchLocationResponse,
} from '@/type/Map'
import { callAPI } from '@/lib/fetchers'
import { LocationAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'

const useSearchbox = () => {
  const debounce = useRef(0)
  const [displayValue, setDisplayValue] = useState('')
  const [results, setResults] = useState<LocationSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // const [selectedLocation, setSelectedLocation] = useState<LocationFeature | null>(null);
  // const [selectedLocations, setSelectedLocations] = useState<LocationFeature[]>([]);

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

  // Handle location selection
  // const handleSelect = async (suggestion: LocationSuggestion) => {
  //   try {
  //     setIsSearching(true);
  //
  //     const res = await fetch(
  //       `https://api.mapbox.com/search/searchbox/v1/retrieve/${suggestion.mapbox_id}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_TOKEN}`
  //     );
  //
  //     const data = await res.json();
  //     const featuresData = data?.features;
  //
  //     if (map && featuresData?.length > 0) {
  //       const coordinates = featuresData[0]?.geometry?.coordinates;
  //
  //       map.flyTo({
  //         center: coordinates,
  //         zoom: 14,
  //         speed: 4,
  //         duration: 1000,
  //         essential: true,
  //       });
  //
  //       setDisplayValue(suggestion.name);
  //
  //       setSelectedLocations(featuresData);
  //       setSelectedLocation(featuresData[0]);
  //
  //       setResults([]);
  //       setIsOpen(false);
  //     }
  //   } catch (err) {
  //     console.error("Retrieve error:", err);
  //   } finally {
  //     setIsSearching(false);
  //   }
  // };

  const clearSearch = () => {
    setDisplayValue('')
    setResults([])
    setIsOpen(false)
    // setSelectedLocation(null);
    // setSelectedLocations([]);
  }

  return {
    isOpen,
    isLoading,
    displayValue,
    results,
    handleSearch,
    clearSearch,
  }
}

export default useSearchbox
