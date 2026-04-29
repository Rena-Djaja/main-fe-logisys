'use client'

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { warehouseValidationSchema } from '@/validations/InventoryValidation'
import {
  PostWarehouseRequest,
  WarehouseDetailsResponse,
  WarehouseFormInputs,
} from '@/type/Inventory'
import { callAPI } from '@/lib/fetchers'
import { InventoryAPI } from '@/constant/APIUrls'
import {
  CommonApiResponse,
  CommonDetailsRequest,
  CommonFormProps,
} from '@/type/Common'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const useWarehouseForm = ({ id }: CommonFormProps) => {
  const { push } = useRouter()

  const form = useForm<WarehouseFormInputs>({
    resolver: zodResolver(warehouseValidationSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      location: '',
    },
  })

  const [isLoading, setIsLoading] = useState({
    form: false,
    submit: false,
  })

  const handleSuccessFetchDetails = (response: WarehouseDetailsResponse) => {
    const { data } = response

    ;['name', 'location'].forEach((each) => {
      form.setValue(
        each as keyof WarehouseFormInputs,
        data[each as keyof WarehouseFormInputs]
      )
    })
  }

  const handleFailureFetchDetails = (response?: WarehouseDetailsResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later'
    )
    push('/dashboard/inventory')
  }

  const fetchDetails = async () => {
    setIsLoading((prev) => ({ ...prev, form: true }))

    try {
      const apiRes = await callAPI<
        CommonDetailsRequest,
        WarehouseDetailsResponse
      >(
        InventoryAPI.GET_WAREHOUSE_DETAILS,
        { id: Number(id) },
        { method: 'GET' }
      )

      const { data: warehouseDetailsRes, status } = apiRes

      if (apiStatusChecker(status) && warehouseDetailsRes) {
        handleSuccessFetchDetails(warehouseDetailsRes)
      } else {
        handleFailureFetchDetails(warehouseDetailsRes)
      }
    } catch {
      handleFailureFetchDetails()
      throw 'Failed to fetch warehouse details'
    } finally {
      setIsLoading((prev) => ({ ...prev, form: false }))
    }
  }

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    push('/dashboard/inventory')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
    )
  }

  const onSubmit = async (data: WarehouseFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      const method = id ? 'PUT' : 'POST'
      const req: PostWarehouseRequest = {
        ...(id && { id: Number(id) }),
        ...data,
      }

      const apiRes = await callAPI<PostWarehouseRequest, CommonApiResponse>(
        InventoryAPI.POST_WAREHOUSE,
        req,
        { method }
      )

      const { status, data: postWarehouseData } = apiRes

      if (apiStatusChecker(status) && postWarehouseData) {
        handleSuccess(postWarehouseData)
      } else {
        handleFailure(postWarehouseData)
      }
    } catch {
      handleFailure()
      throw 'Failed to submit warehouse'
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

export default useWarehouseForm
