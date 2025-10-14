'use client'

import { useEffect, useState } from 'react'
import { UserAPI } from '@/constant/APIUrls'
import { CommonDetailsComponentProps } from '@/type/Common'
import { UserDetailsRequest, UserDetailsResponse, UserProps } from '@/type/User'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'

const useUserDetails = (props: CommonDetailsComponentProps) => {
  const {
    detailsState: { id, isOpen },
    handleDetails,
  } = props

  const [userDetails, setUserDetails] = useState<UserProps | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const handleSuccess = (response: UserDetailsResponse) => {
    const { data } = response

    setUserDetails(data)
  }

  const handleFailure = (response?: UserDetailsResponse) => {
    setTimeout(() => {
      toast.error(response?.error)
      handleDetails('close')
    }, 300)
  }

  const fetchDetails = async () => {
    setIsLoading(true)

    try {
      const apiRes = await callAPI<UserDetailsRequest, UserDetailsResponse>(
        UserAPI.GET_USER_DETAILS,
        { id: Number(id) },
        { method: 'GET' }
      )

      const { data: userDetailsData, status } = apiRes

      if (apiStatusChecker(status) && userDetailsData) {
        handleSuccess(userDetailsData)
      } else {
        handleFailure(userDetailsData)
      }
    } catch {
      handleFailure()
      throw 'Failed to fetch details'
    } finally {
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  useEffect(() => {
    if (isOpen && !!id) {
      fetchDetails()
    }
  }, [id, isOpen])

  return {
    userDetails,
    isLoading,
  }
}

export default useUserDetails
