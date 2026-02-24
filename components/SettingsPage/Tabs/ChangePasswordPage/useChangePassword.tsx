'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { changePasswordValidationSchema } from '@/validations/ChangePasswordValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangePasswordFormInputs, ChangePasswordRequest } from '@/type/Auth'
import { callAPI } from '@/lib/fetchers'
import { AuthAPI } from '@/constant/APIUrls'
import { CommonApiResponse } from '@/type/Common'
import { useAlertStore } from '@/store/alert'
import { apiStatusChecker, handleLogout } from '@/lib/utils'
import { toast } from 'sonner'

const useChangePassword = () => {
  const { setAlert } = useAlertStore()
  const form = useForm({
    resolver: zodResolver(changePasswordValidationSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const handleShowPassword = (key: keyof typeof showPassword) => {
    const newState = { ...showPassword }
    newState[key] = !newState[key]
    setShowPassword(newState)
  }

  const handleSuccess = () => {
    setAlert({
      isOpen: true,
      title: 'Password Changed Successfully!',
      description:
        'You will be automatically redirected to login page. Please re enter your credentials with the new password',
      disableClose: true,
    })

    setTimeout(() => {
      handleLogout()
    }, 3000)
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: ChangePasswordFormInputs) => {
    setIsLoading(true)

    try {
      const req: ChangePasswordRequest = {
        old_password: data.current_password,
        new_password: data.new_password,
      }

      const apiRes = await callAPI<ChangePasswordRequest, CommonApiResponse>(
        AuthAPI.POST_CHANGE_PASSWORD,
        req,
        { method: 'POST' }
      )

      const { data: changePasswordData, status } = apiRes

      if (apiStatusChecker(status) && changePasswordData) {
        handleSuccess()
      } else {
        handleFailure(changePasswordData)
      }
    } catch {
      handleFailure()
      throw 'Failed to change user password'
    } finally {
      setIsLoading(false)
    }
  }

  return {
    form,
    showPassword,
    isLoading,
    handleShowPassword,
    onSubmit,
  }
}

export default useChangePassword
