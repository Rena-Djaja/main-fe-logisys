'use client'

import React, { FC } from 'react'
import CustomModal from '@/components/shared/CustomModal/CustomModal'
import useInOutNotes from '@/components/InOutPage/Details/Notes/useInOutNotes'
import { Form } from '@/components/shared/ui/form'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import { ButtonType, ButtonVariant, InputType } from '@/type/FormInputs'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { InOutNotesProps } from '@/type/Transaction'

const InOutNotes: FC<InOutNotesProps> = (props) => {
  const { form, isLoading, onSubmit } = useInOutNotes(props)
  const { open, handleOpen } = props

  return (
    <CustomModal
      open={open}
      title={'Release Note'}
      description={'Please specify the release note'}
      onClose={() => {
        if (!isLoading) {
          handleOpen()
        }
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <div>
            <CustomInput
              name={'notes'}
              control={form.control}
              label={''}
              placeholder={'Please enter a note'}
              type={InputType.TEXTAREA}
            />
          </div>
          <div className="mt-4 flex w-full justify-end gap-2">
            <CustomButton
              type={ButtonType.BUTTON}
              variant={ButtonVariant.OUTLINE}
              label={'Cancel'}
              onClick={handleOpen}
              disabled={isLoading}
            />
            <CustomButton label={'Save'} isLoading={isLoading} />
          </div>
        </form>
      </Form>
    </CustomModal>
  )
}

export default InOutNotes
