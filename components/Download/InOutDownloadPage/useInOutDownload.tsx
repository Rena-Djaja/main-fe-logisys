'use client'

import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { CommonDetailsRequest } from '@/type/Common'
import { InOutProps, TransactionItemProps } from '@/type/Transaction'
import { InOutAPI } from '@/constant/APIUrls'
import { getQueryString } from '@/lib/urlUtils'

const useInOutDownload = () => {
  const { id } = getQueryString()

  const { data: transactionDetails, isValidating: isDetailsValidating } =
    useCommonApi<CommonDetailsRequest, InOutProps>(
      InOutAPI.GET_IN_OUT_DETAILS,
      { id },
      { method: 'GET' }
    )

  const { data: transactionItems, isValidating: isItemsValidating } =
    useCommonApi<CommonDetailsRequest, TransactionItemProps[]>(
      InOutAPI.GET_IN_OUT_ITEMS,
      { id },
      { method: 'GET' },
      { skipCall: !transactionDetails?.transaction_id }
    )

  return {
    transactionDetails,
    isDetailsValidating,
    transactionItems,
    isItemsValidating,
  }
}

export default useInOutDownload
