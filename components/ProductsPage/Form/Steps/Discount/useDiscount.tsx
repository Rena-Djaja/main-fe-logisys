'use client'

import { FormStepProps } from '@/type/Product'
import { useFieldArray } from 'react-hook-form'
import { useEffect } from 'react'

const useDiscount = ({ form }: FormStepProps) => {
  const isComplimentary = form.getValues('category') === 'complimentary'

  const { fields, append, remove } = useFieldArray({
    name: 'discounts',
    control: form.control,
  })

  const handleAddRow = () => {
    append({
      is_stacked: false,
      name: '',
      description: '',
      type: '',
      payment_type: '',
      amount: '',
      quantity: '',
      start_date: '',
      end_date: '',
    })
  }

  useEffect(() => {
    if (isComplimentary) {
      form.setValue('discounts', [])
    }
  }, [])

  return {
    fields,
    append,
    remove,
    handleAddRow,
    isComplimentary,
  }
}

export default useDiscount
