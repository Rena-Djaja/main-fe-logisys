import { TableHeaderProps } from '@/type/CustomTable'
import StatusBadge from '@/components/shared/StatusBadge/StatusBadge'
import {
  DiscountItemProps,
  DiscountRuleProps,
  MappedDiscountItems,
  PaymentSchemaProps,
  VariantConvertionProps,
} from '@/type/Discounts'
import { formattedDate } from '@/lib/utils'

export const mapDiscountsByProductId = (
  data: DiscountItemProps[]
): MappedDiscountItems[] => {
  const groupedByProduct = data.reduce<Record<number, DiscountItemProps[]>>(
    (acc, item) => {
      if (!acc[item.product_id]) {
        acc[item.product_id] = []
      }
      acc[item.product_id].push(item)
      return acc
    },
    {}
  )

  return Object.values(groupedByProduct).map((items) => {
    const firstItem = items[0]
    const groupedByVariant = items.reduce<Record<number, DiscountItemProps[]>>(
      (acc, item) => {
        if (!acc[item.product_variant_id]) {
          acc[item.product_variant_id] = []
        }
        acc[item.product_variant_id].push(item)
        return acc
      },
      {}
    )

    const variants: VariantConvertionProps[] = Object.values(
      groupedByVariant
    ).map((variantItems) => {
      const variantFirstItem = variantItems[0]

      const createPaymentItem = (
        item: DiscountItemProps
      ): PaymentSchemaProps => ({
        id: item.id,
        min_quantity: String(item.min_quantity ?? ''),
        discount_amount: String(item.discount_amount),
        max_quantity: String(item.max_quantity ?? ''),
      })

      const cashItems = variantItems
        .filter((item) => item.payment_type === 'cash')
        .map(createPaymentItem)

      const creditItems = variantItems
        .filter((item) => item.payment_type === 'credit')
        .map(createPaymentItem)

      return {
        product_variant_id: variantFirstItem.product_variant_id,
        name: variantFirstItem.variant_name,
        is_active: variantFirstItem.is_active,
        discount_type: variantFirstItem.discount_type,
        limit: String(variantFirstItem.limit),
        unit: variantFirstItem.unit,
        used_count: String(variantFirstItem.used_count),
        cash: cashItems,
        credit: creditItems,
      }
    })

    console.log(variants)

    return {
      product_id: firstItem.product_id,
      name: firstItem.product_name,
      variants,
    }
  })
}

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
