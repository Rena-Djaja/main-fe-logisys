'use client'

import { useForm } from 'react-hook-form'
import { callAPI } from '@/lib/fetchers'
import {
  ProductDetailsFormInputs,
  ProductDetailsRequest,
  ProductDetailsResponse,
  ProductProps,
  ProductVariantsResponse,
  UpdateProductDetailRequest,
} from '@/type/Product'
import { ProductAPI, SupplierAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  CommonApiResponse,
  CommonFilterRequest,
  CommonFormProps,
} from '@/type/Common'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { SupplierListResponse } from '@/type/Supplier'
import { zodResolver } from '@hookform/resolvers/zod'
import { productDetailsSchema } from '@/validations/ProductValidation'
import { useRouter } from 'next/navigation'

const useEditProduct = ({ id }: CommonFormProps) => {
  const { push } = useRouter()
  const form = useForm<ProductDetailsFormInputs>({
    resolver: zodResolver(productDetailsSchema),
    defaultValues: {
      product_name: '',
      sku: '',
      supplier_id: '',
      category: '',
      unit: '',
      base_price: '',
      selling_price: '',
    },
  })

  const [filter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })
  const [isLoading, setIsLoading] = useState({
    form: false,
    submit: false,
  })

  const { data: supplierList, isValidating: isSupplierValidating } =
    useCommonApi<CommonFilterRequest, SupplierListResponse>(
      SupplierAPI.GET_SUPPLIER_LIST,
      filter,
      { method: 'GET' }
    )

  const handleSuccessFetch = (response: ProductDetailsResponse) => {
    const { data } = response

    const fieldsToUpdate = [
      'product_name',
      'sku',
      'supplier_id',
      'category',
      'unit',
      'base_price',
      'selling_price',
    ]

    fieldsToUpdate.forEach((field) => {
      if (field === 'product_name') {
        form.setValue(field, data.name)
      } else {
        // @ts-ignore
        form.setValue(field, String(data[field as keyof ProductProps]))
      }
    })
  }

  const handleFailureFetch = (
    response?: ProductDetailsResponse | ProductVariantsResponse
  ) => {
    setTimeout(() => {
      toast.error(response?.error)
    }, 300)
    push('/dashboard/products')
  }

  const fetchDetails = async () => {
    setIsLoading((prev) => ({ ...prev, form: true }))

    try {
      const apiRes = await callAPI<
        ProductDetailsRequest,
        ProductDetailsResponse
      >(ProductAPI.GET_PRODUCT_DETAILS, { id: Number(id) }, { method: 'GET' })

      const { data: productDetailsData, status } = apiRes

      if (apiStatusChecker(status) && productDetailsData) {
        handleSuccessFetch(productDetailsData)
      } else {
        handleFailureFetch(productDetailsData)
      }
    } catch {
      handleFailureFetch()
      throw 'Failed to fetch details'
    } finally {
      setTimeout(() => setIsLoading((prev) => ({ ...prev, form: false })), 500)
    }
  }

  const handleSuccess = (response: CommonApiResponse) => {
    const { message } = response
    toast.success(message)
    push('/dashboard/products')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
    )
  }

  const onSubmit = async (data: ProductDetailsFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      const req: UpdateProductDetailRequest = {
        ...data,
        id: Number(id),
        supplier_id: Number(data.supplier_id),
        base_price: Number(data.base_price.replaceAll(',', '')),
        selling_price: Number(data.selling_price.replaceAll(',', '')),
      }

      const { data: updateDetailsData, status } = await callAPI<
        UpdateProductDetailRequest,
        CommonApiResponse
      >(ProductAPI.POST_PRODUCT, req, { method: 'PUT' })

      if (apiStatusChecker(status) && updateDetailsData) {
        handleSuccess(updateDetailsData)
      } else {
        handleFailure(updateDetailsData)
      }
    } catch {
      handleFailure()
      throw 'Failed to update product details'
    } finally {
      setIsLoading((prev) => ({ ...prev, submit: false }))
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [id])

  return {
    form,
    isLoading,
    supplierList,
    isSupplierValidating,
    onSubmit,
  }
}

export default useEditProduct
