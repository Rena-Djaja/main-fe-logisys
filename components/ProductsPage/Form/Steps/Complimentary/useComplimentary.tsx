'use client'

import { FormStepProps } from '@/type/Product'
import { useFieldArray } from 'react-hook-form'
import { useEffect } from 'react'

const useComplimentary = ({ form }: FormStepProps) => {
  const { fields, append, remove } = useFieldArray({
    name: 'complimentary',
    control: form.control,
  })

  const isComplimentary = form.getValues('category') === 'complimentary'

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

  useEffect(() => {
    if (isComplimentary) {
      form.setValue('complimentary', [])
    }
  }, [])

  return {
    fields,
    isComplimentary,
    handleAddRow,
    remove,
  }
}

export default useComplimentary
