'use client'

import { useForm } from 'react-hook-form'
import {
  PostUserRequest,
  UserDetailsRequest,
  UserDetailsResponse,
  UserFormInputs,
  UserFormProps,
} from '@/type/User'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { RoleAPI, UserAPI } from '@/constant/APIUrls'
import { useEffect, useState } from 'react'
import { CommonApiResponse, CommonFilterRequest } from '@/type/Common'
import { RoleListResponse } from '@/type/Role'
import { zodResolver } from '@hookform/resolvers/zod'
import { userFormValidationSchema } from '@/validations/UserValidation'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const useUserForm = (props: UserFormProps) => {
  const { id } = props
  const { push } = useRouter()
  const form = useForm<UserFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      role_id: 0,
    },
    resolver: zodResolver(userFormValidationSchema),
  })

  const [isLoading, setIsLoading] = useState({
    form: false,
    submit: false,
  })
  const [filter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })

  const { data: roleListData, isValidating: isRoleLoading } = useCommonApi<
    CommonFilterRequest,
    RoleListResponse
  >(RoleAPI.GET_ROLE_LIST, filter, { method: 'GET' })

  const handleSuccessFetchDetails = (response: UserDetailsResponse) => {
    const { data } = response

    ;['name', 'email', 'role_id'].forEach((each) => {
      form.setValue(
        each as keyof UserFormInputs,
        data[each as keyof PostUserRequest]
      )
    })
  }

  const handleFailureFetchDetails = (response?: UserDetailsResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later'
    )
    push('/dashboard/users')
  }

  const fetchDetails = async () => {
    setIsLoading((prev) => ({ ...prev, form: true }))

    try {
      const apiRes = await callAPI<UserDetailsRequest, UserDetailsResponse>(
        UserAPI.GET_USER_DETAILS,
        { id: Number(id) },
        { method: 'GET' }
      )

      const { data: userDetailsData, status } = apiRes

      if (apiStatusChecker(status) && userDetailsData) {
        handleSuccessFetchDetails(userDetailsData)
      } else {
        handleFailureFetchDetails(userDetailsData)
      }
    } catch {
      handleFailureFetchDetails()
      throw 'Failed to fetch user details'
    } finally {
      setIsLoading((prev) => ({ ...prev, form: false }))
    }
  }

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    push('/dashboard/users')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: UserFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      const apiRes = await callAPI<PostUserRequest, CommonApiResponse>(
        UserAPI.POST_USER,
        {
          ...data,
          ...(id && { id: Number(id) }),
        },
        { method: id ? 'PUT' : 'POST' }
      )

      const { status, data: postUserData } = apiRes

      if (apiStatusChecker(status) && postUserData) {
        handleSuccess(postUserData)
      } else {
        handleFailure(postUserData)
      }
    } catch (err) {
      handleFailure()
      throw err
    } finally {
      setIsLoading((prev) => ({ ...prev, submit: false }))
    }
  }

  useEffect(() => {
    if (id) {
      fetchDetails()
    }
  }, [id])

  return {
    form,
    roleListData,
    isRoleLoading,
    isLoading,
    onSubmit,
  }
}

export default useUserForm
