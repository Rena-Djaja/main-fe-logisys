'use client'

import React, { FC } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog'
import { CustomModalProps } from '@/type/CustomModal'
import { cn } from '@/lib/utils'

const CustomModal: FC<CustomModalProps> = (props) => {
  const { title, description, open, onClose, children, size = 'lg' } = props

  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    '4xl': 'sm:max-w-4xl',
    '5xl': 'sm:max-w-5xl',
    '6xl': 'sm:max-w-6xl',
    '7xl': 'sm:max-w-7xl',
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={cn('w-full', sizeClasses[size])}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="relative overflow-auto p-1">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default CustomModal
