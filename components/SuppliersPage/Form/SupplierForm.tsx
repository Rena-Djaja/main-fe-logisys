'use client'

import React, { FC } from 'react'
import { CommonFormProps } from '@/type/Common'
import { Form } from '@/components/shared/ui/form'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant, InputType } from '@/type/FormInputs'
import useSupplierForm from '@/components/SuppliersPage/Form/useSupplierForm'
import { Spinner } from '@/components/shared/ui/spinner'

const SupplierForm: FC<CommonFormProps> = ({ id }) => {
  const { form, isLoading, onSubmit } = useSupplierForm({ id })

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
          {!!id ? 'Edit' : 'Add'} Supplier
        </h1>
        <span className="font-medium text-[0.95rem]">
          {!!id ? 'Update' : 'Add new'} supplier record
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-2xl grid lg:grid-cols-2 gap-x-6 gap-y-10"
        >
          <div>
            <CustomInput
              label={'Company Name'}
              name={'name'}
              control={form.control}
              placeholder={'Enter company name'}
            />
          </div>
          <div>
            <CustomInput
              label={'Phone'}
              name={'phone_number'}
              control={form.control}
              placeholder={'Enter company phone number'}
            />
          </div>
          <div className="lg:col-span-2">
            <CustomInput
              type={InputType.TEXTAREA}
              label={'Address'}
              name={'location'}
              control={form.control}
              placeholder={'Enter company address'}
            />
          </div>
          <div className="lg:col-span-2 mt-4 flex gap-2">
            <CustomButton
              type={ButtonType.BUTTON}
              variant={ButtonVariant.OUTLINE}
              label={'Cancel'}
              link={'/dashboard/suppliers'}
              disabled={isLoading.submit}
            />
            <CustomButton label={'Save'} isLoading={isLoading.submit} />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SupplierForm
