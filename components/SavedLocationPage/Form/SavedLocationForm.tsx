'use client'

import React from 'react'
import { Form } from '@/components/shared/ui/form'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import useSavedLocationForm from '@/components/SavedLocationPage/Form/useSavedLocationForm'
import Map from '@/components/shared/Map/CustomMap'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shared/ui/sheet'

const SavedLocationForm = () => {
  const { form, isLoading, onSubmit } = useSavedLocationForm()

  return (
    <>
      <Sheet open={true}>
        <SheetContent
          showCloseButton={false}
          className="w-[55rem] max-w-[50vw] lg:max-w-none"
        >
          <SheetHeader className="hidden">
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
          <Map />
        </SheetContent>
      </Sheet>
      <div className="mt-8 w-full flex flex-col gap-10">
        <div className="w-full flex flex-col">
          <h1 className="font-semibold text-[2rem]">Add Saved Location</h1>
          <span className="font-medium text-[0.95rem]">
            Add new saved location record
          </span>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-2xl grid lg:grid-cols-2 gap-x-6 gap-y-10"
          >
            <div>
              <CustomInput
                label={'Location Name'}
                name={'name'}
                control={form.control}
                placeholder={'Enter location name'}
              />
            </div>
            <div className="lg:col-span-2 mt-4 flex gap-2">
              <CustomButton
                type={ButtonType.BUTTON}
                variant={ButtonVariant.OUTLINE}
                label={'Cancel'}
                link={'/dashboard/locations'}
                disabled={isLoading.submit}
              />
              <CustomButton label={'Save'} isLoading={isLoading.submit} />
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default SavedLocationForm
