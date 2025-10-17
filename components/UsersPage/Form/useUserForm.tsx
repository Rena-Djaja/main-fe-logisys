'use client'

import { useForm } from 'react-hook-form'
import { PostUserRequest } from '@/type/User'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { RoleAPI, UserAPI } from '@/constant/APIUrls'
import { useState } from 'react'
import { CommonApiResponse, CommonFilterRequest } from '@/type/Common'
import { RoleListResponse } from '@/type/Role'
import { zodResolver } from '@hookform/resolvers/zod'
import { userFormValidationSchema } from '@/validations/UserValidation'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const useUserForm = () => {
  const { push } = useRouter()
  const form = useForm<PostUserRequest>({
    defaultValues: {
      name: '',
      email: '',
      role_id: 0,
    },
    resolver: zodResolver(userFormValidationSchema),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 10,
    search: '',
  })

  const { data: roleListData, isValidating: isRoleLoading } = useCommonApi<
    CommonFilterRequest,
    RoleListResponse
  >(RoleAPI.GET_ROLE_LIST, filter, { method: 'GET' })

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    push('/dashboard/users')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: PostUserRequest) => {
    setIsSubmitting(true)

    try {
      const apiRes = await callAPI<PostUserRequest, CommonApiResponse>(
        UserAPI.POST_USER,
        data,
        { method: 'POST' }
      )

      const { status, data: postUserData } = apiRes

      if (apiStatusChecker(status) && postUserData) {
        handleSuccess(postUserData)
      } else {
        handleFailure(postUserData)
      }
    } catch (error) {
      handleFailure()
      console.error(error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    roleListData,
    isRoleLoading,
    isSubmitting,
    onSubmit,
  }
}

export default useUserForm
