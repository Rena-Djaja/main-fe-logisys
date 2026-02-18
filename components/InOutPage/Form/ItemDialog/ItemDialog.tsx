'use client'

import React, { FC } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonVariant } from '@/type/FormInputs'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import useItemDialog from '@/components/InOutPage/Form/ItemDialog/useItemDialog'
import { Form } from '@/components/shared/ui/form'
import CustomNumberFormatInput from '@/components/shared/FormInputs/CustomNumberFormatInput'
import { ItemDialogProps } from '@/type/Inventory'

const ItemDialog: FC<ItemDialogProps> = (props) => {
  const { isOpen, handleDialog } = props
  const {
    form,
    productList,
    isProductListValidating,
    variantList,
    isVariantListValidating,
    selectedProduct,
    search,
    onSubmit,
  } = useItemDialog(props)

  return (
    <Dialog open={isOpen} onOpenChange={handleDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add new item</DialogTitle>
              <DialogDescription>Add new item to the list</DialogDescription>
            </DialogHeader>
            <div className="grid gap-8 mt-5">
              <div>
                <CustomSelect
                  name={'product_id'}
                  control={form.control}
                  label={'Product'}
                  placeholder={'Select a product'}
                  isLoading={isProductListValidating}
                  options={productList?.data.map((each) => ({
                    label: each.name,
                    value: `${each.id}|${each.name}`,
                  }))}
                  onSearch={(val) => search('search', val)}
                />
              </div>
              <div>
                <CustomSelect
                  disabled={!form.watch('product_id')}
                  name={'variant_id'}
                  control={form.control}
                  label={'Product Variant'}
                  placeholder={'Select a product variant'}
                  isLoading={isVariantListValidating}
                  options={variantList?.map((each) => ({
                    label: each.name,
                    value: `${each.id}|${each.name}`,
                  }))}
                />
              </div>
              {form.watch('product_id') && (
                <div>
                  <CustomNumberFormatInput
                    name={'quantity'}
                    control={form.control}
                    label={`Quantity (${selectedProduct?.unit})`}
                  />
                </div>
              )}
            </div>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <CustomButton
                  label={'Cancel'}
                  onClick={handleDialog}
                  variant={ButtonVariant.OUTLINE}
                />
              </DialogClose>
              <CustomButton
                label={'Add to list'}
                disabled={!form.watch('product_id')}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ItemDialog
