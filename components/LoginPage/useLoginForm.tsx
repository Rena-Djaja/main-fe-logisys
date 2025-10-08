'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginValidationSchema } from '@/validations/LoginValidation'
import { PostLoginRequest, PostLoginResponse } from '@/type/Auth'
import { callAPI } from '@/lib/fetchers'
import { AuthAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import { setCookie } from '@/lib/cookies'
import { useRouter } from 'next/navigation'

const useLoginForm = () => {
  const { push } = useRouter()
  const form = useForm<PostLoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginValidationSchema),
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState({
    show: false,
    title: '',
    message: '',
  })

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSuccess = (response: PostLoginResponse) => {
    const { data } = response
    setCookie('access_token', data.access_token)
    push('/dashboard')
  }

  const handleFailure = (response?: PostLoginResponse) => {
    setAlert({
      show: true,
      title: 'Unable to log in',
      message: response?.error || 'Internal server error',
    })
  }

  const onSubmit = async (data: PostLoginRequest) => {
    setIsLoading(true)

    try {
      const apiRes = await callAPI<PostLoginRequest, PostLoginResponse>(
        AuthAPI.POST_LOGIN,
        data,
        { method: 'POST' }
      )

      const { status, data: postLoginRes } = apiRes

      if (apiStatusChecker(status) && postLoginRes) {
        handleSuccess(postLoginRes)
      } else {
        handleFailure(postLoginRes)
      }
    } catch {
      handleFailure()
      throw 'Failed to login'
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    showPassword,
    form,
    alert,
    handleShowPassword,
    onSubmit,
  }
}

export default useLoginForm
