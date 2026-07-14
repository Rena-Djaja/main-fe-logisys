'use client'

import React from 'react'
import SearchInput from '@/components/shared/SearchInput/SearchInput'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { Plus } from 'lucide-react'
import { ButtonType } from '@/type/FormInputs'
import CustomTable from '@/components/shared/CustomTable/CustomTable'
import useSuppliers from '@/components/SuppliersPage/useSuppliers'
import { supplierListHeaders } from '@/components/SuppliersPage/Resource'
import SupplierDetails from '@/components/SuppliersPage/Details/SupplierDetails'

const SuppliersPage = () => {
  const {
    supplierList,
    isValidating,
    filter,
    detailsState,
    handleDetails,
    search,
    onAdd,
    onRowClick,
    onUpdate,
    onDelete,
  } = useSuppliers()

  return (
    <>
      <SupplierDetails
        detailsState={detailsState}
        handleDetails={handleDetails}
      />
      <div className="mt-8 w-full flex flex-col gap-10">
        <div className="w-full flex flex-col">
          <h1 className="font-semibold text-[2rem]">Supplier List</h1>
          <span className="font-medium text-[0.95rem]">
            Manage all the supplier listed below
          </span>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-between">
            <div className="w-full flex gap-2 font-semibold text-[1.25rem]">
              <span>All suppliers</span>
              <span className="opacity-70">
                {supplierList?.pagination.total_data}
              </span>
            </div>
            <div className="w-full flex gap-4 justify-end">
              <div className="w-full max-w-[15rem]">
                <SearchInput onChange={(val) => search('search', val)} />
              </div>
              <div>
                <CustomButton
                  label={'Add New'}
                  icon={Plus}
                  type={ButtonType.BUTTON}
                  onClick={onAdd}
                />
              </div>
            </div>
          </div>
          <CustomTable
            headers={supplierListHeaders}
            data={supplierList?.suppliers || []}
            isLoading={isValidating}
            page={filter.page}
            perPage={filter.per_page}
            totalData={supplierList?.pagination.total_data || 0}
            onChange={(val) => search('page', val)}
            onRowClick={onRowClick}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </div>
      </div>
    </>
  )
}

export default SuppliersPage
