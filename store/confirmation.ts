import { create } from 'zustand/react'
import { ButtonVariant } from '@/type/FormInputs'

type Confirmation = {
  isOpen: boolean
  isLoading?: boolean
  title: string
  description: string
  confirmButtonText?: string
  confirmButtonVariant?: ButtonVariant
  onConfirm?: (value: string | number) => void
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
  confirmButtonText: 'Yes',
  confirmButtonVariant: ButtonVariant.DEFAULT,
}

export const useConfirmationStore = create<ConfirmationState>((set) => ({
  confirmation: confirmationDefaultState,
  setConfirmation: (value) => set({ confirmation: value }),
  setLoading: (value) =>
    set((state) => ({
      confirmation: { ...state.confirmation, isLoading: value },
    })),
  closeConfirmation: () =>
    set((state) => ({
      confirmation: { ...state.confirmation, isOpen: false },
    })),
}))
