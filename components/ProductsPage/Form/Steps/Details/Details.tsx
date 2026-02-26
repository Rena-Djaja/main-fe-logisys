'use client'

import React, { FC } from 'react'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import { ProductCategories } from '@/constant/Common'
import { FormStepProps } from '@/type/Product'
import useDetails from '@/components/ProductsPage/Form/Steps/Details/useDetails'
import CustomNumberFormatInput from '@/components/shared/FormInputs/CustomNumberFormatInput'

const Details: FC<FormStepProps> = ({ form }) => {
  const { supplierList, isValidating } = useDetails()

  return (
    <>
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
          options={supplierList?.data?.map((each) => ({
            label: each.name,
            value: each.id,
          }))}
          isLoading={isValidating}
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
    </>
  )
}

export default Details
