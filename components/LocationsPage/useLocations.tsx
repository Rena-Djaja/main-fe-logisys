'use client'

import { useConfirmationStore } from '@/store'
import { useState } from 'react'
import { CommonApiResponse, CommonFilterRequest } from '@/type/Common'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { LocationAPI } from '@/constant/APIUrls'
import { redirect } from 'next/navigation'
import { ButtonVariant } from '@/type/FormInputs'
import { DeleteLocationRequest, LocationListResponse } from '@/type/Location'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'

const useLocations = () => {
  const { setConfirmation, setLoading, closeConfirmation } =
    useConfirmationStore()

  const [filter, setFilter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })

  const {
    data: locationList,
    isValidating,
    mutate,
  } = useCommonApi<CommonFilterRequest, LocationListResponse>(
    LocationAPI.GET_LOCATION_LIST,
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

  const onAdd = () => {
    redirect('/dashboard/locations/form')
  }

  const onUpdate = (id: number) => {
    redirect(`/dashboard/locations/form/${id}`)
  }

  const onDelete = (id: number) => {
    setConfirmation({
      isOpen: true,
      title: 'Are you absolutely sure?',
      description:
        'This action cannot be undone. This will permanently delete this account and remove the data.',
      confirmButtonVariant: ButtonVariant.DESTRUCTIVES,
      confirmButtonText: "Yes, I'm sure",
      onConfirm: () => onConfirmDelete(id),
    })
  }

  const onConfirmDelete = async (id: number) => {
    setLoading(true)

    try {
      const apiRes = await callAPI<DeleteLocationRequest, CommonApiResponse>(
        LocationAPI.POST_LOCATION,
        { id },
        { method: 'DELETE' }
      )

      const { status, data: deleteLocationRes } = apiRes

      if (apiStatusChecker(status) && deleteLocationRes) {
        handleSuccessDelete(deleteLocationRes)
      } else {
        handleFailureDelete(deleteLocationRes)
      }
    } catch (err) {
      handleFailureDelete()
      throw err
    } finally {
      setLoading(false)
      closeConfirmation()
    }
  }

  const handleSuccessDelete = (response: CommonApiResponse) => {
    toast.success(response.message)
    mutate()
  }

  const handleFailureDelete = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  return {
    locationList,
    isValidating,
    filter,
    search,
    onAdd,
    onUpdate,
    onDelete,
  }
}

export default useLocations
