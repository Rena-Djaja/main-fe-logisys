'use client'

import React, { FC } from 'react'
import { CommonFormProps } from '@/type/Common'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import { ProductCategories } from '@/constant/Common'
import CustomNumberFormatInput from '@/components/shared/FormInputs/CustomNumberFormatInput'
import useEditProduct from '@/components/ProductsPage/EditForm/useEditProduct'
import { Form } from '@/components/shared/ui/form'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import { Spinner } from '@/components/shared/ui/spinner'

const EditProductForm: FC<CommonFormProps> = (props) => {
  const { form, isLoading, supplierList, isSupplierValidating, onSubmit } =
    useEditProduct(props)

  if (isLoading.form) {
    return (
      <div className="w-full flex justify-center py-[20rem]">
        <Spinner className="size-12" />
      </div>
    )
  }

  return (
    <div className="mt-8 w-full flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="font-semibold text-[2rem]">Edit Product</h1>
        <span className="font-medium text-[0.95rem]">Edit product record</span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-2xl grid lg:grid-cols-2 gap-x-6 gap-y-10"
        >
          <div className="lg:col-span-2">
            <CustomInput
              name={'product_name'}
              control={form.control}
              label={'Product Name'}
              placeholder={'Enter product name'}
            />
          </div>
          <div>
            <CustomInput
              name={'sku'}
              control={form.control}
              label={'Short Name'}
              placeholder={'Enter product short name'}
            />
          </div>
          <div>
            <CustomSelect
              name={'supplier_id'}
              control={form.control}
              label={'Supplier'}
              placeholder={'Choose supplier'}
              options={supplierList?.suppliers?.map((each) => ({
                label: each.name,
                value: each.id,
              }))}
              isLoading={isSupplierValidating}
            />
          </div>
          <div>
            <CustomSelect
              name={'category'}
              control={form.control}
              label={'Category'}
              placeholder={'Choose category'}
              options={ProductCategories}
            />
          </div>
          <div>
            <CustomInput
              name={'unit'}
              control={form.control}
              label={'Unit'}
              placeholder={'Enter product unit'}
              helperText={'Kg, Pcs, etc.'}
            />
          </div>
          <div>
            <CustomNumberFormatInput
              name={'base_price'}
              control={form.control}
              label={'Base Price (Rp)'}
              placeholder={"Enter product's base price"}
            />
          </div>
          <div>
            <CustomNumberFormatInput
              name={'selling_price'}
              control={form.control}
              label={'Selling Price (Rp)'}
              placeholder={"Enter product's selling price"}
            />
          </div>
          <div className="lg:col-span-2 mt-4 flex gap-2">
            <CustomButton
              type={ButtonType.BUTTON}
              variant={ButtonVariant.OUTLINE}
              label={'Cancel'}
              link={'/dashboard/products'}
              disabled={isLoading.submit}
            />
            <CustomButton label={'Save'} isLoading={isLoading.submit} />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditProductForm
