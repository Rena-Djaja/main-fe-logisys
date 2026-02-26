'use client'

import { useState } from 'react'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { UserAPI } from '@/constant/APIUrls'
import {
  CommonApiResponse,
  CommonDetailsStateProps,
  CommonFilterRequest,
} from '@/type/Common'
import { DeleteUserRequest, UserListResponse } from '@/type/User'
import { useConfirmationStore } from '@/store'
import { ButtonVariant } from '@/type/FormInputs'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { useAuthContext } from '@/components/shared/context/AuthContext'
import { useRouter } from 'next/navigation'

const useUsers = () => {
  const { push } = useRouter()
  const {
    authInfo: { id: userId },
  } = useAuthContext()
  const { setConfirmation, setLoading, closeConfirmation } =
    useConfirmationStore()

  const [detailsState, setDetailsState] = useState<CommonDetailsStateProps>({
    id: null,
    isOpen: false,
  })

  const [filter, setFilter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })

  const {
    data: userList,
    isValidating,
    mutate,
  } = useCommonApi<CommonFilterRequest, UserListResponse>(
    UserAPI.GET_USER_LIST,
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
    push('/dashboard/users/form')
  }

  const onUpdate = (id: number) => {
    push(`/dashboard/users/form/${id}`)
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
      const apiRes = await callAPI<DeleteUserRequest, CommonApiResponse>(
        UserAPI.POST_USER,
        { id },
        { method: 'DELETE' }
      )

      const { status, data: deleteUserRes } = apiRes

      if (apiStatusChecker(status) && deleteUserRes) {
        handleSuccessDelete(deleteUserRes)
      } else {
        handleFailureDelete(deleteUserRes)
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
    filter,
    userId,
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
