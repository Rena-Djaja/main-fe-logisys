'use client'

import { useFieldArray, UseFormReturn } from 'react-hook-form'
import {
  ProductProps,
  ProductVariantFormInputs,
  ProductVariantProps,
} from '@/type/Product'
import { DataType } from '@/components/shared/Hooks/CommonApi/useCommonApi'

interface DiscountProps {
  form: UseFormReturn<ProductVariantFormInputs, any, ProductVariantFormInputs>
  productVariantDetails?: DataType<ProductVariantProps>
  productDetails?: DataType<ProductProps>
}

const useDiscount = (props: DiscountProps) => {
  const { form } = props
  const { fields, append, remove } = useFieldArray({
    name: 'discount',
    control: form.control,
  })

  const handleAddRow = () => {
    append({
      id: null,
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
    handleAddRow,
    remove,
  }
}

export default useDiscount
