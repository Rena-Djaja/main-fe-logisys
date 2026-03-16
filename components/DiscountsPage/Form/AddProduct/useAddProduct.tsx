'use client'

import { ProductSchemaProps } from '@/type/Discounts'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { ProductAPI } from '@/constant/APIUrls'
import { useEffect, useState } from 'react'
import {
  BulkProductDetailsProps,
  BulkProductDetailsRequest,
  BulkProductDetailsResponse,
  ProductListRequest,
  ProductListResponse,
} from '@/type/Product'
import { callAPI } from '@/lib/fetchers'
import { toast } from 'sonner'
import { apiStatusChecker } from '@/lib/utils'

const useAddProduct = (props: ProductSchemaProps) => {
  const { open, onClose, onAdd, products } = props

  const defaultProductFilter = {
    page: 1,
    per_page: 5,
    search: '',
    product_type: 'selling_item',
    is_active: 1,
  }

  const [productFilter, setProductFilter] =
    useState<ProductListRequest>(defaultProductFilter)
  const [prefetchedProduct, setPrefetchedProduct] = useState(
    new Set<string>([])
  )
  const [selectedProduct, setSelectedProduct] = useState(new Set<string>([]))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: productList, isValidating: isProductListLoading } =
    useCommonApi<ProductListRequest, ProductListResponse>(
      ProductAPI.GET_PRODUCT_LIST,
      productFilter,
      { method: 'GET' },
      { skipCall: !open }
    )

  const search = (key: keyof ProductListRequest, value: number | string) => {
    const newState = { ...productFilter, [key]: value }
    if (key === 'search') {
      newState.page = 1
    }

    setProductFilter(newState)
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedProduct)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedProduct(newSelected)
  }

  const resetSelected = () => {
    setSelectedProduct(prefetchedProduct)
  }

  const handlePreselectProducts = (products: BulkProductDetailsProps[]) => {
    const selectedIds = products.map((product) => product.id.toString())
    setPrefetchedProduct(new Set(selectedIds))
    setSelectedProduct(new Set(selectedIds))
  }

  const handleSuccess = (response: BulkProductDetailsResponse) => {
    onAdd(response.data)
    onClose()
    resetSelected()
  }

  const handleFailure = (response?: BulkProductDetailsResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async () => {
    setIsSubmitting(true)

    try {
      const req: BulkProductDetailsRequest = {
        ids: [...selectedProduct].map((each) => Number(each)),
      }

      const apiRes = await callAPI<
        BulkProductDetailsRequest,
        BulkProductDetailsResponse
      >(ProductAPI.POST_BULK_PRODUCT_DETAILS, req, { method: 'POST' })

      const { status, data: bulkProductsRes } = apiRes

      if (apiStatusChecker(status) && bulkProductsRes) {
        handleSuccess(bulkProductsRes)
      } else {
        handleFailure(bulkProductsRes)
      }
    } catch {
      handleFailure()
      throw 'Failed to add product details'
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    handlePreselectProducts(products)
  }, [products])

  return {
    productList,
    productFilter,
    isProductListLoading,
    isSubmitting,
    prefetchedProduct,
    selectedProduct,
    setSelectedProduct,
    resetSelected,
    handleSelectRow,
    search,
    onSubmit,
  }
}

export default useAddProduct
