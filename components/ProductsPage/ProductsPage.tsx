'use client'

import React from 'react'
import SearchInput from '@/components/shared/SearchInput/SearchInput'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { Funnel, Plus } from 'lucide-react'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import CustomTable from '@/components/shared/CustomTable/CustomTable'
import { userCustomActions } from '@/components/UsersPage/Resource'
import useProducts from '@/components/ProductsPage/useProducts'
import { productListHeaders } from '@/components/ProductsPage/Resource'
import ProductDetails from '@/components/ProductsPage/Details/ProductDetails'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu'
import { Button } from '@/components/shared/ui/button'
import { ProductListRequest } from '@/type/Product'

const ProductsPage = () => {
  const {
    productList,
    isValidating,
    filter,
    filterMenu,
    detailsState,
    search,
    onAdd,
    onRowClick,
    onUpdate,
    onDelete,
    handleDetails,
  } = useProducts()

  return (
    <>
      <ProductDetails
        detailsState={detailsState}
        handleDetails={handleDetails}
      />
      <div className="mt-8 w-full flex flex-col gap-10">
        <div className="w-full flex flex-col">
          <h1 className="font-semibold text-[2rem]">Product List</h1>
          <span className="font-medium text-[0.95rem]">
            Manage all the product listed below
          </span>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-between">
            <div className="w-full flex gap-2 font-semibold text-[1.25rem]">
              <span>All products</span>
              <span className="opacity-70">
                {productList?.pagination.total_data}
              </span>
            </div>
            <div className="w-full flex gap-4 justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={ButtonVariant.OUTLINE}>
                    <div className="w-full flex items-center gap-2">
                      <Funnel className={'size-4'} />
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
                                    k as keyof ProductListRequest,
                                    item.value
                                  )
                                }
                              >
                                <div className="w-full flex items-center justify-between gap-4">
                                  <span>{item.title}</span>
                                  {filter[k as keyof ProductListRequest] ===
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
                </DropdownMenuContent>
              </DropdownMenu>
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
            headers={productListHeaders}
            data={productList?.data || []}
            isLoading={isValidating}
            page={filter.page}
            perPage={filter.per_page}
            totalData={productList?.pagination.total_data || 0}
            onChange={(val) => search('page', val)}
            onRowClick={onRowClick}
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

export default ProductsPage
