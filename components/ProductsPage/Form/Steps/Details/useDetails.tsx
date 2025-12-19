'use client'

import { useState } from 'react'
import { CommonFilterRequest } from '@/type/Common'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { SupplierListResponse } from '@/type/Supplier'
import { SupplierAPI } from '@/constant/APIUrls'

const useDetails = () => {
  const [filter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })

  const { data: supplierList, isValidating } = useCommonApi<
    CommonFilterRequest,
    SupplierListResponse
  >(SupplierAPI.GET_SUPPLIER_LIST, filter, { method: 'GET' })

  return {
    supplierList,
    isValidating,
  }
}

export default useDetails
