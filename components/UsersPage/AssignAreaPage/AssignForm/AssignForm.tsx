'use client'

import React, { FC } from 'react'
import CustomModal from '@/components/shared/CustomModal/CustomModal'
import useAssignForm from '@/components/UsersPage/AssignAreaPage/AssignForm/useAssignForm'
import { Form } from '@/components/shared/ui/form'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import { X } from 'lucide-react'
import { DialogClose, DialogFooter } from '@/components/shared/ui/dialog'
import { AssignAreaFormProps } from '@/type/User'

const AssignForm: FC<AssignAreaFormProps> = (props) => {
  const {
    form,
    fields,
    locationList,
    isLocationLoading,
    isLoading,
    handleAddLocation,
    handleRemoveLocation,
    handleCloseForm,
    onSubmit,
  } = useAssignForm(props)
  const { isOpen } = props

  return (
    <CustomModal
      onClose={handleCloseForm}
      open={isOpen}
      title="Assign New Area"
      description="You can add multiple areas to this user"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex gap-2 items-start">
            <div className="w-full">
              <CustomSelect
                name={'location_id'}
                control={form.control}
                placeholder={'Select the location'}
                options={(locationList?.data || []).map((each) => ({
                  label: each.name,
                  value: `${each.id}|${each.name}`,
                }))}
                isLoading={isLocationLoading || isLoading.validate}
              />
            </div>
            <div>
              <CustomButton
                label={'Add'}
                type={ButtonType.BUTTON}
                onClick={handleAddLocation}
                disabled={
                  !form.watch('location_id') ||
                  !!form.formState.errors?.location_id ||
                  isLoading.validate ||
                  fields
                    .map((each: any) => each.location_id)
                    .includes(form.watch('location_id'))
                }
              />
            </div>
          </div>
          <div className="mt-4 w-full flex items-center gap-2 flex-wrap">
            {fields.map((field, idx) => (
              <div
                className="border py-1.5 px-3 rounded-md flex items-center gap-1"
                key={field.id}
              >
                <span className="w-max font-semibold text-[0.75rem]">
                  {field.location_id?.split('|')?.[1]}
                </span>
                <button
                  className="cursor-pointer"
                  onClick={() => handleRemoveLocation(idx)}
                >
                  <X className="size-3 shrink-0" />
                </button>
              </div>
            ))}
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <CustomButton
                type={ButtonType.BUTTON}
                label={'Cancel'}
                variant={ButtonVariant.OUTLINE}
                disabled={isLoading.submit}
              />
            </DialogClose>
            <CustomButton
              type={ButtonType.SUBMIT}
              label={'Save changes'}
              disabled={
                !!form.formState.errors?.location_id || isLoading.validate
              }
              isLoading={isLoading.submit}
            />
          </DialogFooter>
        </form>
      </Form>
    </CustomModal>
  )
}

export default AssignForm
