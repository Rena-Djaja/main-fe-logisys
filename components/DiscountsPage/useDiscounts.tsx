'use client'

import { useState } from 'react'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { DiscountAPI } from '@/constant/APIUrls'
import { CommonFilterRequest } from '@/type/Common'
import { DiscountRuleListResponse } from '@/type/Discounts'

const useDiscounts = () => {
  const [filter, setFilter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })

  const { data: discountRuleList, isValidating } = useCommonApi<
    CommonFilterRequest,
    DiscountRuleListResponse
  >(DiscountAPI.GET_DISCOUNT_RULE_LIST, filter, { method: 'GET' })

  const search = (key: keyof CommonFilterRequest, value: number | string) => {
    const newState = { ...filter, [key]: value }
    if (key === 'search') {
      newState.page = 1
    }

    setFilter(newState)
  }

  const onRowClick = (id: number) => {
    console.log('Row clicked:', id)
  }

  const onAdd = () => {
    console.log('Add button clicked')
  }

  const onUpdate = (id: number) => {
    console.log('Update button clicked for ID:', id)
  }

  const onDelete = (id: number) => {
    console.log('Delete button clicked for ID:', id)
  }

  return {
    filter,
    discountRuleList,
    isValidating,
    search,
    onRowClick,
    onAdd,
    onUpdate,
    onDelete,
  }
}

export default useDiscounts
