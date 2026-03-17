import { BulkProductDetailsProps } from '@/type/Product'
import { z } from 'zod'
import { discountValidationSchema } from '@/validations/DiscountValidation'

export interface ProductSchemaProps {
  open: boolean
  onClose: () => void
  onAdd: (data: BulkProductDetailsProps[]) => void
  products: BulkProductDetailsProps[]
}

export type DiscountFormInputs = z.infer<typeof discountValidationSchema>
