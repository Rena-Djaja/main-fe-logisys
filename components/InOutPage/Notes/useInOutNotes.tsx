'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateStatusValidationSchema } from '@/validations/InOutValidation'
import {
  InOutNotesProps,
  UpdateStatusFormInputs,
  UpdateStatusRequest,
} from '@/type/Transaction'
import { callAPI } from '@/lib/fetchers'
import { InOutAPI } from '@/constant/APIUrls'
import { CommonApiResponse } from '@/type/Common'
import { toast } from 'sonner'
import { apiStatusChecker } from '@/lib/utils'
import { useState } from 'react'

const useInOutNotes = (props: InOutNotesProps) => {
  const { id, handleOpen, mutate, type } = props

  const form = useForm({
    resolver: zodResolver(updateStatusValidationSchema),
    defaultValues: {
      notes: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    mutate()
    handleOpen()
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: UpdateStatusFormInputs) => {
    setIsLoading(true)

    try {
      const req: UpdateStatusRequest = {
        ...data,
        id,
        status: type,
      }

      const apiRes = await callAPI<UpdateStatusRequest, CommonApiResponse>(
        InOutAPI.PUT_UPDATE_STATUS,
        req,
        { method: 'PUT' }
      )

      const { status, data: updateStatusData } = apiRes

      if (apiStatusChecker(status) && updateStatusData) {
        handleSuccess(updateStatusData)
      } else {
        handleFailure(updateStatusData)
      }
    } catch {
      handleFailure()
      throw 'Failed to update status'
    } finally {
      setIsLoading(false)
    }
  }

  return {
    form,
    isLoading,
    onSubmit,
  }
}

export default useInOutNotes
