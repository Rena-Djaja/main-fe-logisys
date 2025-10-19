'use client'

import { useState } from 'react'
import { CommonDetailsStateProps, CommonFilterRequest } from '@/type/Common'
import { redirect } from 'next/navigation'
import { ButtonVariant } from '@/type/FormInputs'
import { useConfirmationStore } from '@/store'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { SupplierAPI } from '@/constant/APIUrls'
import { SupplierListResponse } from '@/type/Supplier'

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

  const { data: supplierList, isValidating } = useCommonApi<
    CommonFilterRequest,
    SupplierListResponse
  >(SupplierAPI.GET_SUPPLIER_LIST, filter, { method: 'GET' })

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
    redirect(`/dashboard/users/form/${id}`)
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
