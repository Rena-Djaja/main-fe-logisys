'use client'

import React, { FC } from 'react'
import { Form } from '@/components/shared/ui/form'
import useUserForm from '@/components/UsersPage/Form/useUserForm'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import { UserFormProps } from '@/type/User'
import { Spinner } from '@/components/shared/ui/spinner'

const UserForm: FC<UserFormProps> = (props) => {
  const { id } = props
  const { form, roleListData, isRoleLoading, isLoading, onSubmit } =
    useUserForm(props)

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
          {!!id ? 'Edit' : 'Add'} User
        </h1>
        <span className="font-medium text-[0.95rem]">
          {!!id ? 'Update' : 'Add new'} user record
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-2xl grid lg:grid-cols-2 gap-x-6 gap-y-10"
        >
          <div className="lg:col-span-2">
            <CustomInput
              label={'Full Name'}
              name={'name'}
              control={form.control}
              placeholder={"Enter user's name"}
            />
          </div>
          <div>
            <CustomInput
              label={'Email'}
              name={'email'}
              control={form.control}
              placeholder={'Enter email address'}
              disabled={!!id}
            />
          </div>
          <div>
            <CustomSelect
              label={'Role'}
              name={'role_id'}
              control={form.control}
              placeholder={'Select a role'}
              isLoading={isRoleLoading}
              options={
                roleListData?.data.map((each) => ({
                  label: each.name,
                  value: each.id,
                })) || []
              }
            />
          </div>
          <div className="lg:col-span-2 mt-4 flex gap-2">
            <CustomButton
              type={ButtonType.BUTTON}
              variant={ButtonVariant.OUTLINE}
              label={'Cancel'}
              link={'/dashboard/users'}
              disabled={isLoading.submit}
            />
            <CustomButton label={'Save'} isLoading={isLoading.submit} />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UserForm
