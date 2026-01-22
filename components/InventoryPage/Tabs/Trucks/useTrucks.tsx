'use client'

import { useState } from 'react'
import { CommonFilterRequest } from '@/type/Common'
import { useRouter } from 'next/navigation'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { InventoryAPI } from '@/constant/APIUrls'
import { TruckListResponse } from '@/type/Inventory'

const useTrucks = () => {
  const { push } = useRouter()
  const [filter, setFilter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })

  const search = (key: keyof CommonFilterRequest, value: number | string) => {
    const newState = { ...filter, [key]: value }
    if (key === 'search') {
      newState.page = 1
    }

    setFilter(newState)
  }

  const { data: truckList, isValidating } = useCommonApi<
    CommonFilterRequest,
    TruckListResponse
  >(InventoryAPI.GET_TRUCK_LIST, filter, { method: 'GET' })

  const onAdd = () => {
    push('/dashboard/inventory/trucks/form')
  }

  const onUpdate = (id: number) => {
    push(`/dashboard/inventory/trucks/form/${id}`)
  }

  const onDetails = (id: number) => {
    push(`/dashboard/inventory/trucks/details/${id}`)
  }

  return {
    filter,
    truckList,
    isValidating,
    search,
    onAdd,
    onUpdate,
    onDetails,
  }
}

export default useTrucks
