'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginValidationSchema } from '@/validations/LoginValidation'

const useLoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginValidationSchema),
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    console.log(data)
  }

  return {
    showPassword,
    handleShowPassword,
    form,
    onSubmit,
  }
}

export default useLoginForm
