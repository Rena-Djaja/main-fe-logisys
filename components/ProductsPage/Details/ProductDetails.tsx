'use client'

import React, { FC } from 'react'
import { CommonDetailsComponentProps } from '@/type/Common'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shared/ui/sheet'
import { Skeleton } from '@/components/shared/ui/skeleton'
import useProductDetails from '@/components/ProductsPage/Details/useProductDetails'
import { formattedDate, thousandFormat } from '@/lib/utils'
import { Factory, ScanBarcode, Weight } from 'lucide-react'

const ProductDetails: FC<CommonDetailsComponentProps> = (props) => {
  const { productDetails, isLoading } = useProductDetails(props)

  const { detailsState, handleDetails } = props

  return (
    <Sheet
      open={detailsState.isOpen}
      onOpenChange={() => handleDetails('close')}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Product Details</SheetTitle>
          <SheetDescription>
            View the details of the selected product
          </SheetDescription>
        </SheetHeader>
        <div className="px-6 mt-2">
          {isLoading ? (
            <DetailsSkeleton />
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex flex-col gap-9">
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
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ProductDetails

const DetailsSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-2">
        <Skeleton className="h-3 w-[15rem]" />
        <Skeleton className="h-3 w-[10rem]" />
        <Skeleton className="h-3 w-[5rem]" />
        <div className="mt-8 flex flex-col gap-6">
          <div className="space-y-1">
            <Skeleton className="h-3 w-[4rem] mt-1" />
            <Skeleton className="h-3 w-[10rem]" />
            <Skeleton className="h-3 w-[8rem]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-[4rem] mt-1" />
            <Skeleton className="h-3 w-[10rem]" />
            <Skeleton className="h-3 w-[8rem]" />
          </div>
        </div>
      </div>
    </div>
  )
}
