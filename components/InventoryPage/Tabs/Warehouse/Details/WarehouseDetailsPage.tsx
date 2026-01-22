'use client'

import React, { FC } from 'react'
import { CommonFormProps } from '@/type/Common'
import CustomTable from '@/components/shared/CustomTable/CustomTable'
import { inventoryDetailsHeaders } from '@/components/InventoryPage/Resource'
import useWarehouseDetails from '@/components/InventoryPage/Tabs/Warehouse/Details/useWarehouseDetails'
import { Funnel, MapPin, Warehouse } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu'
import { Button } from '@/components/shared/ui/button'
import { ButtonVariant } from '@/type/FormInputs'
import { ProductListFilterProps } from '@/type/Product'
import { cn } from '@/lib/utils'
import CommonPageLoading from '@/components/shared/Loading/CommonPageLoading'

const WarehouseDetailsPage: FC<CommonFormProps> = (props) => {
  const {
    warehouseDetails,
    isValidating,
    stockList,
    isStockListValidating,
    filter,
    filterMenu,
    search,
    resetFilter,
  } = useWarehouseDetails(props)

  if (isValidating) {
    return <CommonPageLoading />
  }

  return (
    <div className="mt-8 w-full flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="font-semibold text-[2rem]">Warehouse Details</h1>
      </div>
      <div className="w-full flex flex-col gap-4 pl-4">
        <div className="w-full flex items-center gap-3">
          <Warehouse className="size-4.5" />
          <span className="font-semibold text-[0.875rem]">
            {warehouseDetails?.name}
          </span>
        </div>
        <div className="w-full flex items-center gap-3">
          <MapPin className="size-4.5" />
          <span className="font-semibold text-[0.875rem]">
            {warehouseDetails?.location}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex justify-between">
          <div className="w-full flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={ButtonVariant.OUTLINE}>
                  <div className="w-full flex items-center gap-2">
                    <Funnel
                      className={cn(
                        'size-4',
                        (filter.product_type || filter.product_id) &&
                          'fill-accent-foreground text-primary-foreground'
                      )}
                    />
                    <span>Filter</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  {Object.entries(filterMenu).map(([k, v]) => (
                    <DropdownMenuSub key={k}>
                      <DropdownMenuSubTrigger>
                        {v.category}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {v.items.map((item, itemIdx) => (
                            <DropdownMenuItem
                              key={itemIdx}
                              onClick={() =>
                                search(
                                  k as keyof ProductListFilterProps,
                                  item.value
                                )
                              }
                            >
                              <div className="w-full flex items-center justify-between gap-4">
                                <span>{item.title}</span>
                                {filter[k as keyof ProductListFilterProps] ===
                                  item.value && (
                                  <div className="size-[0.45rem] bg-chart-2 rounded-full" />
                                )}
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuGroup>
                {(filter.product_id || filter.product_type) && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={resetFilter}
                    >
                      Reset Filter
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <CustomTable
        headers={inventoryDetailsHeaders}
        data={stockList || []}
        isLoading={isStockListValidating}
        onChange={() => null}
        page={0}
        perPage={0}
        totalData={0}
        onRowClick={() => null}
        onUpdate={() => null}
        onDelete={() => null}
        withAction={false}
        withPagination={false}
      />
    </div>
  )
}

export default WarehouseDetailsPage
