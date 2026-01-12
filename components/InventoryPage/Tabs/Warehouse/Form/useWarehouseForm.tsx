'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { warehouseValidationSchema } from '@/validations/InventoryValidation'
import { WarehouseFormInputs } from '@/type/Inventory'
import { callAPI } from '@/lib/fetchers'
import { InventoryAPI } from '@/constant/APIUrls'
import { CommonApiResponse } from '@/type/Common'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const useWarehouseForm = () => {
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

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    push('/dashboard/inventory')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: WarehouseFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      const method = 'POST'
      const apiRes = await callAPI<WarehouseFormInputs, CommonApiResponse>(
        InventoryAPI.POST_WAREHOUSE,
        data,
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

  return {
    form,
    isLoading,
    onSubmit,
  }
}

export default useWarehouseForm
