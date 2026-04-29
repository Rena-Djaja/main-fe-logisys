'use client'

import React from 'react'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import { Form } from '@/components/shared/ui/form'
import useChangePassword from '@/components/SettingsPage/Tabs/ChangePasswordPage/useChangePassword'
import { Eye, EyeClosed } from 'lucide-react'
import { InputType } from '@/type/FormInputs'
import CustomButton from '@/components/shared/FormInputs/CustomButton'

const ChangePasswordPage = () => {
  const { form, showPassword, isLoading, handleShowPassword, onSubmit } =
    useChangePassword()

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg flex flex-col gap-8"
        >
          <div>
            <CustomInput
              label={'Kata Sandi Saat Ini'}
              name={'current_password'}
              control={form.control}
              placeholder={'Masukkan kata sandi saat ini'}
              icon={showPassword ? Eye : EyeClosed}
              iconOnClick={() => handleShowPassword('current')}
              type={showPassword.current ? InputType.TEXT : InputType.PASSWORD}
            />
          </div>
          <div>
            <CustomInput
              label={'Kata Sandi Baru'}
              name={'new_password'}
              control={form.control}
              placeholder={'Masukkan kata sandi baru'}
              icon={showPassword ? Eye : EyeClosed}
              iconOnClick={() => handleShowPassword('new')}
              type={showPassword.new ? InputType.TEXT : InputType.PASSWORD}
            />
          </div>
          <div>
            <CustomInput
              label={'Konfirmasi Kata Sandi'}
              name={'confirm_password'}
              control={form.control}
              placeholder={'Konfirmasi kata sandi baru'}
              icon={showPassword ? Eye : EyeClosed}
              iconOnClick={() => handleShowPassword('confirm')}
              type={showPassword.confirm ? InputType.TEXT : InputType.PASSWORD}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <CustomButton label={'Simpan'} isLoading={isLoading} />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ChangePasswordPage
