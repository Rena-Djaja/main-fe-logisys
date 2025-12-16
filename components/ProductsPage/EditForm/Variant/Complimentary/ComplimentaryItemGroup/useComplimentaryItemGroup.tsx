'use client'

import { useState } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import {
  ProductListFilterProps,
  ProductListResponse,
  ProductProps,
  ProductVariantFormInputs,
  ProductVariantProps,
} from '@/type/Product'
import useCommonApi, {
  DataType,
} from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { CommonFilterRequest } from '@/type/Common'
import { ProductAPI } from '@/constant/APIUrls'

interface ComplimentaryItemGroupProps {
  form: UseFormReturn<ProductVariantFormInputs, any, ProductVariantFormInputs>
  productVariantDetails?: DataType<ProductVariantProps>
  productDetails?: DataType<ProductProps>
  complimentaryIdx: number
}

const useComplimentaryItemGroup = (props: ComplimentaryItemGroupProps) => {
  const { form, complimentaryIdx } = props
  const { fields, append, remove } = useFieldArray({
    name: `complimentary.${complimentaryIdx}.items`,
    control: form.control,
  })

  const [filter] = useState<ProductListFilterProps>({
    page: 1,
    per_page: 10,
    search: '',
    product_type: 'complimentary',
  })

  const { data: complimentaryList, isValidating } = useCommonApi<
    CommonFilterRequest,
    ProductListResponse
  >(ProductAPI.GET_PRODUCT_LIST, filter, { method: 'GET' })

  const handleAddRow = () => {
    append({
      product_id: '',
      variants: [],
    })
  }

  return {
    fields,
    complimentaryList,
    isValidating,
    handleAddRow,
    remove,
  }
}

export default useComplimentaryItemGroup
