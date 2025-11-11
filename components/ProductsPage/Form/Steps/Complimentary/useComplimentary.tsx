'use client'

import { FormStepProps } from '@/type/Product'
import { useFieldArray } from 'react-hook-form'

const useComplimentary = ({ form }: FormStepProps) => {
  const { fields, append, remove } = useFieldArray({
    name: 'complimentary',
    control: form.control,
  })

  const handleAddRow = () => {
    append({
      quantity: '',
      payment_type: '',
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      is_stacked: false,
      items: [],
    })
  }

  return {
    fields,
    handleAddRow,
    remove,
  }
}

export default useComplimentary
