'use client'

import React, { FC } from 'react'
import { ChevronRight, Factory, ScanBarcode, Weight } from 'lucide-react'
import { formattedDate, thousandFormat } from '@/lib/utils'
import { ProductProps, ProductVariantProps } from '@/type/Product'

interface DetailsProps {
  productDetails?: ProductProps
  variants?: ProductVariantProps[]
  handleToggleVariant: (type: 'open' | 'close', idx?: number) => void
}

const Details: FC<DetailsProps> = (props) => {
  const { productDetails, variants, handleToggleVariant } = props

  return (
    <div className="w-full flex items-center space-x-4">
      <div className="w-full flex flex-col gap-9">
        <div className="flex flex-col">
          <span className="font-semibold text-muted-foreground text-[0.785rem]">
            {productDetails?.sku}
          </span>
          <span className="font-semibold text-[1.55rem] -mt-1">
            {productDetails?.name}
          </span>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex items-center gap-2">
            <Factory className="size-5" />
            <span className="font-semibold text-[0.85rem]">
              {productDetails?.supplier_name}
            </span>
          </div>
          <div className="w-full flex items-center gap-2">
            <Weight className="size-5" />
            <span className="font-semibold text-[0.85rem]">
              {productDetails?.unit}
            </span>
          </div>
          <div className="w-full flex items-center gap-2">
            <ScanBarcode className="size-5" />
            <span className="font-semibold text-[0.85rem] capitalize">
              {productDetails?.category.replace('_', ' ')}
            </span>
          </div>
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
                  Rp{thousandFormat(productDetails?.base_price)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-[0.75rem] text-muted-foreground">
                Sell
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-[0.95rem]">
                  Rp{thousandFormat(productDetails?.selling_price)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <span className="font-semibold">Variants</span>
          <div className="w-full flex flex-col gap-3">
            {variants?.map((each, idx) => (
              <button
                key={idx}
                className="w-full flex justify-between items-center group cursor-pointer"
                onClick={() => handleToggleVariant('open', idx)}
              >
                <span className="font-medium text-[0.85rem] group-hover:underline">
                  {each.name}
                </span>
                <ChevronRight className="size-5" />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[0.75rem] text-muted-foreground">
              Created
            </span>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[0.85rem]">
                {formattedDate(productDetails?.created_at, true)}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[0.75rem] text-muted-foreground">
              Last Updated
            </span>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-[0.85rem]">
                {formattedDate(productDetails?.updated_at, true)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
