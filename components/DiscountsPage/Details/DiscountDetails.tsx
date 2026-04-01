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
import { formattedDate } from '@/lib/utils'
import StatusBadge from '@/components/shared/StatusBadge/StatusBadge'

const DiscountDetails: FC<CommonDetailsComponentProps> = (props) => {
  const { discountDetails, isLoading } = useDiscountDetails(props)
  const { detailsState, handleDetails } = props

  return (
    <Sheet
      open={detailsState.isOpen}
      onOpenChange={() => handleDetails('close')}
    >
      <SheetContent>
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
              <div className="w-full flex flex-col gap-1">
                <span className="font-semibold text-[1.5rem]">
                  {discountDetails?.name}
                </span>
                <StatusBadge isActive={!!discountDetails?.is_active} />
              </div>
              <div className="w-full p-4 border rounded-md grid lg:grid-cols-2 gap-8">
                <div className="lg:col-span-2 w-full flex flex-col gap-0.5">
                  <span className="font-semibold text-[0.825rem]">
                    Description
                  </span>
                  <span className="text-[0.875rem]">
                    {discountDetails?.description}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-0.5">
                  <span className="font-semibold text-[0.825rem]">
                    Start Date
                  </span>
                  <span className="text-[0.875rem]">
                    {formattedDate(discountDetails?.start_date)}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-0.5">
                  <span className="font-semibold text-[0.825rem]">
                    End Date
                  </span>
                  <span className="text-[0.875rem]">
                    {formattedDate(discountDetails?.end_date)}
                  </span>
                </div>
                <div className="w-full flex flex-col gap-0.5">
                  <span className="font-semibold text-[0.825rem]">
                    Valid Thru
                  </span>
                  <span className="text-[0.875rem]">
                    {discountDetails?.valid_thru_days} days
                  </span>
                </div>
                <div className="w-full flex flex-col gap-0.5">
                  <span className="font-semibold text-[0.825rem]">
                    Combinable Disc
                  </span>
                  <span className="text-[0.875rem]">
                    {discountDetails?.is_combinable ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-[0.75rem] text-muted-foreground">
                    Created
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-[0.85rem]">
                      {formattedDate(discountDetails?.created_at, true)}
                    </span>
                    <span className="text-[0.85rem]">
                      by <b>{discountDetails?.created_by_name}</b>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-[0.75rem] text-muted-foreground">
                    Last Updated
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-[0.85rem]">
                      {formattedDate(discountDetails?.updated_at, true)}
                    </span>
                    <span className="text-[0.85rem]">
                      by <b>{discountDetails?.updated_by_name}</b>
                    </span>
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
