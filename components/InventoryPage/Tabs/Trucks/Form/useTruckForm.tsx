'use client'

import { useState } from 'react'
import { CommonApiResponse, CommonFormProps } from '@/type/Common'
import { useForm } from 'react-hook-form'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { InventoryAPI, UserAPI } from '@/constant/APIUrls'
import { UserListRequest, UserListResponse } from '@/type/User'
import { zodResolver } from '@hookform/resolvers/zod'
import { truckValidationSchema } from '@/validations/InventoryValidation'
import { PostTruckRequest, TruckFormInputs } from '@/type/Inventory'
import { callAPI } from '@/lib/fetchers'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { apiStatusChecker } from '@/lib/utils'

const useTruckForm = ({ id }: CommonFormProps) => {
  console.log(id)
  const { push } = useRouter()
  const form = useForm<TruckFormInputs>({
    resolver: zodResolver(truckValidationSchema),
    mode: 'onSubmit',
    defaultValues: {
      plate_number: '',
      salesman_id: '',
    },
  })

  const [filter] = useState<UserListRequest>({
    page: 1,
    per_page: 100,
    search: '',
    role_id: 3,
  })

  const { data: salesmanList, isValidating } = useCommonApi<
    UserListRequest,
    UserListResponse
  >(UserAPI.GET_USER_LIST, filter, { method: 'GET' })

  const [isLoading, setIsLoading] = useState({
    form: false,
    submit: false,
  })

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    push('/dashboard/inventory?tab=truck')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: TruckFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      const method = 'POST'
      const req: PostTruckRequest = {
        plate_number: data.plate_number.toUpperCase(),
        salesman_id: Number(data.salesman_id),
      }

      const apiRes = await callAPI<PostTruckRequest, CommonApiResponse>(
        InventoryAPI.POST_TRUCK,
        req,
        { method }
      )

      const { status, data: postTruckData } = apiRes

      if (apiStatusChecker(status) && postTruckData) {
        handleSuccess(postTruckData)
      } else {
        handleFailure(postTruckData)
      }
    } catch {
      handleFailure()
      throw 'Failed to submit truck'
    } finally {
      setIsLoading((prev) => ({ ...prev, submit: false }))
    }
  }

  return {
    form,
    isLoading,
    salesmanList,
    isValidating,
    onSubmit,
  }
}

export default useTruckForm
