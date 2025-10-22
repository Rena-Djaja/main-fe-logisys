'use client'

import React, { FC } from 'react'
import { CommonFormProps } from '@/type/Common'
import useAssignArea from '@/components/UsersPage/AssignAreaPage/useAssignArea'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shared/ui/avatar'
import { Badge } from '@/components/shared/ui/badge'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/shared/ui/empty'
import { TextAlignStart } from 'lucide-react'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import AssignForm from '@/components/UsersPage/AssignAreaPage/AssignForm/AssignForm'

const AssignAreaPage: FC<CommonFormProps> = ({ id }) => {
  const {
    userDetails,
    assignedLocations,
    isFormOpen,
    handleFormState,
    mutate,
  } = useAssignArea({ id })

  return (
    <>
      <AssignForm
        userID={String(id)}
        isOpen={isFormOpen}
        handleClose={handleFormState}
        mutate={mutate}
      />
      <div className="mt-10 w-full flex flex-col gap-14">
        <div className="flex items-center space-x-4">
          <Avatar className="size-[6.5rem] rounded-full">
            <AvatarImage src={'/common/user-placeholder.webp'} alt={''} />
            <AvatarFallback className="rounded-lg">
              {userDetails?.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-[1.75rem]">
              {userDetails?.name}
            </span>
            <span className="text-[0.9rem] font-medium">
              {userDetails?.email}
            </span>
            <Badge className="mt-2 text-[0.65rem]">
              {userDetails?.role_name}
            </Badge>
          </div>
        </div>
        <div className="mt-5 w-full flex flex-col gap-6">
          <h2 className="font-semibold text-[1.25rem]">Assigned Locations</h2>
          {assignedLocations && assignedLocations?.length ? (
            <div>ada nih</div>
          ) : (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <TextAlignStart />
                </EmptyMedia>
                <EmptyTitle>No Assigned Location Yet</EmptyTitle>
                <EmptyDescription>
                  You haven&apos;t assigned this user to any location yet. Get
                  started by assigning a location.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex">
                  <CustomButton
                    label={'Assign New Location'}
                    onClick={handleFormState}
                  />
                </div>
              </EmptyContent>
            </Empty>
          )}
        </div>
      </div>
    </>
  )
}

export default AssignAreaPage
