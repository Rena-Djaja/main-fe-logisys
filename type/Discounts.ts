import { BulkProductDetailsProps } from '@/type/Product'

export interface ProductSchemaProps {
  open: boolean
  onClose: () => void
  onAdd: (data: BulkProductDetailsProps[]) => void
  products: BulkProductDetailsProps[]
}
