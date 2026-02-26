'use client'

import React, { FC } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/shared/ui/form'
import useUserForm from '@/components/UsersPage/Form/useUserForm'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import { Spinner } from '@/components/shared/ui/spinner'
import { CommonFormProps } from '@/type/Common'
import { Switch } from '@/components/shared/ui/switch'
import CustomNumberFormatInput from '@/components/shared/FormInputs/CustomNumberFormatInput'
import DatePicker from '@/components/shared/DatePicker/DatePicker'

const UserForm: FC<CommonFormProps> = (props) => {
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
                roleListData?.data?.map((each) => ({
                  label: each.name,
                  value: each.id,
                })) || []
              }
              customOnChange={(value: string) => {
                const selectedRole = roleListData?.data?.find(
                  (each) => each.id === Number(value)
                )?.name

                form.setValue('employee_data.title', selectedRole)
              }}
            />
          </div>
          <div className="lg:col-span-2">
            <FormField
              name={`has_employee_data`}
              control={form.control}
              render={({ field: { onChange, value } }) => {
                return (
                  <FormItem className="lg:col-span-2 w-full flex items-center gap-2">
                    <FormControl>
                      <Switch
                        id={`has_employee_data`}
                        defaultChecked={!!value}
                        onClick={() => onChange(!value)}
                      />
                    </FormControl>
                    <FormLabel id={`has_employee_data`}>
                      This user has employee data
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
          </div>
          {form.watch('has_employee_data') && (
            <div className="lg:col-span-2 grid lg:grid-cols-2 gap-x-6 gap-y-10">
              <div>
                <CustomInput
                  label={'Title'}
                  name={'employee_data.title'}
                  control={form.control}
                  placeholder={"Enter employee's title"}
                />
              </div>
              <div>
                <DatePicker
                  name={'employee_data.joined_date'}
                  control={form.control}
                  label={'Joined date'}
                />
              </div>
              <div>
                <CustomNumberFormatInput
                  name={`employee_data.salary`}
                  control={form.control}
                  label={'Salary (Rp)'}
                  placeholder={"Enter employee's salary"}
                />
              </div>
              <div>
                <CustomNumberFormatInput
                  name={`employee_data.allowance`}
                  control={form.control}
                  label={'Allowance (Rp)'}
                  placeholder={"Enter employee's allowance"}
                />
              </div>
              <div>
                <CustomNumberFormatInput
                  name={`employee_data.premium`}
                  control={form.control}
                  label={'Premium (Rp)'}
                  placeholder={"Enter employee's premium"}
                />
              </div>
              <div>
                <CustomNumberFormatInput
                  name={`employee_data.daily_allowance`}
                  control={form.control}
                  label={'Daily Allowance (Rp)'}
                  placeholder={"Enter employee's daily allowance"}
                />
              </div>
              <div>
                <CustomNumberFormatInput
                  name={`employee_data.meal_allowance`}
                  control={form.control}
                  label={'Meal Allowance (Rp)'}
                  placeholder={"Enter employee's meal allowance"}
                />
              </div>
              <div>
                <CustomNumberFormatInput
                  name={`employee_data.overtime_pay`}
                  control={form.control}
                  label={'Overtime Pay (Rp)'}
                  placeholder={"Enter employee's overtime pay"}
                />
              </div>
            </div>
          )}
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
