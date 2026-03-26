'use client'

import { useFieldArray } from 'react-hook-form'
import { ItemVariantProps } from '@/type/Discounts'

const useItemVariant = (props: ItemVariantProps) => {
  const { productIdx, variantIdx, paymentType, form } = props

  const { fields, append, remove } = useFieldArray({
    name: `products.${productIdx}.variants.${variantIdx}.${paymentType}`,
    control: form.control,
  })

  const handleAddRow = () => {
    form.clearErrors(`products.${productIdx}.variants.${variantIdx}`)
    append({
      min_quantity: '',
      discount_amount: '',
    })
  }

  const handleRemoveRow = (idx: number) => {
    remove(idx)
  }

  // TODO: optional variant fields if is active is false

  return {
    fields,
    handleAddRow,
    handleRemoveRow,
  }
}

export default useItemVariant
