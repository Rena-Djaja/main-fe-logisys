import { ReactNode } from 'react'

export interface CustomModalProps {
  open: boolean
  onClose: () => void
  title: string
  description: string
  children: ReactNode
}
