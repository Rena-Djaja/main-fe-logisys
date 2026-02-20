import { create } from 'zustand/react'
import { ButtonVariant } from '@/type/FormInputs'

type Confirmation = {
  isOpen: boolean
  isLoading?: boolean
  title: string
  description: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonVariant?: ButtonVariant
  onConfirm?: (value: string | number) => void
  onCancel?: () => void
}

type ConfirmationState = {
  confirmation: Confirmation
  setConfirmation: (value: Confirmation) => void
  setLoading: (value: boolean) => void
  closeConfirmation: () => void
}

export const confirmationDefaultState = {
  isOpen: false,
  isLoading: false,
  title: '',
  description: '',
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Yes',
  confirmButtonVariant: ButtonVariant.DEFAULT,
}

export const useConfirmationStore = create<ConfirmationState>((set) => ({
  confirmation: confirmationDefaultState,
  setConfirmation: (value) =>
    set({ confirmation: { ...confirmationDefaultState, ...value } }),
  setLoading: (value) =>
    set((state) => ({
      confirmation: { ...state.confirmation, isLoading: value },
    })),
  closeConfirmation: () =>
    set((state) => ({
      confirmation: { ...state.confirmation, isOpen: false },
    })),
}))
