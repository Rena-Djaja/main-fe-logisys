'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { supplierFormValidationSchema } from '@/validations/SupplierValidation'
import { callAPI } from '@/lib/fetchers'
import { SupplierAPI } from '@/constant/APIUrls'
import { SupplierFormInputs } from '@/type/Supplier'
import { CommonApiResponse } from '@/type/Common'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const useSupplierForm = () => {
  const form = useForm<SupplierFormInputs>({
    resolver: zodResolver(supplierFormValidationSchema),
    defaultValues: {
      name: '',
      location: '',
      phone_number: null,
    },
  })

  const { push } = useRouter()

  const [isLoading, setIsLoading] = useState({
    form: false,
    submit: false,
  })

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    push('/dashboard/suppliers')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: SupplierFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      const apiRes = await callAPI<SupplierFormInputs, CommonApiResponse>(
        SupplierAPI.POST_SUPPLIER,
        {
          ...data,
          phone_number: data.phone_number || null,
        },
        { method: 'POST' }
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

  return {
    form,
    isLoading,
    onSubmit,
  }
}

export default useSupplierForm
