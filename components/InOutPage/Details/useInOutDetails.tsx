'use client'

import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { InOutAPI, LogAPI } from '@/constant/APIUrls'
import { CommonDetailsPageProps, CommonDetailsRequest } from '@/type/Common'
import { InOutProps, TransactionItemProps } from '@/type/Transaction'
import { LogProps } from '@/type/Logs'

const useInOutDetails = ({ id }: CommonDetailsPageProps) => {
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

  const { data: transactionLogs, isValidating: isLogsValidating } =
    useCommonApi<CommonDetailsRequest, LogProps[]>(
      LogAPI.GET_TRANSACTION_LOG,
      { id },
      { method: 'GET' },
      { skipCall: !transactionDetails?.transaction_id }
    )

  return {
    transactionDetails,
    isDetailsValidating,
    transactionItems,
    isItemsValidating,
    transactionLogs,
    isLogsValidating,
  }
}

export default useInOutDetails
