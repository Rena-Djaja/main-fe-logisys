'use client'

import React, { FC } from 'react'
import {
  ComplimentaryProps,
  DiscountProps,
  ProductProps,
  ProductVariantProps,
} from '@/type/Product'
import { ArrowLeft } from 'lucide-react'
import { cn, formattedDate, thousandFormat } from '@/lib/utils'
import StatusBadge from '@/components/shared/StatusBadge/StatusBadge'
import CustomTabs from '@/components/shared/CustomTabs/CustomTabs'
import { Separator } from '@/components/shared/ui/separator'

export interface VariantProps {
  activeVariantIdx?: number
  productDetails?: ProductProps
  variants?: ProductVariantProps[]
  handleToggleVariant: (type: 'open' | 'close', idx?: number) => void
}

const Variants: FC<VariantProps> = (props) => {
  const { activeVariantIdx, productDetails, variants, handleToggleVariant } =
    props

  const activeVariant = variants?.[Number(activeVariantIdx)]

  const tabs = [
    {
      key: 'discount',
      title: 'Discount',
      component: () => (
        <Discount
          discounts={activeVariant?.discount}
          productDetails={productDetails}
        />
      ),
    },
    {
      key: 'complimentary',
      title: 'Complimentary',
      component: () => (
        <Complimentary
          complimentary={activeVariant?.complimentary}
          productDetails={productDetails}
        />
      ),
    },
  ]

  return (
    <div className="w-full flex flex-col gap-8">
      <button
        onClick={() => handleToggleVariant('close')}
        className="flex gap-1 items-center cursor-pointer"
      >
        <ArrowLeft className="size-4 text-muted-foreground/70" />
        <span className="font-medium text-[0.8rem] text-muted-foreground/70">
          Back to details
        </span>
      </button>
      <div className="w-full flex items-center space-x-4">
        <div className="w-full flex flex-col gap-9">
          <div className="flex flex-col">
            <span className="font-semibold text-muted-foreground text-[0.785rem]">
              {productDetails?.name}
            </span>
            <span className="font-semibold text-[1.55rem] -mt-1">
              {activeVariant?.name}
            </span>
            <StatusBadge isActive={Boolean(activeVariant?.is_active)} />
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <span className="font-semibold">Price</span>
            <div className="w-full grid grid-cols-2">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-[0.75rem] text-muted-foreground">
                  Buy
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-[0.95rem]">
                    Rp
                    {thousandFormat(
                      Number(productDetails?.base_price) +
                        Number(activeVariant?.extra_base_price)
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold text-[0.75rem] text-muted-foreground">
                  Sell
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-[0.95rem]">
                    Rp
                    {thousandFormat(
                      Number(productDetails?.selling_price) +
                        Number(activeVariant?.extra_selling_price)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {productDetails?.category !== 'complimentary' && (
            <div className="mt-8 flex flex-col gap-4">
              <CustomTabs tabs={tabs} activeTab={tabs[0].key} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Variants

const Discount = ({
  discounts = [],
  productDetails,
}: {
  discounts: DiscountProps[] | undefined
  productDetails: ProductProps | undefined
}) => {
  if (!discounts || !discounts.length) {
    return (
      <div className="py-8 w-full flex items-center justify-center text-[0.89rem] italic">
        No discount available.
      </div>
    )
  }

  return (
    <div className="mt-4 w-full flex flex-col">
      {discounts.map((each, idx) => (
        <div key={idx} className="text-[0.85rem]">
          <div className="w-full flex flex-col gap-2 px-8">
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Discount Name
              </span>
              <span className="capitalize font-medium">{each.name}</span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Description
              </span>
              <span className="capitalize font-medium">
                {each.description ?? '-'}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Combined Promo
              </span>
              <span
                className={cn(
                  'capitalize font-medium',
                  each.is_stacked ? 'text-chart-2' : 'text-destructive'
                )}
              >
                {each.is_stacked ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">Type</span>
              <span className="capitalize font-medium">{each.type}</span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Min. Quantity
              </span>
              <span className="capitalize font-medium">
                {each.quantity} {productDetails?.unit}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">Amount</span>
              <span className="capitalize font-medium">
                Rp{thousandFormat(each.amount)}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Payment Type
              </span>
              <span className="capitalize font-medium">
                {each.payment_type}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Start Date
              </span>
              <span className="capitalize font-medium">
                {formattedDate(each.start_date)}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                End Date
              </span>
              <span className="capitalize font-medium">
                {formattedDate(each.end_date)}
              </span>
            </div>
          </div>
          {idx + 1 < discounts.length && <Separator className="my-6" />}
        </div>
      ))}
    </div>
  )
}
const Complimentary = ({
  complimentary = [],
  productDetails,
}: {
  complimentary: ComplimentaryProps[] | undefined
  productDetails: ProductProps | undefined
}) => {
  if (!complimentary || !complimentary.length) {
    return (
      <div className="py-8 w-full flex items-center justify-center text-[0.89rem] italic">
        No complimentary available.
      </div>
    )
  }

  return (
    <div className="mt-4 w-full flex flex-col">
      {complimentary.map((each, idx) => (
        <div key={idx} className="text-[0.85rem]">
          <div className="w-full flex flex-col gap-2 px-8">
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Complimentary Name
              </span>
              <span className="capitalize font-medium">{each.name}</span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Description
              </span>
              <span className="capitalize font-medium">
                {each.description || '-'}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Combined Promo
              </span>
              <span
                className={cn(
                  'capitalize font-medium',
                  each.is_stacked ? 'text-chart-2' : 'text-destructive'
                )}
              >
                {each.is_stacked ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Quantity
              </span>
              <span className="capitalize font-medium">
                {each.quantity} {productDetails?.unit}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Payment Type
              </span>
              <span className="capitalize font-medium">
                {each.payment_type}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                Start Date
              </span>
              <span className="capitalize font-medium">
                {formattedDate(each.start_date)}
              </span>
            </div>
            <div className="flex justify-between items-center gap-3">
              <span className="font-medium text-muted-foreground">
                End Date
              </span>
              <span className="capitalize font-medium">
                {formattedDate(each.end_date)}
              </span>
            </div>
            <div className="mt-4 w-full flex flex-col gap-4">
              <span className="font-medium text-[1.125rem]">Items</span>
              <div className="w-full flex flex-col">
                {each.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="w-full flex flex-col gap-2">
                    <div
                      key={itemIdx}
                      className="flex justify-between items-center gap-3"
                    >
                      <span className="font-medium text-muted-foreground">
                        Product
                      </span>
                      <span className="capitalize font-medium">
                        {item.product_name} - {item.variant_name}
                      </span>
                    </div>
                    <div
                      key={`item-${itemIdx}`}
                      className="flex justify-between items-center gap-3"
                    >
                      <span className="font-medium text-muted-foreground">
                        Quantity
                      </span>
                      <span className="capitalize font-medium">
                        {item.amount} {item.unit}
                      </span>
                    </div>
                    {itemIdx + 1 < each.items.length && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {idx + 1 < complimentary.length && <Separator className="my-6" />}
        </div>
      ))}
    </div>
  )
}
