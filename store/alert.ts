import { create } from 'zustand/react'
import { ButtonVariant } from '@/type/FormInputs'

type Alert = {
  isOpen: boolean
  isLoading?: boolean
  title: string
  description: string
  confirmButtonText?: string
  confirmButtonVariant?: ButtonVariant
  onConfirm?: (value?: string | number) => void
  disableClose: boolean
}

type AlertState = {
  alert: Alert
  setAlert: (value: Alert) => void
  setLoading: (value: boolean) => void
  closeAlert: () => void
}

export const alertDefaultState = {
  isOpen: false,
  isLoading: false,
  title: '',
  description: '',
  confirmButtonText: 'Yes',
  confirmButtonVariant: ButtonVariant.DEFAULT,
  disableClose: false,
}

export const useAlertStore = create<AlertState>((set) => ({
  alert: alertDefaultState,
  setAlert: (value) => set({ alert: { ...alertDefaultState, ...value } }),
  setLoading: (value) =>
    set((state) => ({
      alert: { ...state.alert, isLoading: value },
    })),
  closeAlert: () =>
    set((state) => ({
      alert: { ...state.alert, isOpen: false },
    })),
}))
