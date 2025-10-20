'use client'

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { locationFormValidationSchema } from '@/validations/LocationValidation'
import {
  LocationDetailsRequest,
  LocationDetailsResponse,
  LocationFormInputs,
} from '@/type/Location'
import { callAPI } from '@/lib/fetchers'
import { CommonApiResponse, CommonFormProps } from '@/type/Common'
import { LocationAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'

const useLocationForm = ({ id }: CommonFormProps) => {
  const form = useForm<LocationFormInputs>({
    resolver: zodResolver(locationFormValidationSchema),
    defaultValues: {
      name: '',
    },
  })

  const { push } = useRouter()

  const [isLoading, setIsLoading] = useState({
    form: false,
    submit: false,
  })

  const handleSuccessFetchDetails = (response: LocationDetailsResponse) => {
    const { data } = response

    ;['name'].forEach((each) => {
      form.setValue(
        each as keyof LocationFormInputs,
        data[each as keyof LocationFormInputs]
      )
    })
  }

  const handleFailureFetchDetails = (response?: LocationDetailsResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later'
    )
    push('/dashboard/locations')
  }

  const fetchDetails = async () => {
    setIsLoading((prev) => ({ ...prev, form: true }))

    try {
      const apiRes = await callAPI<
        LocationDetailsRequest,
        LocationDetailsResponse
      >(LocationAPI.GET_LOCATION_DETAILS, { id: Number(id) }, { method: 'GET' })

      const { data: locationDetailsRes, status } = apiRes

      if (apiStatusChecker(status) && locationDetailsRes) {
        handleSuccessFetchDetails(locationDetailsRes)
      } else {
        handleFailureFetchDetails(locationDetailsRes)
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
    push('/dashboard/locations')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: LocationFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      const apiRes = await callAPI<LocationFormInputs, CommonApiResponse>(
        LocationAPI.POST_LOCATION,
        {
          ...data,
          ...(id && { id: Number(id) }),
        },
        { method: id ? 'PUT' : 'POST' }
      )

      const { data: postLocationRes, status } = apiRes

      if (apiStatusChecker(status) && postLocationRes) {
        handleSuccess(postLocationRes)
      } else {
        handleFailure(postLocationRes)
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
    onSubmit,
  }
}

export default useLocationForm
