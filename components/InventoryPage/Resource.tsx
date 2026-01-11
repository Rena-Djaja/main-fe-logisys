import { TableHeaderProps } from '@/type/CustomTable'
import { TruckProps, WarehouseProps } from '@/type/Inventory'
import { formattedDate } from '@/lib/utils'

export const warehouseListHeaders: TableHeaderProps[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'location',
    title: 'Location',
  },
  {
    key: 'created_at',
    title: 'Created At',
    customComponent: ({ data }: { data: WarehouseProps }) => (
      <span>{formattedDate(data.created_at, true)}</span>
    ),
  },
  {
    key: 'updated_at',
    title: 'Last Updated',
    customComponent: ({ data }: { data: WarehouseProps }) => (
      <span>{formattedDate(data.updated_at, true)}</span>
    ),
  },
]

export const truckListHeaders: TableHeaderProps[] = [
  {
    key: 'plate_number',
    title: 'Plate Number',
  },
  {
    key: 'salesman_name',
    title: 'Salesman Name',
  },
  {
    key: 'created_at',
    title: 'Created At',
    customComponent: ({ data }: { data: TruckProps }) => (
      <span>{formattedDate(data.created_at, true)}</span>
    ),
  },
  {
    key: 'updated_at',
    title: 'Last Updated',
    customComponent: ({ data }: { data: TruckProps }) => (
      <span>{formattedDate(data.updated_at, true)}</span>
    ),
  },
]
