'use client'

import { useEffect, useState } from 'react'
import { CommonDetailsComponentProps } from '@/type/Common'
import { toast } from 'sonner'
import { callAPI } from '@/lib/fetchers'
import { SavedLocationAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import {
  SavedLocationDetailsRequest,
  SavedLocationDetailsResponse,
  SavedLocationProps,
} from '@/type/SavedLocation'
import { useMapContext } from '@/components/shared/context/MapContext'
import { LocationFeature } from '@/type/Map'

const useSavedLocationDetails = (props: CommonDetailsComponentProps) => {
  const {
    detailsState: { id, isOpen },
    handleDetails,
  } = props
  const { setSelectedLocation } = useMapContext()

  const [locationDetails, setLocationDetails] = useState<
    SavedLocationProps | undefined
  >()
  const [isLoading, setIsLoading] = useState(false)

  const handleSuccess = (response: SavedLocationDetailsResponse) => {
    const { data } = response
    setLocationDetails(data)

    const location: LocationFeature = {
      properties: {
        name: data.name,
        full_address: data.address,
        mapbox_id: data.id,
        feature_type: data.address_type,
        coordinates: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
      },
    }
    setSelectedLocation(location)
  }

  const handleFailure = (response?: SavedLocationDetailsResponse) => {
    setTimeout(() => {
      toast.error(response?.error)
      handleDetails('close')
    }, 300)
  }

  const fetchDetails = async () => {
    setIsLoading(true)

    try {
      const apiRes = await callAPI<
        SavedLocationDetailsRequest,
        SavedLocationDetailsResponse
      >(
        SavedLocationAPI.GET_SAVED_LOCATION_DETAILS,
        { location_id: id },
        { method: 'GET' }
      )

      const { data: userDetailsData, status } = apiRes

      if (apiStatusChecker(status) && userDetailsData) {
        handleSuccess(userDetailsData)
      } else {
        handleFailure(userDetailsData)
      }
    } catch {
      handleFailure()
      throw 'Failed to fetch details'
    } finally {
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  useEffect(() => {
    if (isOpen && !!id) {
      fetchDetails()
    }
  }, [id, isOpen])

  return {
    locationDetails,
    isLoading,
  }
}

export default useSavedLocationDetails
