'use client'

import React, { FC } from 'react'
import { CommonFormProps } from '@/type/Common'
import useEditVariant from '@/components/ProductsPage/EditForm/Variant/useEditVariant'
import { Spinner } from '@/components/shared/ui/spinner'
import { Form } from '@/components/shared/ui/form'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomNumberFormatInput from '@/components/shared/FormInputs/CustomNumberFormatInput'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import Discount from '@/components/ProductsPage/EditForm/Variant/Discount/Discount'
import Complimentary from '@/components/ProductsPage/EditForm/Variant/Complimentary/Complimentary'

const EditVariantForm: FC<CommonFormProps> = (props) => {
  const {
    form,
    productVariantDetails,
    isVariantValidating,
    productDetails,
    isDetailsLoading,
    isLoading,
    onSubmit,
  } = useEditVariant(props)

  if (isVariantValidating || isDetailsLoading) {
    return (
      <div className="w-full flex justify-center py-[20rem]">
        <Spinner className="size-12" />
      </div>
    )
  }

  return (
    <div className="mt-8 w-full flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="font-semibold text-[2rem]">Edit Product Variant</h1>
        <span className="font-medium text-[0.95rem]">
          Edit product variant record
        </span>
      </div>
      <div className="w-full flex flex-col gap-6">
        <span className="font-medium text-[1.25rem]">Product Details</span>
        <div className="w-full max-w-md flex flex-col gap-1 p-3.5 border rounded-lg">
          <span className="font-semibold text-[0.75rem]">
            {productDetails?.sku}
          </span>
          <span className="font-medium text-[1.125rem]">
            {productDetails?.name}
          </span>
          <span className="font-medium text-[0.85rem]">
            {productDetails?.supplier_name}
          </span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 w-full max-w-2xl grid lg:grid-cols-2 gap-x-6 gap-y-10"
        >
          <div className="lg:col-span-2">
            <CustomInput
              name={`name`}
              control={form.control}
              label={'Variant Name'}
              placeholder={'Insert variant name'}
            />
          </div>
          <div>
            <CustomNumberFormatInput
              name={`extra_base_price`}
              control={form.control}
              label={'Extra Base Price (Rp)'}
              placeholder={'Insert variant extra base price'}
              helperText={'Insert `0` if no extra price'}
            />
          </div>
          <div>
            <CustomNumberFormatInput
              name={`extra_selling_price`}
              control={form.control}
              label={'Extra Selling Price (Rp)'}
              placeholder={'Insert variant extra selling price'}
              helperText={'Insert `0` if no extra price'}
            />
          </div>
          <div className="lg:col-span-2 mt-8 w-full">
            <Discount
              form={form}
              productVariantDetails={productVariantDetails}
              productDetails={productDetails}
            />
          </div>
          <div className="lg:col-span-2 mt-8 w-full">
            <Complimentary
              form={form}
              productVariantDetails={productVariantDetails}
              productDetails={productDetails}
            />
          </div>
          <div className="lg:col-span-2 mt-4 flex gap-2">
            <CustomButton
              type={ButtonType.BUTTON}
              variant={ButtonVariant.OUTLINE}
              label={'Cancel'}
              link={'/dashboard/products'}
              disabled={isLoading}
            />
            <CustomButton label={'Save'} isLoading={isLoading} />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditVariantForm
