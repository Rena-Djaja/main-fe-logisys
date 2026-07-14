'use client'

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { supplierFormValidationSchema } from '@/validations/SupplierValidation'
import { callAPI } from '@/lib/fetchers'
import { LocationAPI, SupplierAPI } from '@/constant/APIUrls'
import {
  SupplierDetailsRequest,
  SupplierDetailsResponse,
  SupplierFormInputs,
} from '@/type/Supplier'
import { CommonApiResponse, CommonFormProps } from '@/type/Common'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useMapContext } from '@/components/shared/context/MapContext'
import { LocationFeature } from '@/type/Map'
import {
  GetLocationByLatLngRequest,
  GetLocationByLatLngResponse,
  LocationByLatLngRowProps,
} from '@/type/Location'

const locationFormKey = [
  'province_id',
  'regency_id',
  'district_id',
  'village_id',
]

const useSupplierForm = (props: CommonFormProps) => {
  const { id } = props
  const {
    selectedLocation: locDetails,
    setSelectedLocations,
    setIsSelectButtonLoading,
  } = useMapContext()
  const [selectedLocation, setSelectedLocation] =
    useState<LocationByLatLngRowProps>()
  const form = useForm<SupplierFormInputs>({
    resolver: zodResolver(supplierFormValidationSchema),
    defaultValues: {
      name: '',
      address: '',
      phone_number: '',
      province_id: '',
      regency_id: '',
      district_id: '',
      village_id: '',
      latitude: 0,
      longitude: 0,
    },
  })

  const { push } = useRouter()

  const [isLoading, setIsLoading] = useState({
    form: false,
    submit: false,
  })

  const handleSelectLocation = async (location: LocationFeature) => {
    setIsSelectButtonLoading(true)

    try {
      const req: GetLocationByLatLngRequest = {
        lat: location.properties.coordinates.latitude,
        long: location.properties.coordinates.longitude,
      }
      const { data: locationRes, status } = await callAPI<
        GetLocationByLatLngRequest,
        GetLocationByLatLngResponse
      >(LocationAPI.GET_LOCATION_BY_LAT_LNG, req, { method: 'GET' })

      if (apiStatusChecker(status) && locationRes) {
        setSelectedLocations([locDetails as LocationFeature])
        setSelectedLocation(locationRes.data)
        form.setValue('address', locDetails?.properties.full_address || '')
        form.setValue(
          'latitude',
          Number(locDetails?.properties.coordinates.latitude)
        )
        form.setValue(
          'longitude',
          Number(locDetails?.properties.coordinates.longitude)
        )

        locationFormKey.forEach((key) => {
          // @ts-ignore
          form.clearErrors(key)
          form.setValue(
            // @ts-ignore
            key,
            locationRes.data[key as keyof LocationByLatLngRowProps]
          )
        })
      } else {
        toast.error(
          locationRes?.error ||
            'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
        )
      }
    } catch {
      toast.error('Terjadi kesalahan. Mohon coba beberapa saat lagi.')
    } finally {
      setIsSelectButtonLoading(false)
    }
  }

  const handleSuccessFetchDetails = (response: SupplierDetailsResponse) => {
    const fieldsToUpdate = ['name', 'address', 'phone_number'] as const
    type SelectedFields = (typeof fieldsToUpdate)[number]
    const { data }: { data: Record<SelectedFields, string> } = response

    fieldsToUpdate.forEach((each) => {
      form.setValue(each, data[each] || '')
    })
  }

  const handleFailureFetchDetails = (response?: SupplierDetailsResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later'
    )
    push('/dashboard/suppliers')
  }

  const fetchDetails = async () => {
    setIsLoading((prev) => ({ ...prev, form: true }))

    try {
      const apiRes = await callAPI<
        SupplierDetailsRequest,
        SupplierDetailsResponse
      >(
        SupplierAPI.GET_SUPPLIER_DETAILS,
        { supplier_id: String(id) },
        { method: 'GET' }
      )

      const { data: supplierDetailsData, status } = apiRes

      if (apiStatusChecker(status) && supplierDetailsData) {
        handleSuccessFetchDetails(supplierDetailsData)
      } else {
        handleFailureFetchDetails(supplierDetailsData)
      }
    } catch {
      handleFailureFetchDetails()
      throw 'Failed to fetch supplier details'
    } finally {
      setIsLoading((prev) => ({ ...prev, form: false }))
    }
  }

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    push('/dashboard/suppliers')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
    )
  }

  const onSubmit = async (data: SupplierFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      const apiRes = await callAPI<SupplierFormInputs, CommonApiResponse>(
        SupplierAPI.POST_SUPPLIER,
        {
          ...data,
          ...(id && { id: Number(id) }),
          phone_number: data.phone_number || null,
        },
        { method: id ? 'PUT' : 'POST' }
      )

      const { data: postSupplierRes, status } = apiRes

      if (apiStatusChecker(status) && postSupplierRes) {
        handleSuccess(postSupplierRes)
      } else {
        handleFailure(postSupplierRes)
      }
    } catch (err) {
      handleFailure()
      throw err
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
    isLoading,
    selectedLocation,
    onSubmit,
    handleSelectLocation,
  }
}

export default useSupplierForm
