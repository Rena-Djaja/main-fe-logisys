'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { savedLocationSchema } from '@/validations/SavedLocationValidation'
import { useMapContext } from '@/components/shared/context/MapContext'
import { LocationFeature } from '@/type/Map'
import { callAPI } from '@/lib/fetchers'
import { LocationAPI } from '@/constant/APIUrls'
import {
  GetLocationByLatLngRequest,
  GetLocationByLatLngResponse,
  LocationByLatLngRowProps,
} from '@/type/Location'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'

const useSavedLocationForm = () => {
  const { map, currentPosition, setLocationList } = useMapContext()
  const form = useForm({
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
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] =
    useState<LocationByLatLngRowProps>()
  const [selectedLatLong, setSelectedLatLong] = useState<{
    latitude: number
    longitude: number
  }>()
  const [isLoading] = useState({
    form: false,
    submit: false,
  })

  console.log(selectedLatLong)

  const handleMapOpen = () => {
    setIsMapOpen((prev) => !prev)
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
      const mustUpdateKey = [
        'province_id',
        'regency_id',
        'district_id',
        'village_id',
      ]
      setSelectedLocation(locationRes.data)
      setSelectedLatLong({
        latitude: location.properties.coordinates.latitude,
        longitude: location.properties.coordinates.longitude,
      })
      mustUpdateKey.forEach((key) => {
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

  const onSubmit = async (data: any) => {
    console.log(data)
  }

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
