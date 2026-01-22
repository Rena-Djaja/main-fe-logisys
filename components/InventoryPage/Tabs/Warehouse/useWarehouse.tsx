'use client'

import { CommonFilterRequest } from '@/type/Common'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { InventoryAPI } from '@/constant/APIUrls'
import { WarehouseListResponse } from '@/type/Inventory'

const useWarehouse = () => {
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

  const { data: warehouseList, isValidating } = useCommonApi<
    CommonFilterRequest,
    WarehouseListResponse
  >(InventoryAPI.GET_WAREHOUSE_LIST, filter, { method: 'GET' })

  const onAdd = () => {
    push('/dashboard/inventory/warehouse/form')
  }

  const onUpdate = (id: number) => {
    push(`/dashboard/inventory/warehouse/form/${id}`)
  }

  const onDetails = (id: number) => {
    push(`/dashboard/inventory/warehouse/details/${id}`)
  }

  return {
    filter,
    warehouseList,
    isValidating,
    search,
    onAdd,
    onUpdate,
    onDetails,
  }
}

export default useWarehouse
