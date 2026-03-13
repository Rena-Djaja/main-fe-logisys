'use client'

import { ProductSchemaProps } from '@/type/Discounts'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { ProductAPI } from '@/constant/APIUrls'
import { useState } from 'react'
import { ProductListRequest, ProductListResponse } from '@/type/Product'

const useAddProduct = (props: ProductSchemaProps) => {
  const { open } = props

  const defaultProductFilter = {
    page: 1,
    per_page: 5,
    search: '',
    product_type: 'selling_item',
    is_active: 1,
  }

  const [productFilter, setProductFilter] =
    useState<ProductListRequest>(defaultProductFilter)
  const [selectedProduct, setSelectedProduct] = useState(new Set<string>([]))

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

  const resetSelected = () => {
    setSelectedProduct(new Set<string>([]))
  }

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  return {
    productList,
    productFilter,
    isProductListLoading,
    selectedProduct,
    setSelectedProduct,
    resetSelected,
    search,
    onSubmit,
  }
}

export default useAddProduct
