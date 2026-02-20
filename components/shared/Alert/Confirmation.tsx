'use client'

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/shared/ui/alert-dialog'
import { useConfirmationStore } from '@/store'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType } from '@/type/FormInputs'

const Confirmation = () => {
  const {
    confirmation: {
      isOpen,
      isLoading,
      title,
      description,
      cancelButtonText,
      confirmButtonText,
      confirmButtonVariant,
      onConfirm,
      onCancel,
    },
    closeConfirmation,
  } = useConfirmationStore()

  return (
    <AlertDialog open={isOpen} onOpenChange={closeConfirmation}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="cursor-pointer"
            onClick={() => {
              onCancel && onCancel()
              closeConfirmation()
            }}
            disabled={isLoading}
          >
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <CustomButton
              type={ButtonType.BUTTON}
              label={confirmButtonText}
              variant={confirmButtonVariant}
              isLoading={isLoading}
              onClick={onConfirm}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Confirmation
