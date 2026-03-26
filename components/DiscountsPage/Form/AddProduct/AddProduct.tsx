'use client'

import React, { FC } from 'react'
import useAddProduct from '@/components/DiscountsPage/Form/AddProduct/useAddProduct'
import CustomModal from '@/components/shared/CustomModal/CustomModal'
import { ProductSchemaProps } from '@/type/Discounts'
import CustomTable from '@/components/shared/CustomTable/CustomTable'
import { productListHeaders } from '@/components/DiscountsPage/Form/Resource'
import SearchInput from '@/components/shared/SearchInput/SearchInput'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/shared/ui/badge'
import { XIcon } from 'lucide-react'
import { ButtonType } from '@/type/FormInputs'
import CustomButton from '@/components/shared/FormInputs/CustomButton'

const AddProduct: FC<ProductSchemaProps> = (props) => {
  const {
    productList,
    productFilter,
    isProductListLoading,
    isSubmitting,
    prefetchedProduct,
    selectedProduct,
    setSelectedProduct,
    handleSelectRow,
    resetSelected,
    search,
    onSubmit,
  } = useAddProduct(props)
  const { open, onClose } = props

  return (
    <CustomModal
      title={'Select Product'}
      description={'Add one or more product'}
      open={open}
      onClose={onClose}
      size={'6xl'}
    >
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex gap-6 justify-end items-center">
          <Badge
            asChild
            variant={'secondary'}
            className={cn(
              !selectedProduct.size && 'hidden',
              'rounded-sm p-1.5'
            )}
          >
            <div className="flex gap-1 items-end">
              <span className="font-medium">
                {selectedProduct.size} rows selected
              </span>
              <button
                type={ButtonType.BUTTON}
                onClick={resetSelected}
                className="cursor-pointer"
              >
                <XIcon className="size-3.5" />
              </button>
            </div>
          </Badge>
          <div className="w-full max-w-[15rem]">
            <SearchInput onChange={(val) => search('search', val)} />
          </div>
        </div>
        <CustomTable
          headers={productListHeaders}
          isLoading={isProductListLoading}
          data={productList?.data || []}
          page={productList?.pagination.page || productFilter.page}
          perPage={productList?.pagination.limit || productFilter.per_page}
          totalData={productList?.pagination.total_data || 0}
          withAction={false}
          onRowClick={(id) =>
            handleSelectRow(String(id), !selectedProduct.has(String(id)))
          }
          onUpdate={() => null}
          onDelete={() => null}
          onChange={(val) => search('page', val)}
          withCheckbox
          selectedRows={selectedProduct}
          setSelectedRows={setSelectedProduct}
          disabledIds={prefetchedProduct}
        />
        <div className="mt-5 w-full flex justify-end">
          <CustomButton
            type={ButtonType.BUTTON}
            label={'Add Product'}
            disabled={!selectedProduct.size}
            isLoading={isSubmitting}
            onClick={onSubmit}
          />
        </div>
      </div>
    </CustomModal>
  )
}

export default AddProduct
