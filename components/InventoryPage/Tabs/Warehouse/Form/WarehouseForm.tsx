'use client'

import React, { FC } from 'react'
import { Form } from '@/components/shared/ui/form'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import { ButtonType, ButtonVariant, InputType } from '@/type/FormInputs'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { CommonFormProps } from '@/type/Common'
import useWarehouseForm from '@/components/InventoryPage/Tabs/Warehouse/Form/useWarehouseForm'
import { Spinner } from '@/components/shared/ui/spinner'

const WarehouseForm: FC<CommonFormProps> = ({ id }) => {
  const { form, isLoading, onSubmit } = useWarehouseForm({ id })

  if (isLoading.form) {
    return (
      <div className="w-full flex justify-center items-center py-[20rem]">
        <Spinner className="size-14" />
      </div>
    )
  }

  return (
    <div className="mt-8 w-full flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="font-semibold text-[2rem]">
          {!!id ? 'Edit' : 'Add'} Warehouse
        </h1>
        <span className="font-medium text-[0.95rem]">
          {!!id ? 'Update' : 'Add new'} warehouse record
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-2xl grid gap-x-6 gap-y-10"
        >
          <div>
            <CustomInput
              label={'Warehouse Name'}
              name={'name'}
              control={form.control}
              placeholder={'Enter warehouse name'}
            />
          </div>
          <div>
            <CustomInput
              type={InputType.TEXTAREA}
              label={'Location'}
              name={'location'}
              control={form.control}
              placeholder={'Enter warehouse location'}
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

export default WarehouseForm
