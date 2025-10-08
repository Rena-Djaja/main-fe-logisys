'use client'

import React, { FC } from 'react'
import { AlertCircleIcon } from 'lucide-react'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/shared/ui/alert'

interface AlertProps {
  show: boolean
  title: string
  description: string
  variant: 'default' | 'destructive'
}

const InlineAlert: FC<AlertProps> = (props) => {
  const { variant = 'default', title, description, show } = props

  if (!show) {
    return null
  }

  return (
    <Alert variant={variant}>
      <AlertCircleIcon />
      <AlertTitle className="capitalize">{title}</AlertTitle>
      <AlertDescription>
        <p className="capitalize">{description}</p>
      </AlertDescription>
    </Alert>
  )
}

export default InlineAlert
