'use client'

import { useState } from 'react'
import {
  CommonApiResponse,
  CommonDetailsStateProps,
  CommonFilterRequest,
} from '@/type/Common'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { ProductAPI } from '@/constant/APIUrls'
import { redirect } from 'next/navigation'
import { ButtonVariant } from '@/type/FormInputs'
import { useConfirmationStore } from '@/store'
import {
  DeleteProductRequest,
  ProductListRequest,
  ProductListResponse,
} from '@/type/Product'
import { toast } from 'sonner'
import { apiStatusChecker } from '@/lib/utils'
import { callAPI } from '@/lib/fetchers'

const useProducts = () => {
  const filterMenu = {
    product_type: {
      category: 'Product Category',
      items: [
        {
          title: 'All Items',
          value: '',
        },
        {
          title: 'Selling Item',
          value: 'selling_item',
        },
        {
          title: 'Complimentary',
          value: 'complimentary',
        },
      ],
    },
    is_active: {
      category: 'Status',
      items: [
        {
          title: 'Active',
          value: 1,
        },
        {
          title: 'Inactive',
          value: 0,
        },
      ],
    },
  }

  const { setConfirmation, setLoading, closeConfirmation } =
    useConfirmationStore()

  const [detailsState, setDetailsState] = useState<CommonDetailsStateProps>({
    id: null,
    isOpen: false,
  })

  const [filter, setFilter] = useState<ProductListRequest>({
    page: 1,
    per_page: 10,
    search: '',
    product_type: '',
    is_active: 1,
  })

  const {
    data: productList,
    isValidating,
    mutate,
  } = useCommonApi<CommonFilterRequest, ProductListResponse>(
    ProductAPI.GET_PRODUCT_LIST,
    filter,
    { method: 'GET' }
  )

  const search = (key: keyof ProductListRequest, value: number | string) => {
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
    redirect('/dashboard/products/form')
  }

  const onUpdate = (id: number) => {
    redirect(`/dashboard/products/form/${id}`)
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
      const apiRes = await callAPI<DeleteProductRequest, CommonApiResponse>(
        ProductAPI.POST_PRODUCT,
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
      response?.error || 'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
    )
  }

  return {
    productList,
    isValidating,
    detailsState,
    filter,
    filterMenu,
    search,
    onRowClick,
    onAdd,
    onUpdate,
    onDelete,
    handleDetails,
  }
}

export default useProducts
