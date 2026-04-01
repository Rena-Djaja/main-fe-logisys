'use client'

import { useEffect, useState } from 'react'
import {
  CommonDetailsComponentProps,
  CommonDetailsRequest,
} from '@/type/Common'
import { toast } from 'sonner'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import {
  DiscountRuleDetailsResponse,
  DiscountRuleProps,
} from '@/type/Discounts'
import { DiscountAPI } from '@/constant/APIUrls'

const useDiscountDetails = (props: CommonDetailsComponentProps) => {
  const {
    detailsState: { id, isOpen },
    handleDetails,
  } = props

  const [discountDetails, setDiscountDetails] = useState<
    DiscountRuleProps | undefined
  >()
  const [isLoading, setIsLoading] = useState(false)

  const handleSuccess = (response: DiscountRuleDetailsResponse) => {
    const { data } = response

    setDiscountDetails(data)
  }

  const handleFailure = (response?: DiscountRuleDetailsResponse) => {
    setTimeout(() => {
      toast.error(response?.error)
      handleDetails('close')
    }, 300)
  }

  const fetchDetails = async () => {
    setIsLoading(true)

    try {
      const apiRes = await callAPI<
        CommonDetailsRequest,
        DiscountRuleDetailsResponse
      >(
        DiscountAPI.GET_DISCOUNT_RULE_DETAILS,
        { id: Number(id) },
        { method: 'GET' }
      )

      const { data: discountDetailsData, status } = apiRes

      if (apiStatusChecker(status) && discountDetailsData) {
        handleSuccess(discountDetailsData)
      } else {
        handleFailure(discountDetailsData)
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
    discountDetails,
    isLoading,
  }
}

export default useDiscountDetails
