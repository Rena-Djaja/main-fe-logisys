'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { discountValidationSchema } from '@/validations/DiscountValidation'
import { useState } from 'react'
import { BulkProductDetailsProps } from '@/type/Product'

const useDiscountForm = () => {
  const form = useForm({
    resolver: zodResolver(discountValidationSchema),
    defaultValues: {
      name: '',
      description: '',
      products: [],
    },
  })

  const { fields: addedProducts } = useFieldArray({
    name: 'products',
    control: form.control,
  })

  const [productSchemaOpen, setProductSchemaOpen] = useState(false)

  const handleOpenProductSchema = () => {
    setProductSchemaOpen((prev) => !prev)
  }

  const handleAddProduct = (data: BulkProductDetailsProps[]) => {
    form.setValue('products', data)
  }

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  return {
    form,
    productSchemaOpen,
    addedProducts,
    onSubmit,
    handleOpenProductSchema,
    handleAddProduct,
  }
}

export default useDiscountForm
