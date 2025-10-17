'use client'

import React, { FC } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shared/ui/sheet'
import { CommonDetailsComponentProps } from '@/type/Common'
import { Skeleton } from '@/components/shared/ui/skeleton'
import useUserDetails from '@/components/UsersPage/Details/useUserDetails'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shared/ui/avatar'
import { Badge } from '@/components/shared/ui/badge'

const UserDetails: FC<CommonDetailsComponentProps> = (props) => {
  const { userDetails, isLoading } = useUserDetails(props)
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
              <Avatar className="size-14 rounded-full">
                <AvatarImage src={'/common/user-placeholder.webp'} alt={''} />
                <AvatarFallback className="rounded-lg">
                  {userDetails?.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-[1.125rem]">
                  {userDetails?.name}
                </span>
                <span className="text-[0.85rem]">{userDetails?.email}</span>
                <Badge className="mt-1 text-[0.65rem]">
                  {userDetails?.role_name}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default UserDetails

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
