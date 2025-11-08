'use client'

import { CommonDetailsComponentProps } from '@/type/Common'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { callAPI } from '@/lib/fetchers'
import { ProductAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import {
  ProductDetailsRequest,
  ProductDetailsResponse,
  ProductProps,
} from '@/type/Product'

const useProductDetails = (props: CommonDetailsComponentProps) => {
  const {
    detailsState: { id, isOpen },
    handleDetails,
  } = props

  const [productDetails, setProductDetails] = useState<
    ProductProps | undefined
  >()
  const [isLoading, setIsLoading] = useState(false)

  const handleSuccess = (response: ProductDetailsResponse) => {
    const { data } = response

    setProductDetails(data)
  }

  const handleFailure = (response?: ProductDetailsResponse) => {
    setTimeout(() => {
      toast.error(response?.error)
      handleDetails('close')
    }, 300)
  }

  const fetchDetails = async () => {
    setIsLoading(true)

    try {
      const apiRes = await callAPI<
        ProductDetailsRequest,
        ProductDetailsResponse
      >(ProductAPI.GET_PRODUCT_DETAILS, { id: Number(id) }, { method: 'GET' })

      const { data: productDetailsData, status } = apiRes

      if (apiStatusChecker(status) && productDetailsData) {
        handleSuccess(productDetailsData)
      } else {
        handleFailure(productDetailsData)
      }
    } catch {
      handleFailure()
      throw 'Failed to fetch details'
    } finally {
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  useEffect(() => {
    if (isOpen && !!id) {
      fetchDetails()
    }
  }, [id, isOpen])

  return {
    isLoading,
    productDetails,
  }
}

export default useProductDetails
