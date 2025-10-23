'use client'

import { useEffect, useState } from 'react'
import { CommonFilterRequest, CommonFormProps } from '@/type/Common'
import { callAPI } from '@/lib/fetchers'
import {
  AssignedLocationListRequest,
  AssignedLocationListResponse,
  UserDetailsRequest,
  UserDetailsResponse,
  UserProps,
} from '@/type/User'
import { LocationAPI, UserAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'

const useAssignArea = ({ id }: CommonFormProps) => {
  const { push } = useRouter()

  const [userDetails, setUserDetails] = useState<UserProps | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<AssignedLocationListRequest>({
    page: 1,
    per_page: 10,
    search: '',
    sales_id: Number(id),
  })

  const {
    data: assignedLocations,
    isValidating: isLocationLoading,
    mutate,
  } = useCommonApi<AssignedLocationListRequest, AssignedLocationListResponse>(
    LocationAPI.GET_ASSIGNED_LOCATION,
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

  const handleFormState = () => {
    setIsFormOpen((prev) => !prev)
  }

  const handleFailureFetchUserDetails = (response?: UserDetailsResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later'
    )
    push('/dashboard/users')
  }

  const fetchUserDetails = async () => {
    setIsLoading(true)

    try {
      const apiRes = await callAPI<UserDetailsRequest, UserDetailsResponse>(
        UserAPI.GET_USER_DETAILS,
        { id: Number(id) },
        { method: 'GET' }
      )

      const { data: userDetailsData, status } = apiRes

      if (apiStatusChecker(status) && userDetailsData) {
        const { data } = userDetailsData

        setUserDetails(data)
      } else {
        handleFailureFetchUserDetails(userDetailsData)
      }
    } catch {
      handleFailureFetchUserDetails()
      throw 'Failed to fetch user details'
    } finally {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    if (id) {
      fetchUserDetails()
    }
  }, [id])

  return {
    isLoading,
    userDetails,
    assignedLocations,
    isLocationLoading,
    isFormOpen,
    filter,
    handleFormState,
    mutate,
    search,
  }
}

export default useAssignArea
