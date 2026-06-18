'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { savedLocationSchema } from '@/validations/SavedLocationValidation'
import { useMapContext } from '@/components/shared/context/MapContext'
import { LocationFeature } from '@/type/Map'
import { callAPI } from '@/lib/fetchers'
import { LocationAPI, SavedLocationAPI } from '@/constant/APIUrls'
import {
  GetLocationByLatLngRequest,
  GetLocationByLatLngResponse,
  LocationByLatLngRowProps,
} from '@/type/Location'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import {
  SavedLocationDetailsRequest,
  SavedLocationDetailsResponse,
  SavedLocationFormInputs,
  SavedLocationRequest,
} from '@/type/SavedLocation'
import { CommonApiResponse, CommonFormProps } from '@/type/Common'
import { useRouter } from 'next/navigation'

const useSavedLocationForm = ({ id }: CommonFormProps) => {
  const { push } = useRouter()
  const { map, currentPosition, setLocationList } = useMapContext()
  const form = useForm<SavedLocationFormInputs>({
    resolver: zodResolver(savedLocationSchema),
    defaultValues: {
      name: '',
      address: '',
      address_type: '',
      province_id: '',
      regency_id: '',
      district_id: '',
      village_id: '',
      lat_long: '',
    },
  })

  const locationFormKey = [
    'province_id',
    'regency_id',
    'district_id',
    'village_id',
  ]

  const [isMapOpen, setIsMapOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] =
    useState<LocationByLatLngRowProps>()
  const [selectedLatLong, setSelectedLatLong] = useState<{
    latitude: number
    longitude: number
  }>()
  const [isLoading, setIsLoading] = useState({
    form: false,
    submit: false,
  })

  const handleMapOpen = () => {
    setIsMapOpen((prev) => !prev)
  }

  const handleSuccessFetchDetails = (
    response: SavedLocationDetailsResponse
  ) => {
    const { data } = response

    ;[
      'name',
      'address',
      'address_type',
      'village_id',
      'district_id',
      'regency_id',
      'province_id',
    ].forEach((each) => {
      form.setValue(
        each as keyof SavedLocationFormInputs,
        // @ts-ignore
        String(data[each])
      )
    })

    setSelectedLatLong({ latitude: data.latitude, longitude: data.longitude })
    setSelectedLocation({
      village_id: data.village_id,
      village_name: data.village_name,
      district_id: data.district_id,
      district_name: data.district_name,
      regency_id: data.regency_id,
      regency_name: data.regency_name,
      province_id: data.province_id,
      province_name: data.province_name,
      distance_meters: 0,
    })
  }

  const handleFailureFetchDetails = (
    response?: SavedLocationDetailsResponse
  ) => {
    toast.error(
      response?.message || 'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
    )
    push('/dashboard/saved-location')
  }

  const fetchDetails = async () => {
    setIsLoading((prev) => ({ ...prev, form: true }))

    try {
      const apiRes = await callAPI<
        SavedLocationDetailsRequest,
        SavedLocationDetailsResponse
      >(
        SavedLocationAPI.GET_SAVED_LOCATION_DETAILS,
        { location_id: String(id) },
        { method: 'GET' }
      )

      const { data: savedLocationDetailsData, status } = apiRes

      if (apiStatusChecker(status) && savedLocationDetailsData) {
        handleSuccessFetchDetails(savedLocationDetailsData)
      } else {
        handleFailureFetchDetails(savedLocationDetailsData)
      }
    } catch {
      handleFailureFetchDetails()
      throw 'Failed to fetch user details'
    } finally {
      setIsLoading((prev) => ({ ...prev, form: false }))
    }
  }

  const handleSelectCurrentLocation = () => {
    form.setValue(
      'lat_long',
      `${currentPosition.latitude}, ${currentPosition.longitude}`
    )
  }

  const handleSearchLocation = () => {
    form.clearErrors('lat_long')
    if (!map) return
    try {
      const latLongValue = form.getValues('lat_long')
      if (latLongValue) {
        const [latVal, longVal] = latLongValue.split(',')
        if (Number.isNaN(Number(latVal)) || Number.isNaN(Number(longVal))) {
          form.setError('lat_long', {
            type: 'manual',
            message: 'Tautan tidak valid',
          })

          return
        }
        const [latitude, longitude] = [
          Number(latVal.trim()),
          Number(longVal.trim()),
        ]
        const location: LocationFeature = {
          properties: {
            name: 'Lokasi Terpilih',
            mapbox_id: 'selected_location',
            feature_type: '',
            full_address: '',
            coordinates: {
              latitude,
              longitude,
            },
          },
        }
        setLocationList([location])
        map.flyTo({
          center: [longitude, latitude],
          zoom: 15,
          speed: 4,
          duration: 1000,
          essential: true,
        })
      }
    } catch {
      form.setError('lat_long', {
        type: 'manual',
        message: 'Tautan tidak valid',
      })
    }
  }

  const handleConfirmLocation = async (location: LocationFeature) => {
    const req: GetLocationByLatLngRequest = {
      lat: location.properties.coordinates.latitude,
      long: location.properties.coordinates.longitude,
    }
    const { data: locationRes, status } = await callAPI<
      GetLocationByLatLngRequest,
      GetLocationByLatLngResponse
    >(LocationAPI.GET_LOCATION_BY_LAT_LNG, req, { method: 'GET' })

    if (apiStatusChecker(status) && locationRes) {
      setSelectedLocation(locationRes.data)
      setSelectedLatLong({
        latitude: location.properties.coordinates.latitude,
        longitude: location.properties.coordinates.longitude,
      })
      locationFormKey.forEach((key) => {
        // @ts-ignore
        form.clearErrors(key)
        form.setValue(
          // @ts-ignore
          key,
          locationRes.data[key as keyof LocationByLatLngRowProps]
        )
      })

      handleMapOpen()
      toast.success(
        `Lokasi berhasil ditemukan. Silahkan lengkapi detail lokasi.`
      )
    } else {
      toast.error(
        locationRes?.error ||
          'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
      )
    }
  }

  const handleSuccess = (response: CommonApiResponse) => {
    const { message } = response
    toast.success(message)
    push('/dashboard/saved-location')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
    )
  }

  const onSubmit = async (data: SavedLocationFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))
    try {
      const req: SavedLocationRequest = {
        ...(id && { id }),
        name: data.name,
        village_id: data.village_id,
        address: data.address,
        address_type: data.address_type.toLowerCase(),
        latitude: Number(selectedLatLong?.latitude),
        longitude: Number(selectedLatLong?.longitude),
      }

      const apiRes = await callAPI<SavedLocationRequest, CommonApiResponse>(
        SavedLocationAPI.POST_SAVE_LOCATION,
        req,
        { method: id ? 'PUT' : 'POST' }
      )

      const { data: saveLocationRes, status } = apiRes
      if (apiStatusChecker(status) && saveLocationRes) {
        handleSuccess(saveLocationRes)
      } else {
        handleFailure(saveLocationRes)
      }
    } catch {
      handleFailure()
      throw 'Failed to save location'
    } finally {
      setIsLoading((prev) => ({ ...prev, submit: false }))
    }
  }

  useEffect(() => {
    if (id) {
      fetchDetails()
    }
  }, [id])

  return {
    form,
    currentPosition,
    isLoading,
    isMapOpen,
    selectedLocation,
    handleMapOpen,
    handleSelectCurrentLocation,
    handleSearchLocation,
    handleConfirmLocation,
    onSubmit,
  }
}

export default useSavedLocationForm
