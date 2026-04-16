'use client'

import { useState } from 'react'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { DiscountAPI } from '@/constant/APIUrls'
import { CommonDetailsStateProps, CommonFilterRequest } from '@/type/Common'
import { DiscountRuleListResponse } from '@/type/Discounts'
import { useRouter } from 'next/navigation'

const useDiscounts = () => {
  const { push } = useRouter()

  const [filter, setFilter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })

  const [detailsState, setDetailsState] = useState<CommonDetailsStateProps>({
    id: null,
    isOpen: false,
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

  const handleDetails = (type: 'open' | 'close', id?: number) => {
    setDetailsState({
      isOpen: type === 'open',
      id: type === 'open' ? id : null,
    })
  }

  const onRowClick = (id: number) => {
    handleDetails('open', id)
  }

  const onAdd = () => {
    push('/dashboard/discounts/form')
  }

  const onUpdate = (id: number) => {
    push(`/dashboard/discounts/form/${id}`)
  }

  const onDelete = (id: number) => {
    console.log('Delete button clicked for ID:', id)
  }

  return {
    filter,
    discountRuleList,
    isValidating,
    detailsState,
    search,
    onRowClick,
    onAdd,
    onUpdate,
    onDelete,
    handleDetails,
  }
}

export default useDiscounts
