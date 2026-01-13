'use client'

import React, { FC } from 'react'
import { CommonFormProps } from '@/type/Common'
import { Form } from '@/components/shared/ui/form'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import useTruckForm from '@/components/InventoryPage/Tabs/Trucks/Form/useTruckForm'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'

const TruckForm: FC<CommonFormProps> = ({ id }) => {
  const { form, isLoading, salesmanList, isValidating, onSubmit } =
    useTruckForm({ id })

  return (
    <div className="mt-8 w-full flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="font-semibold text-[2rem]">
          {!!id ? 'Edit' : 'Add'} Truck
        </h1>
        <span className="font-medium text-[0.95rem]">
          {!!id ? 'Update' : 'Add new'} truck record
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-2xl grid lg:grid-cols-2 gap-x-6 gap-y-10"
        >
          <div>
            <CustomInput
              label={'Plate Number'}
              name={'plate_number'}
              control={form.control}
              placeholder={"Enter truck's plate number"}
            />
          </div>
          <div>
            <CustomSelect
              options={
                salesmanList?.data.map((each) => ({
                  label: each.name,
                  value: String(each.id),
                })) || []
              }
              isLoading={isValidating}
              label={'Salesman'}
              name={'salesman_id'}
              control={form.control}
              placeholder={'Choose salesman'}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <CustomButton
              type={ButtonType.BUTTON}
              variant={ButtonVariant.OUTLINE}
              label={'Cancel'}
              link={'/dashboard/inventory'}
              disabled={isLoading.submit}
            />
            <CustomButton label={'Save'} isLoading={isLoading.submit} />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default TruckForm
