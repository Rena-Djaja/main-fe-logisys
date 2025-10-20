'use client'

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { supplierFormValidationSchema } from '@/validations/SupplierValidation'
import { callAPI } from '@/lib/fetchers'
import { SupplierAPI } from '@/constant/APIUrls'
import {
  SupplierDetailsRequest,
  SupplierDetailsResponse,
  SupplierFormInputs,
} from '@/type/Supplier'
import { CommonApiResponse, CommonFormProps } from '@/type/Common'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const useSupplierForm = (props: CommonFormProps) => {
  const { id } = props
  const form = useForm<SupplierFormInputs>({
    resolver: zodResolver(supplierFormValidationSchema),
    defaultValues: {
      name: '',
      location: '',
      phone_number: '',
    },
  })

  const { push } = useRouter()

  const [isLoading, setIsLoading] = useState({
    form: false,
    submit: false,
  })

  const handleSuccessFetchDetails = (response: SupplierDetailsResponse) => {
    const { data } = response

    ;['name', 'location', 'phone_number'].forEach((each) => {
      form.setValue(
        each as keyof SupplierFormInputs,
        data[each as keyof SupplierFormInputs] || ''
      )
    })
  }

  const handleFailureFetchDetails = (response?: SupplierDetailsResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later'
    )
    push('/dashboard/users')
  }

  const fetchDetails = async () => {
    setIsLoading((prev) => ({ ...prev, form: true }))

    try {
      const apiRes = await callAPI<
        SupplierDetailsRequest,
        SupplierDetailsResponse
      >(SupplierAPI.GET_SUPPLIER_DETAILS, { id: Number(id) }, { method: 'GET' })

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
    onSubmit,
  }
}

export default useSupplierForm
