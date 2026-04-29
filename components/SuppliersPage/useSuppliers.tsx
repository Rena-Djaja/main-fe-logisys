'use client'

import { useState } from 'react'
import {
  CommonApiResponse,
  CommonDetailsStateProps,
  CommonFilterRequest,
} from '@/type/Common'
import { redirect } from 'next/navigation'
import { ButtonVariant } from '@/type/FormInputs'
import { useConfirmationStore } from '@/store'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { SupplierAPI } from '@/constant/APIUrls'
import { DeleteSupplierRequest, SupplierListResponse } from '@/type/Supplier'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'

const useSuppliers = () => {
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
    data: supplierList,
    isValidating,
    mutate,
  } = useCommonApi<CommonFilterRequest, SupplierListResponse>(
    SupplierAPI.GET_SUPPLIER_LIST,
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
    redirect('/dashboard/suppliers/form')
  }

  const onUpdate = (id: number) => {
    redirect(`/dashboard/suppliers/form/${id}`)
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
      const apiRes = await callAPI<DeleteSupplierRequest, CommonApiResponse>(
        SupplierAPI.POST_SUPPLIER,
        { id },
        { method: 'DELETE' }
      )

      const { status, data: deleteSupplierRes } = apiRes

      if (apiStatusChecker(status) && deleteSupplierRes) {
        handleSuccessDelete(deleteSupplierRes)
      } else {
        handleFailureDelete(deleteSupplierRes)
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
      response?.error || 'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
    )
  }

  return {
    filter,
    supplierList,
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

export default useSuppliers
