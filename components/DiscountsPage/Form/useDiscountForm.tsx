'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { discountValidationSchema } from '@/validations/DiscountValidation'
import { useState } from 'react'

const useDiscountForm = () => {
  const form = useForm({
    resolver: zodResolver(discountValidationSchema),
    defaultValues: {
      name: '',
      description: '',
      products: [],
    },
  })

  const [productSchemaOpen, setProductSchemaOpen] = useState(false)

  const handleOpenProductSchema = () => {
    setProductSchemaOpen((prev) => !prev)
  }

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  return {
    form,
    productSchemaOpen,
    onSubmit,
    handleOpenProductSchema,
  }
}

export default useDiscountForm
