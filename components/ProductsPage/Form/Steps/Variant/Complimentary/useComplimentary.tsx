'use client'

import { FormStepProps } from '@/type/Product'
import { useFieldArray } from 'react-hook-form'

interface VariantComplimentaryProps extends FormStepProps {
  variantIdx: number
}

const useComplimentary = ({ form, variantIdx }: VariantComplimentaryProps) => {
  const { fields, append, remove } = useFieldArray({
    name: `variants.${variantIdx}.complimentary`,
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
