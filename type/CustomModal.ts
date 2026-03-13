import { ReactNode } from 'react'

export interface CustomModalProps {
  open: boolean
  onClose: () => void
  title: string
  description: string
  children: ReactNode
  size?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
}
