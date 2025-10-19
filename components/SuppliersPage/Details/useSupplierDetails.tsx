'use client'

import { CommonDetailsComponentProps } from '@/type/Common'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { callAPI } from '@/lib/fetchers'
import { SupplierAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import {
  SupplierDetailsRequest,
  SupplierDetailsResponse,
  SupplierProps,
} from '@/type/Supplier'

const useSupplierDetails = (props: CommonDetailsComponentProps) => {
  const {
    detailsState: { id, isOpen },
    handleDetails,
  } = props

  const [supplierDetails, setSupplierDetails] = useState<
    SupplierProps | undefined
  >()
  const [isLoading, setIsLoading] = useState(false)

  const handleSuccess = (response: SupplierDetailsResponse) => {
    const { data } = response

    setSupplierDetails(data)
  }

  const handleFailure = (response?: SupplierDetailsResponse) => {
    setTimeout(() => {
      toast.error(response?.error)
      handleDetails('close')
    }, 300)
  }

  const fetchDetails = async () => {
    setIsLoading(true)

    try {
      const apiRes = await callAPI<
        SupplierDetailsRequest,
        SupplierDetailsResponse
      >(SupplierAPI.GET_SUPPLIER_DETAILS, { id: Number(id) }, { method: 'GET' })

      const { data: supplierDetailsData, status } = apiRes

      if (apiStatusChecker(status) && supplierDetailsData) {
        handleSuccess(supplierDetailsData)
      } else {
        handleFailure(supplierDetailsData)
      }
    } catch {
      handleFailure()
      throw 'Failed to fetch details'
    } finally {
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  useEffect(() => {
    if (isOpen && !!id) {
      fetchDetails()
    }
  }, [id, isOpen])

  return {
    supplierDetails,
    isLoading,
  }
}

export default useSupplierDetails
