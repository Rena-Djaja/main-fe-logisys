import { TableHeaderProps } from '@/type/CustomTable'
import { TransactionItemProps } from '@/type/Transaction'

export const inOutDetailsHeaders: TableHeaderProps[] = [
  {
    key: 'product_name',
    title: 'Product Name',
  },
  {
    key: 'variant_name',
    title: 'Variant Name',
  },
  {
    key: 'quantity',
    title: 'Quantity',
    customComponent: ({ data }: { data: TransactionItemProps }) => (
      <div className="w-full max-w-[6rem] grid grid-cols-2">
        <div className="flex justify-end">
          <span className="font-semibold">{data.quantity} &nbsp;</span>
        </div>
        <span className="font-semibold">{data.unit}</span>
      </div>
    ),
  },
]
