'use client'

import { useState } from 'react'
import { CommonFilterRequest } from '@/type/Common'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { InOutListResponse } from '@/type/Transaction'
import { InOutAPI } from '@/constant/APIUrls'
import { useRouter } from 'next/navigation'

const useInOut = () => {
  const { push } = useRouter()

  const [notes, setNotes] = useState({
    isOpen: false,
    id: '',
  })
  const [filter, setFilter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })

  const {
    data: inOutList,
    isValidating,
    mutate,
  } = useCommonApi<CommonFilterRequest, InOutListResponse>(
    InOutAPI.GET_IN_OUT_LIST,
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

  const handleOpenNotes = (id = '') => {
    const newState = { ...notes }

    if (newState.isOpen) {
      newState.id = ''
    } else {
      newState.id = id
    }

    newState.isOpen = !newState.isOpen

    setNotes(newState)
  }

  const onDetails = (id: string) => {
    push(`in-out/details/${id}`)
  }

  const onAdd = () => {
    push('in-out/form')
  }

  const onUpdate = (id: string) => {
    push(`in-out/form/${id}`)
  }

  return {
    filter,
    inOutList,
    isValidating,
    notes,
    handleOpenNotes,
    search,
    onDetails,
    onAdd,
    onUpdate,
    mutate,
  }
}

export default useInOut
