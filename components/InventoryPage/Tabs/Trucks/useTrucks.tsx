'use client'

import { useState } from 'react'
import { CommonFilterRequest } from '@/type/Common'
import { redirect } from 'next/navigation'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { InventoryAPI } from '@/constant/APIUrls'
import { TruckListResponse } from '@/type/Inventory'

const useTrucks = () => {
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
    redirect('/dashboard/inventory/warehouse/form')
  }

  const onUpdate = (id: number) => {
    redirect(`/dashboard/inventory/warehouse/form/${id}`)
  }

  return {
    filter,
    truckList,
    isValidating,
    search,
    onAdd,
    onUpdate,
  }
}

export default useTrucks
