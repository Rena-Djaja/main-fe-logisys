'use client'

import { FormStepProps } from '@/type/Product'
import { useFieldArray } from 'react-hook-form'

const useVariant = ({ form }: FormStepProps) => {
  const { fields, append, remove } = useFieldArray({
    name: 'variants',
    control: form.control,
  })

  const isComplimentary = form.getValues('category') === 'complimentary'

  const handleAddRow = () => {
    append({
      name: '',
      extra_base_price: '',
      extra_selling_price: '',
      custom_discount: false,
      discounts: [],
      custom_complimentary: false,
      complimentary: [],
    })
  }

  return {
    fields,
    isComplimentary,
    handleAddRow,
    remove,
  }
}

export default useVariant
