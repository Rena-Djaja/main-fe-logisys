'use client'

import { useState } from 'react'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { UserAPI } from '@/constant/APIUrls'
import { CommonDetailsStateProps, CommonFilterRequest } from '@/type/Common'
import { UserListResponse } from '@/type/User'
import { useConfirmationStore } from '@/store'
import { ButtonVariant } from '@/type/FormInputs'
import { redirect } from 'next/navigation'

const useUsers = () => {
  const { setConfirmation } = useConfirmationStore()

  const [detailsState, setDetailsState] = useState<CommonDetailsStateProps>({
    id: null,
    isOpen: false,
  })

  const [filter, setFilter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })

  const { data: userList, isValidating } = useCommonApi<
    CommonFilterRequest,
    UserListResponse
  >(UserAPI.GET_USER_LIST, filter, { method: 'GET' })

  const search = (key: keyof CommonFilterRequest, value: number | string) => {
    const newState = { ...filter, [key]: value }
    if (key === 'search') {
      newState.page = 1
    }

    setFilter(newState)
  }

  const handleDetails = (type: 'open' | 'close', id?: number) => {
    setDetailsState({
      isOpen: type === 'open',
      id: type === 'open' ? id : null,
    })
  }

  const onRowClick = (id: number) => {
    handleDetails('open', id)
  }

  const onAdd = () => {
    redirect('/dashboard/users/form')
  }

  const onUpdate = (id: number) => {
    console.log(id)
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
    filter,
    userList,
    isValidating,
    detailsState,
    search,
    onRowClick,
    onAdd,
    onUpdate,
    onDelete,
    handleDetails,
  }
}

export default useUsers
