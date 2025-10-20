'use client'

import { useConfirmationStore } from '@/store'
import { useState } from 'react'
import { CommonFilterRequest } from '@/type/Common'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { LocationAPI } from '@/constant/APIUrls'
import { redirect } from 'next/navigation'
import { ButtonVariant } from '@/type/FormInputs'
import { LocationListResponse } from '@/type/Location'

const useLocations = () => {
  const {
    setConfirmation,
    // setLoading,
    // closeConfirmation
  } = useConfirmationStore()

  const [filter, setFilter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })

  const {
    data: locationList,
    isValidating,
    // mutate,
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
      onConfirm: () => console.log(id),
    })
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
