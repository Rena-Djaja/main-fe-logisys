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
import { MapPinPlus, TextAlignStart } from 'lucide-react'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import AssignForm from '@/components/UsersPage/AssignAreaPage/AssignForm/AssignForm'
import CustomTable from '@/components/shared/CustomTable/CustomTable'
import SearchInput from '@/components/shared/SearchInput/SearchInput'
import { ButtonType } from '@/type/FormInputs'

const AssignAreaPage: FC<CommonFormProps> = ({ id }) => {
  const {
    userDetails,
    assignedLocations,
    isLocationLoading,
    isFormOpen,
    filter,
    handleFormState,
    mutate,
    search,
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
          <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center">
            <h2 className="w-full font-semibold text-[1.25rem]">
              Assigned Locations
            </h2>
            <div className="w-full flex gap-4 justify-end">
              <div className="w-full max-w-[15rem]">
                <SearchInput onChange={(val) => search('search', val)} />
              </div>
              <div>
                <CustomButton
                  label={'Assign'}
                  icon={MapPinPlus}
                  type={ButtonType.BUTTON}
                  onClick={handleFormState}
                />
              </div>
            </div>
          </div>
          {!isLocationLoading && !assignedLocations?.data?.length ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <TextAlignStart />
                </EmptyMedia>
                <EmptyTitle>
                  {filter.search
                    ? `Location "${filter.search}" Not Found`
                    : 'No Assigned Location Yet'}
                </EmptyTitle>
                <EmptyDescription>
                  {filter.search
                    ? `You haven't assigned "${filter.search}" to this user. You can add this location by clicking the button below. `
                    : "You haven't assigned this user to any location yet. Get started by assigning a location."}
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
          ) : (
            <div className="w-full">
              <CustomTable
                headers={[{ key: 'location_name', title: 'Location Name' }]}
                data={assignedLocations?.data || []}
                isLoading={isLocationLoading}
                onChange={() => console.log('hi')}
                page={assignedLocations?.pagination.page || filter.page}
                perPage={assignedLocations?.pagination.limit || filter.per_page}
                totalData={assignedLocations?.pagination.total_data || 0}
                onRowClick={(id) => console.log(id)}
                onUpdate={() => null}
                onDelete={() => null}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AssignAreaPage
