'use client'

import { useState } from 'react'
import { CommonFilterRequest, CommonFormProps } from '@/type/Common'
import { useFieldArray, useForm } from 'react-hook-form'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { InOutAPI, InventoryAPI } from '@/constant/APIUrls'
import { InventoryLocationListResponse, ItemRowProps } from '@/type/Inventory'
import { zodResolver } from '@hookform/resolvers/zod'
import { inOutValidationSchema } from '@/validations/InOutValidation'
import {
  InOutFormInputs,
  PostInOutRequest,
  PostInOutResponse,
} from '@/type/Transaction'
import { MovementTransactionType } from '@/constant/Transaction'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const transactionTypes = [
  {
    label: 'Transaction In',
    value: MovementTransactionType.IN,
  },
  {
    label: 'Transaction Out',
    value: MovementTransactionType.OUT,
  },
]

const useInOutForm = ({ id }: CommonFormProps) => {
  console.log(id)
  const { replace } = useRouter()
  const form = useForm<InOutFormInputs>({
    resolver: zodResolver(inOutValidationSchema),
    defaultValues: {
      transaction_date: '',
      movement_type: '',
      location_id: '',
      description: '',
      items: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const [isDraft, setIsDraft] = useState(false)
  const [isLoading, setIsLoading] = useState({
    form: false,
    submit: false,
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filter, setFilter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 5,
    search: '',
  })

  const { data: locationList, isValidating: isLocationValidating } =
    useCommonApi<CommonFilterRequest, InventoryLocationListResponse>(
      InventoryAPI.GET_INVENTORY_LOCATION_LIST,
      filter,
      { method: 'GET' }
    )

  const search = (key: keyof CommonFilterRequest, value: number | string) => {
    const newState = { ...filter, [key]: value }
    if (key === 'search') {
      newState.page = 1
    }

    setFilter(newState)
  }

  const handleDialog = () => {
    setIsDialogOpen((prev) => !prev)
  }

  const handleAdd = (data: ItemRowProps) => {
    append(data)
  }

  const handleSuccess = (response: PostInOutResponse) => {
    toast.success(response.message)
    replace(`/dashboard/in-out/details/${response.data.transaction_id}`)
  }

  const handleFailure = (response?: PostInOutResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: InOutFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      const transactionStatus = isDraft ? 1 : 0

      const items = data.items.map((each) => ({
        product_id: Number(each.product_id.split('|')[0]),
        variant_id: Number(each.variant_id.split('|')[0]),
        quantity: Number(each.quantity.replaceAll(',', '')),
      }))

      const req: PostInOutRequest = {
        ...data,
        location_id: Number(data.location_id),
        is_draft: transactionStatus,
        items: items,
      }

      const apiRes = await callAPI<PostInOutRequest, PostInOutResponse>(
        InOutAPI.POST_IN_OUT,
        req,
        { method: 'POST' }
      )

      const { status, data: postInOutRes } = apiRes

      if (apiStatusChecker(status) && postInOutRes) {
        handleSuccess(postInOutRes)
      } else {
        handleFailure(postInOutRes)
      }
    } catch (error) {
      handleFailure()
      throw error
    } finally {
      setIsLoading((prev) => ({ ...prev, submit: false }))
    }
  }

  return {
    form,
    transactionTypes,
    locationList,
    isLocationValidating,
    isDialogOpen,
    fields,
    isLoading,
    isDraft,
    onSubmit,
    search,
    handleDialog,
    handleAdd,
    remove,
    setIsDraft,
  }
}

export default useInOutForm
