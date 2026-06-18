'use client'

import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { SavedLocationAPI, UserAPI } from '@/constant/APIUrls'
import { useState } from 'react'
import {
  CommonApiResponse,
  CommonDetailsStateProps,
  CommonFilterRequest,
} from '@/type/Common'
import { SavedLocationListResponse } from '@/type/SavedLocation'
import { ButtonVariant } from '@/type/FormInputs'
import { callAPI } from '@/lib/fetchers'
import { DeleteUserRequest } from '@/type/User'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useConfirmationStore } from '@/store'

const useSavedLocation = () => {
  const { push } = useRouter()
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
    data: savedLocationList,
    isValidating,
    mutate,
  } = useCommonApi<CommonFilterRequest, SavedLocationListResponse>(
    SavedLocationAPI.GET_SAVED_LOCATION_LIST,
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

  const handleDetails = (type: 'open' | 'close', id?: string) => {
    setDetailsState({
      isOpen: type === 'open',
      id: type === 'open' ? id : null,
    })
  }

  const onRowClick = (id: string) => {
    handleDetails('open', id)
  }

  const onAdd = () => {
    push('/dashboard/saved-location/form')
  }

  const onUpdate = (id: string) => {
    push(`/dashboard/saved-location/form/${id}`)
  }

  const onDelete = (id: string) => {
    setConfirmation({
      isOpen: true,
      title: 'Apakah Anda yakin?',
      description:
        'Aksi ini tidak dapat dibatalkan. Anda akan menghapus lokasi ini secara permanen.',
      confirmButtonVariant: ButtonVariant.DESTRUCTIVES,
      confirmButtonText: 'Saya Yakin',
      onConfirm: () => onConfirmDelete(id),
    })
  }

  const onConfirmDelete = async (id: string) => {
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
      response?.message || 'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
    )
  }

  return {
    savedLocationList,
    isValidating,
    filter,
    detailsState,
    handleDetails,
    search,
    onRowClick,
    onAdd,
    onUpdate,
    onDelete,
  }
}

export default useSavedLocation
