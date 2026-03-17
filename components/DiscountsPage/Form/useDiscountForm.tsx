'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { discountValidationSchema } from '@/validations/DiscountValidation'
import { useEffect, useState } from 'react'
import { BulkProductDetailsProps } from '@/type/Product'
import { DiscountFormInputs } from '@/type/Discounts'

const useDiscountForm = () => {
  const form = useForm<DiscountFormInputs>({
    resolver: zodResolver(discountValidationSchema),
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: undefined,
      valid_thru_days: undefined,
      is_combinable: false,
      products: [],
    },
  })

  console.log(form.formState.errors)

  const {
    fields: addedProducts,
    append,
    remove,
  } = useFieldArray({
    name: 'products',
    control: form.control,
  })

  const [productSchemaOpen, setProductSchemaOpen] = useState(false)

  const handleOpenProductSchema = () => {
    setProductSchemaOpen((prev) => !prev)
  }

  const handleAddProduct = (data: BulkProductDetailsProps[]) => {
    const existedIds = form.getValues('products').map((each) => String(each.id))

    const existedSet = new Set(existedIds)

    data.forEach((each) => {
      if (!existedSet.has(String(each.id))) {
        const row = {
          ...each,
          variants: each.variants.map((variant) => ({
            ...variant,
            discount_type: '' as 'percentage' | 'price',
            payment_type: '' as 'all_payments' | 'cash' | 'credit',
          })),
        }
        append(row)
      }
    })
  }

  const handleRemoveProduct = (idx: number) => {
    remove(idx)
  }

  const handleValidateEndDate = () => {
    const startDate = new Date(form.getValues('start_date'))
    const endDate = new Date(form.getValues('end_date') || '')

    if (startDate > endDate) {
      form.setError('end_date', {
        type: 'manual',
        message: 'End date must be after the start date',
      })
    } else {
      form.clearErrors('end_date')
    }
  }

  const onSubmit = async (data: DiscountFormInputs) => {
    console.log(data)
  }

  useEffect(() => {
    handleValidateEndDate()
  }, [form.watch('start_date'), form.watch('end_date')])

  return {
    form,
    productSchemaOpen,
    addedProducts,
    onSubmit,
    handleOpenProductSchema,
    handleAddProduct,
    handleRemoveProduct,
  }
}

export default useDiscountForm
