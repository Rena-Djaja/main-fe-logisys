'use client'

import React, { FC } from 'react'
import { CommonDetailsComponentProps } from '@/type/Common'
import useSupplierDetails from '@/components/SuppliersPage/Details/useSupplierDetails'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shared/ui/sheet'
import { Skeleton } from '@/components/shared/ui/skeleton'
import { MapPin, Phone } from 'lucide-react'
import { formattedDate } from '@/lib/utils'

const SupplierDetails: FC<CommonDetailsComponentProps> = (props) => {
  const { supplierDetails, isLoading } = useSupplierDetails(props)

  const { detailsState, handleDetails } = props

  return (
    <Sheet
      open={detailsState.isOpen}
      onOpenChange={() => handleDetails('close')}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>User Details</SheetTitle>
          <SheetDescription>
            View the details of the selected user
          </SheetDescription>
        </SheetHeader>
        <div className="px-6 mt-2">
          {isLoading ? (
            <DetailsSkeleton />
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-[1.75rem]">
                  {supplierDetails?.name}
                </span>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  <span className="font-medium text-[0.85rem]">
                    {supplierDetails?.address}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4" />
                  <span className="font-medium text-[0.85rem]">
                    {supplierDetails?.phone_number || '-'}
                  </span>
                </div>
                <div className="mt-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-[0.75rem] text-muted-foreground">
                      Created
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-[0.85rem]">
                        {formattedDate(supplierDetails?.created_at, true)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-[0.75rem] text-muted-foreground">
                      Last Updated
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-[0.85rem]">
                        {formattedDate(supplierDetails?.updated_at, true)}
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

export default SupplierDetails

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
