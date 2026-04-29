'use client'

import React from 'react'
import CustomTable from '@/components/shared/CustomTable/CustomTable'
import { Plus } from 'lucide-react'
import SearchInput from '@/components/shared/SearchInput/SearchInput'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import {
  userCustomActions,
  userListHeaders,
} from '@/components/UsersPage/Resource'
import useUsers from '@/components/UsersPage/useUsers'
import UserDetails from '@/components/UsersPage/Details/UserDetails'
import { ButtonType } from '@/type/FormInputs'
import { UserProps } from '@/type/User'

const UsersPage = () => {
  const {
    userList,
    userId,
    isValidating,
    filter,
    detailsState,
    search,
    onRowClick,
    onAdd,
    onUpdate,
    onDelete,
    handleDetails,
  } = useUsers()

  return (
    <>
      <UserDetails detailsState={detailsState} handleDetails={handleDetails} />
      <div className="mt-8 w-full flex flex-col gap-10">
        <div className="w-full flex flex-col">
          <h1 className="font-semibold text-[2rem]">List Pengguna</h1>
          <span className="font-medium text-[0.95rem]">
            Kelola semua pengguna dibawah ini
          </span>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-between">
            <div className="w-full flex gap-2 font-semibold text-[1.25rem]">
              <span>Semua Pengguna</span>
              <span className="opacity-70">
                {userList?.pagination.total_data}
              </span>
            </div>
            <div className="w-full flex gap-4 justify-end">
              <div className="w-full max-w-[15rem]">
                <SearchInput onChange={(val) => search('search', val)} />
              </div>
              <div>
                <CustomButton
                  label={'Tambah'}
                  icon={Plus}
                  type={ButtonType.BUTTON}
                  onClick={onAdd}
                />
              </div>
            </div>
          </div>
          <CustomTable
            headers={userListHeaders}
            data={userList?.users || []}
            isLoading={isValidating}
            page={filter.page}
            perPage={filter.per_page}
            totalData={userList?.pagination.total_data || 0}
            onChange={(val) => search('page', val)}
            onRowClick={onRowClick}
            allowDelete={(row: UserProps) => row.id !== userId}
            onUpdate={onUpdate}
            onDelete={onDelete}
            customActions={userCustomActions}
            customActionParam={'role_id'}
            allowedCustomAction={(roleID) => [1, 3].includes(roleID)}
          />
        </div>
      </div>
    </>
  )
}

export default UsersPage
