'use client'

import React from 'react'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import { Form } from '@/components/shared/ui/form'
import useDesignSystem from '@/components/DesignSystemPage/useDesignSystem'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonVariant } from '@/type/FormInputs'

const DesignSystemPage = () => {
  const { form, genders, statuses, isLoading, onSubmit } = useDesignSystem()
  return (
    <div className="w-full justify-center px-6 lg:px-[10rem] py-20">
      <div className="w-full max-w-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full grid lg:grid-cols-2 gap-8"
          >
            <div className="w-full">
              <CustomInput
                name={'name'}
                label={'Full Name'}
                placeholder={'Enter your name'}
                control={form.control}
              />
            </div>
            <div className="w-full">
              <CustomSelect
                label={'Your Gender'}
                placeholder={'Select gender'}
                control={form.control}
                name={'gender'}
                options={genders}
              />
            </div>
            <div className="w-full">
              <CustomSelect
                label={'Status'}
                placeholder={'Select status'}
                control={form.control}
                name={'status'}
                options={statuses}
                multiple={true}
              />
            </div>
            <div className="w-full lg:col-span-2 flex items-center gap-2">
              <CustomButton
                label={'Cancel'}
                disabled={isLoading}
                variant={ButtonVariant.OUTLINE}
              />
              <CustomButton label={'Submit'} isLoading={isLoading} />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default DesignSystemPage
