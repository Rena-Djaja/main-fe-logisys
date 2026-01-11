'use client'

import React from 'react'
import SearchInput from '@/components/shared/SearchInput/SearchInput'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { Plus } from 'lucide-react'
import { ButtonType } from '@/type/FormInputs'
import CustomTable from '@/components/shared/CustomTable/CustomTable'
import useWarehouse from '@/components/InventoryPage/Tabs/Warehouse/useWarehouse'
import { warehouseListHeaders } from '@/components/InventoryPage/Resource'

const Warehouse = () => {
  const { filter, warehouseList, isValidating, search, onAdd, onUpdate } =
    useWarehouse()

  return (
    <div className="mt-8 w-full flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="font-semibold text-[2rem]">Warehouse List</h1>
        <span className="font-medium text-[0.95rem]">
          Manage all the warehouse listed below
        </span>
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex justify-between">
          <div className="w-full flex gap-2 font-semibold text-[1.25rem]">
            <span>All warehouse</span>
            <span className="opacity-70">
              {warehouseList?.pagination.total_data}
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
          headers={warehouseListHeaders}
          data={warehouseList?.data || []}
          isLoading={isValidating}
          allowDetails={false}
          page={filter.page}
          perPage={filter.per_page}
          totalData={0}
          onChange={(val) => search('page', val)}
          onRowClick={() => null}
          onUpdate={onUpdate}
          onDelete={() => null}
        />
      </div>
    </div>
  )
}

export default Warehouse
