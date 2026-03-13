import { TableHeaderProps } from '@/type/CustomTable'
import { ProductProps } from '@/type/Product'
import { thousandFormat } from '@/lib/utils'

export const productListHeaders: TableHeaderProps[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'sku',
    title: 'Short Name',
  },
  {
    key: 'supplier_name',
    title: 'Supplier',
  },
  {
    key: 'unit',
    title: 'Unit',
  },
  {
    key: 'base_price',
    title: 'Base Price',
    customComponent: ({ data }: { data: ProductProps }) => (
      <span>Rp{thousandFormat(data.base_price)}</span>
    ),
  },
  {
    key: 'selling_price',
    title: 'Selling Price',
    customComponent: ({ data }: { data: ProductProps }) => (
      <span>Rp{thousandFormat(data.selling_price)}</span>
    ),
  },
]
