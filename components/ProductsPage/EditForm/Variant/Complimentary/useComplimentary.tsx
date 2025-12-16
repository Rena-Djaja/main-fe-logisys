'use client'

import { useEffect } from 'react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import {
  ProductProps,
  ProductVariantFormInputs,
  ProductVariantProps,
} from '@/type/Product'
import { DataType } from '@/components/shared/Hooks/CommonApi/useCommonApi'

interface ComplimentaryProps {
  form: UseFormReturn<ProductVariantFormInputs, any, ProductVariantFormInputs>
  productVariantDetails?: DataType<ProductVariantProps>
  productDetails?: DataType<ProductProps>
}

const useComplimentary = (props: ComplimentaryProps) => {
  const { form, productDetails } = props

  const { fields, append, remove } = useFieldArray({
    name: 'complimentary',
    control: form.control,
  })

  const isComplimentary = productDetails?.category === 'complimentary'

  const handleAddRow = () => {
    append({
      rule_id: null,
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
