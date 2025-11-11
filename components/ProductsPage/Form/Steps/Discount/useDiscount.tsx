'use client'

import { FormStepProps } from '@/type/Product'
import { useFieldArray } from 'react-hook-form'

const useDiscount = ({ form }: FormStepProps) => {
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

  return {
    fields,
    append,
    remove,
    handleAddRow,
  }
}

export default useDiscount
