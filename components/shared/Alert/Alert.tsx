'use client'

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/shared/ui/alert-dialog'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType } from '@/type/FormInputs'
import { useAlertStore } from '@/store/alert'

const Alert = () => {
  const {
    alert: {
      title,
      description,
      isLoading,
      isOpen,
      confirmButtonText,
      confirmButtonVariant,
      disableClose,
      onConfirm,
    },
    closeAlert,
  } = useAlertStore()

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => {
        if (disableClose && onConfirm) {
          onConfirm()
        } else {
          closeAlert()
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <CustomButton
              type={ButtonType.BUTTON}
              label={confirmButtonText}
              variant={confirmButtonVariant}
              isLoading={isLoading}
              onClick={() => (onConfirm ? onConfirm() : closeAlert())}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Alert
