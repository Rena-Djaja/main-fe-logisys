'use client'

import { FormStepProps } from '@/type/Product'
import { useFieldArray } from 'react-hook-form'
import { useEffect } from 'react'

interface VariantDiscountProps extends FormStepProps {
  variantIdx: number
}

const useDiscount = ({ variantIdx, form }: VariantDiscountProps) => {
  const { fields, append, remove } = useFieldArray({
    name: `variants.${variantIdx}.discounts`,
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
    const rowCustomDiscount = form.watch(
      `variants.${variantIdx}.custom_discount`
    )

    if (!rowCustomDiscount) {
      form.setValue(`variants.${variantIdx}.discounts`, [])
    }
  }, [form.watch(`variants.${variantIdx}.custom_discount`)])

  return {
    fields,
    append,
    remove,
    handleAddRow,
  }
}

export default useDiscount
