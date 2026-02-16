import { TableHeaderProps } from '@/type/CustomTable'
import { InOutProps, TransactionItemProps } from '@/type/Transaction'
import { formattedDate } from '@/lib/utils'
import {
  handleMovementTransactionType,
  handleTransactionStatus,
} from '@/lib/statuses'

export const inOutListHeaders: TableHeaderProps[] = [
  {
    key: 'transaction_id',
    title: 'Transaction ID',
  },
  {
    key: 'transaction_date',
    title: 'Transaction Date',
    customComponent: ({ data }: { data: InOutProps }) => (
      <span>{formattedDate(data.transaction_date)}</span>
    ),
  },
  {
    key: 'movement_type',
    title: 'Type',
    customComponent: ({ data }: { data: InOutProps }) => (
      <div>{handleMovementTransactionType(data.movement_type)}</div>
    ),
  },
  {
    key: '',
    title: 'Location',
    customComponent: ({ data }: { data: InOutProps }) => (
      <span>{data.warehouse_name || data.plate_number}</span>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    customComponent: ({ data }: { data: InOutProps }) => (
      <div>{handleTransactionStatus(data.status)}</div>
    ),
  },
]

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
