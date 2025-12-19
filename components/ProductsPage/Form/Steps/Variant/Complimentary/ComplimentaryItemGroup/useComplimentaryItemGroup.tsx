'use client'

import { useFieldArray } from 'react-hook-form'
import {
  FormStepProps,
  ProductListFilterProps,
  ProductListResponse,
} from '@/type/Product'
import { useEffect, useState } from 'react'
import { CommonFilterRequest } from '@/type/Common'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { ProductAPI } from '@/constant/APIUrls'

interface ComplimentaryItemGroupProps extends FormStepProps {
  complimentaryIdx: number
  variantIdx: number
}

const useComplimentaryItemGroup = ({
  form,
  complimentaryIdx,
  variantIdx,
}: ComplimentaryItemGroupProps) => {
  const { fields, append, remove } = useFieldArray({
    name: `variants.${variantIdx}.complimentary.${complimentaryIdx}.items`,
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

  useEffect(() => {
    const rowCustomComplimentary = form.watch(
      `variants.${variantIdx}.custom_complimentary`
    )

    if (!rowCustomComplimentary) {
      form.setValue(`variants.${variantIdx}.complimentary`, [])
    }
  }, [form.watch(`variants.${variantIdx}.custom_complimentary`)])

  return {
    fields,
    complimentaryList,
    isValidating,
    handleAddRow,
    remove,
  }
}

export default useComplimentaryItemGroup
