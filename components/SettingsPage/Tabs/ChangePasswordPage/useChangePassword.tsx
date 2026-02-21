'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { changePasswordValidationSchema } from '@/validations/ChangePasswordValidation'
import { zodResolver } from '@hookform/resolvers/zod'

const useChangePassword = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordValidationSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  })

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

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  return {
    form,
    showPassword,
    handleShowPassword,
    onSubmit,
  }
}

export default useChangePassword
