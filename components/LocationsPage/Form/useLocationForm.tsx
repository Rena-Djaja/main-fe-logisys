'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { locationFormValidationSchema } from '@/validations/LocationValidation'
import { LocationFormInputs } from '@/type/Location'
import { callAPI } from '@/lib/fetchers'
import { CommonApiResponse } from '@/type/Common'
import { LocationAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'

const useLocationForm = () => {
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
        },
        { method: 'POST' }
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

  return {
    form,
    isLoading,
    onSubmit,
  }
}

export default useLocationForm
