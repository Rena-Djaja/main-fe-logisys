'use client'

import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { InOutAPI, LogAPI } from '@/constant/APIUrls'
import { CommonDetailsPageProps, CommonDetailsRequest } from '@/type/Common'
import { InOutProps, TransactionItemProps } from '@/type/Transaction'
import { LogProps } from '@/type/Logs'
import { useState } from 'react'

const useInOutDetails = ({ id }: CommonDetailsPageProps) => {
  const [notesOpen, setNotesOpen] = useState(false)

  const {
    data: transactionDetails,
    isValidating: isDetailsValidating,
    mutate: mutateDetails,
  } = useCommonApi<CommonDetailsRequest, InOutProps>(
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

  const {
    data: transactionLogs,
    isValidating: isLogsValidating,
    mutate: mutateLogs,
  } = useCommonApi<CommonDetailsRequest, LogProps[]>(
    LogAPI.GET_TRANSACTION_LOG,
    { id },
    { method: 'GET' },
    { skipCall: !transactionDetails?.transaction_id }
  )

  const handleOpenUpdateNotes = () => {
    setNotesOpen((prev) => !prev)
  }

  const handleMutate = () => {
    mutateDetails()
    mutateLogs()
  }

  return {
    transactionDetails,
    isDetailsValidating,
    transactionItems,
    isItemsValidating,
    transactionLogs,
    isLogsValidating,
    notesOpen,
    handleOpenUpdateNotes,
    handleMutate,
  }
}

export default useInOutDetails
