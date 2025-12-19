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
import Details from '@/components/ProductsPage/Details/Sections/Details'
import Variants from '@/components/ProductsPage/Details/Sections/Variants'
import { ScrollArea } from '@/components/shared/ui/scroll-area'

const ProductDetails: FC<CommonDetailsComponentProps> = (props) => {
  const {
    productDetails,
    variants,
    isLoading,
    activeVariantIdx,
    handleToggleVariant,
    handleEdit,
    handleUpdateStatus,
  } = useProductDetails(props)

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
        <ScrollArea className="h-[88%]">
          <div className="px-6 mt-2">
            {isLoading.details ? (
              <DetailsSkeleton />
            ) : typeof activeVariantIdx === 'number' ? (
              <Variants
                activeVariantIdx={activeVariantIdx}
                productDetails={productDetails}
                variants={variants}
                handleToggleVariant={handleToggleVariant}
                handleEdit={handleEdit}
                handleUpdateStatus={handleUpdateStatus}
              />
            ) : (
              <Details
                productDetails={productDetails}
                variants={variants}
                handleToggleVariant={handleToggleVariant}
                handleEdit={handleEdit}
              />
            )}
          </div>
        </ScrollArea>
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
