'use client'

import { CommonApiResponse, CommonDetailsComponentProps } from '@/type/Common'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { callAPI } from '@/lib/fetchers'
import { ProductAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import {
  PostVariantStatusRequest,
  ProductDetailsRequest,
  ProductDetailsResponse,
  ProductProps,
  ProductVariantProps,
  ProductVariantsRequest,
  ProductVariantsResponse,
} from '@/type/Product'
import { useRouter } from 'next/navigation'
import { useConfirmationStore } from '@/store'
import { ButtonVariant } from '@/type/FormInputs'

const useProductDetails = (props: CommonDetailsComponentProps) => {
  const {
    detailsState: { id, isOpen },
    handleDetails,
  } = props

  const { push } = useRouter()
  const { setConfirmation, setLoading, closeConfirmation } =
    useConfirmationStore()

  const [productDetails, setProductDetails] = useState<
    ProductProps | undefined
  >()
  const [variants, setVariants] = useState<ProductVariantProps[] | undefined>()
  const [activeVariantIdx, setActiveVariantIdx] = useState<number | null>()
  const [isLoading, setIsLoading] = useState({
    details: false,
    variants: false,
  })

  const handleSuccess = (response: ProductDetailsResponse) => {
    const { data } = response

    setProductDetails(data)
  }

  const handleVariantSuccess = (response: ProductVariantsResponse) => {
    const { data } = response

    setVariants(data)
  }

  const handleFailure = (
    response?: ProductDetailsResponse | ProductVariantsResponse
  ) => {
    setTimeout(() => {
      toast.error(response?.error)
      handleDetails('close')
    }, 300)
  }

  const fetchDetails = async () => {
    setIsLoading((prev) => ({ ...prev, details: true }))

    try {
      const apiRes = await callAPI<
        ProductDetailsRequest,
        ProductDetailsResponse
      >(ProductAPI.GET_PRODUCT_DETAILS, { id: Number(id) }, { method: 'GET' })

      const { data: productDetailsData, status } = apiRes

      if (apiStatusChecker(status) && productDetailsData) {
        handleSuccess(productDetailsData)
        fetchVariants()
      } else {
        handleFailure(productDetailsData)
      }
    } catch {
      handleFailure()
      throw 'Failed to fetch details'
    } finally {
      setTimeout(
        () => setIsLoading((prev) => ({ ...prev, details: false })),
        500
      )
    }
  }

  const fetchVariants = async () => {
    setIsLoading((prev) => ({ ...prev, variants: true }))

    try {
      const apiRes = await callAPI<
        ProductVariantsRequest,
        ProductVariantsResponse
      >(
        ProductAPI.GET_PRODUCT_VARIANTS,
        { product_id: Number(id) },
        { method: 'GET' }
      )

      const { data: productVariantsData, status } = apiRes

      if (apiStatusChecker(status) && productVariantsData) {
        handleVariantSuccess(productVariantsData)
      } else {
        handleFailure(productVariantsData)
      }
    } catch {
      handleFailure()
      throw 'Failed to fetch details'
    } finally {
      setTimeout(
        () => setIsLoading((prev) => ({ ...prev, variants: false })),
        500
      )
    }
  }

  const handleToggleVariant = (type: 'open' | 'close', idx?: number) => {
    if (type === 'open' && typeof idx === 'number') {
      setActiveVariantIdx(idx)
    } else {
      setActiveVariantIdx(null)
    }
  }

  const handleEdit = (type: 'details' | 'variant', id: number) => {
    switch (type) {
      case 'details':
        push(`products/form/${id}`)
        break
      case 'variant':
        push(`products/form/variant/${id}`)
        break
      default:
        return null
    }
  }

  const onConfirmUpdateStatus = async (id: number, productId: number) => {
    setLoading(true)

    try {
      const req: PostVariantStatusRequest = {
        id,
        product_id: productId,
        is_active: !variants?.[Number(activeVariantIdx)].is_active,
      }

      const apiRes = await callAPI<PostVariantStatusRequest, CommonApiResponse>(
        ProductAPI.POST_PRODUCT_VARIANT_STATUS,
        req,
        { method: 'PUT' }
      )

      const { status, data: updateStatusData } = apiRes

      if (apiStatusChecker(status) && updateStatusData) {
        handleSuccessUpdateStatus(updateStatusData)
      } else {
        handleFailureUpdateStatus(updateStatusData)
      }
    } catch {
      handleFailureUpdateStatus()
      throw 'Failed to update variant status'
    } finally {
      setLoading(false)
    }
  }

  const handleSuccessUpdateStatus = (response: CommonApiResponse) => {
    closeConfirmation()
    handleDetails('close')
    toast.success(response.message)
  }

  const handleFailureUpdateStatus = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later'
    )
  }

  const handleUpdateStatus = (id: number, productId: number) => {
    setConfirmation({
      isOpen: true,
      title: 'Update status of this variant?',
      description: `Are you sure want to ${variants?.[Number(activeVariantIdx)]?.is_active ? 'deactivate' : 'activate'} this variant`,
      confirmButtonVariant: ButtonVariant.DEFAULT,
      confirmButtonText: "Yes, I'm sure",
      onConfirm: () => onConfirmUpdateStatus(id, productId),
    })
  }

  useEffect(() => {
    if (isOpen && !!id) {
      fetchDetails()
    } else {
      setTimeout(() => setActiveVariantIdx(null), 200)
    }
  }, [id, isOpen])

  return {
    isLoading,
    productDetails,
    variants,
    activeVariantIdx,
    handleToggleVariant,
    handleEdit,
    handleUpdateStatus,
  }
}

export default useProductDetails
