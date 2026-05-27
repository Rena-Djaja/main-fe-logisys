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
import { MapPinPlus } from 'lucide-react'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import AssignForm from '@/components/UsersPage/AssignAreaPage/AssignForm/AssignForm'
import { ButtonType } from '@/type/FormInputs'
import MapProvider from '@/components/shared/MapProvider/MapProvider'
import AssignedAreaList from '@/components/UsersPage/AssignAreaPage/List/AssignedAreaList'
import { Tabs, TabsList, TabsTrigger } from '@/components/shared/ui/tabs'
import { TAB_STYLES } from '@/components/UsersPage/AssignAreaPage/Resource'
import { ListTabStyle } from '@/type/SalesArea'

const AssignAreaPage: FC<CommonFormProps> = ({ id }) => {
  const {
    userDetails,
    salesAreaList,
    isValidating,
    isFormOpen,
    activeTab,
    handleFormState,
    mutate,
    handleTabChange,
    // onDelete,
  } = useAssignArea({ id })

  return (
    <>
      <MapProvider>
        <AssignForm
          userID={String(id)}
          isOpen={isFormOpen}
          handleClose={handleFormState}
          mutateList={mutate}
        />
      </MapProvider>
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
              Daerah Terdaftar
            </h2>
            <div className="w-full flex gap-4 justify-end">
              <Tabs
                value={activeTab}
                onValueChange={(value) =>
                  handleTabChange(value as ListTabStyle)
                }
              >
                <TabsList>
                  {TAB_STYLES.map((style) => (
                    <TabsTrigger
                      key={style.id}
                      value={style.id}
                      onClick={() => handleTabChange(style.id)}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm flex items-center sm:px-3 sm:py-1.5"
                    >
                      {style.icon}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div>
                <CustomButton
                  label={'Daftar Daerah Baru'}
                  icon={MapPinPlus}
                  type={ButtonType.BUTTON}
                  onClick={handleFormState}
                />
              </div>
            </div>
          </div>
          <MapProvider>
            <AssignedAreaList
              activeTab={activeTab}
              assignedAreas={salesAreaList}
              isLoading={isValidating}
              handleFormState={handleFormState}
            />
          </MapProvider>
        </div>
      </div>
    </>
  )
}

export default AssignAreaPage
