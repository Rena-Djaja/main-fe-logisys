'use client'

import React from 'react'
import useLoginForm from '@/components/LoginPage/useLoginForm'
import { Form } from '@/components/shared/ui/form'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import { FieldGroup } from '@/components/shared/ui/field'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant, InputType } from '@/type/FormInputs'
import { Eye, EyeClosed } from 'lucide-react'

const LoginForm = () => {
  const { form, showPassword, handleShowPassword, onSubmit } = useLoginForm()

  return (
    <Form {...form}>
      <form className="mt-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div>
            <CustomInput
              name={'email'}
              control={form.control}
              placeholder={'Enter your email'}
              label={'Email'}
            />
          </div>
          <div>
            <CustomInput
              name={'password'}
              control={form.control}
              placeholder={'Enter your password'}
              label={'Password'}
              icon={showPassword ? Eye : EyeClosed}
              iconOnClick={handleShowPassword}
              type={showPassword ? InputType.TEXT : InputType.PASSWORD}
            />
          </div>
          <div className="ml-auto -mt-5">
            <CustomButton
              label={'Forgot your password?'}
              variant={ButtonVariant.LINK}
              className="!p-0"
              type={ButtonType.BUTTON}
              link={'/forgot-password'}
            />
          </div>
          <div>
            <CustomButton label={'Sign in'} />
          </div>
        </FieldGroup>
      </form>
    </Form>
  )
}

export default LoginForm
