'use client'

import { useState } from 'react'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { UserAPI } from '@/constant/APIUrls'
import { CommonFilterRequest } from '@/type/Common'
import { UserListResponse } from '@/type/User'
import { useConfirmationStore } from '@/store'
import { ButtonVariant } from '@/type/FormInputs'

const useUsers = () => {
  const { setConfirmation } = useConfirmationStore()

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

  const onUpdate = (id: number | string) => {
    console.log(id)
  }

  const onDelete = (id: number | string) => {
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
    search,
    onUpdate,
    onDelete,
  }
}

export default useUsers
