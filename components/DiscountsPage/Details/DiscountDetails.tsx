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
import useDiscountDetails from '@/components/DiscountsPage/Details/useDiscountDetails'
import Details from '@/components/DiscountsPage/Details/Section/Details'
import Logs from '@/components/DiscountsPage/Details/Section/Logs'
import Items from '@/components/DiscountsPage/Details/Section/Items'

const DiscountDetails: FC<CommonDetailsComponentProps> = (props) => {
  const { isLoading } = useDiscountDetails(props)
  const { detailsState, handleDetails } = props

  return (
    <Sheet
      open={detailsState.isOpen}
      onOpenChange={() => handleDetails('close')}
    >
      <SheetContent className="overflow-auto pb-10">
        <SheetHeader>
          <SheetTitle>Discount Details</SheetTitle>
          <SheetDescription>
            View the details of the selected discount
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 mt-2">
          {isLoading ? (
            <DetailsSkeleton />
          ) : (
            <div className="w-full flex flex-col gap-6">
              <Details />
              <Items />
              <Logs />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default DiscountDetails

const DetailsSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-14 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[15rem]" />
        <Skeleton className="h-3 w-[10rem]" />
        <Skeleton className="h-3 w-[5rem]" />
      </div>
    </div>
  )
}
