'use client'

import { useEffect } from 'react'
import {
  CommonDetailsComponentProps,
  CommonDetailsRequest,
} from '@/type/Common'
import { toast } from 'sonner'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import {
  DiscountItemsResponse,
  DiscountRuleDetailsResponse,
} from '@/type/Discounts'
import { DiscountAPI } from '@/constant/APIUrls'
import { mapDiscountsByProductId } from '@/components/DiscountsPage/Resource'
import { useDiscountStore } from '@/store/discount'

const useDiscountDetails = (props: CommonDetailsComponentProps) => {
  const {
    detailsState: { id, isOpen },
    handleDetails,
  } = props

  const {
    discount: { isLoading },
    setDiscountDetails,
    setDiscountItems,
    setLoading,
  } = useDiscountStore()

  const handleSuccess = async (response: DiscountRuleDetailsResponse) => {
    const { data } = response

    setDiscountDetails(data)
    await fetchDiscountItems()
  }

  const handleItemSuccess = (response: DiscountItemsResponse) => {
    const { data } = response

    setDiscountItems(mapDiscountsByProductId(data))
  }

  const handleFailure = (
    response?: DiscountRuleDetailsResponse | DiscountItemsResponse,
    closeDetails = true
  ) => {
    setTimeout(() => {
      toast.error(response?.error)

      if (closeDetails) {
        handleDetails('close')
      }
    }, 300)
  }

  const fetchDetails = async () => {
    setLoading(true)

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
        await handleSuccess(discountDetailsData)
      } else {
        handleFailure(discountDetailsData)
      }
    } catch {
      handleFailure()
      throw 'Failed to fetch details'
    } finally {
      setTimeout(() => setLoading(false), 500)
    }
  }

  const fetchDiscountItems = async () => {
    try {
      const apiRes = await callAPI<CommonDetailsRequest, DiscountItemsResponse>(
        DiscountAPI.GET_DISCOUNT_ITEM_LIST,
        { id: Number(id) },
        { method: 'GET' }
      )

      const { data: discountItemsData, status } = apiRes

      if (apiStatusChecker(status) && discountItemsData) {
        handleItemSuccess(discountItemsData)
      } else {
        handleFailure(discountItemsData, false)
      }
    } catch {
      handleFailure()
      throw 'Failed to fetch discount items'
    }
  }

  useEffect(() => {
    if (isOpen && !!id) {
      fetchDetails()
    }
  }, [id, isOpen])

  return {
    isLoading,
  }
}

export default useDiscountDetails
