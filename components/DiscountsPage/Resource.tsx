import { TableHeaderProps } from '@/type/CustomTable'
import StatusBadge from '@/components/shared/StatusBadge/StatusBadge'
import { DiscountRuleProps } from '@/type/Discounts'
import { formattedDate } from '@/lib/utils'

export const discountListHeaders: TableHeaderProps[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'description',
    title: 'Description',
  },
  {
    key: 'start_date',
    title: 'Start Date',
    customComponent: ({ data }: { data: DiscountRuleProps }) => (
      <span>{formattedDate(data.start_date)}</span>
    ),
  },
  {
    key: 'end_date',
    title: 'End Date',
    customComponent: ({ data }: { data: DiscountRuleProps }) => (
      <span>{formattedDate(data.end_date)}</span>
    ),
  },
  {
    key: 'valid_thru_days',
    title: 'Valid Thru',
    customComponent: ({ data }: { data: DiscountRuleProps }) => (
      <span>{data.valid_thru_days} days</span>
    ),
  },
  {
    key: 'is_active',
    title: 'Status',
    customComponent: ({ data }: { data: DiscountRuleProps }) => (
      <StatusBadge isActive={data.is_active} />
    ),
  },
]
