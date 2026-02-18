'use client'

import React, { FC } from 'react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/shared/ui/empty'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { EmptyPlaceholderProps } from '@/type/EmptyPlaceholder'
import { cn } from '@/lib/utils'
import { ButtonType } from '@/type/FormInputs'

const EmptyPlaceholder: FC<EmptyPlaceholderProps> = (props) => {
  const { title, description, buttonText, onClick, isError } = props

  return (
    <Empty className={cn('border', isError && 'border-destructive')}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <props.icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex">
          <CustomButton
            label={buttonText}
            onClick={onClick}
            type={ButtonType.BUTTON}
          />
        </div>
      </EmptyContent>
    </Empty>
  )
}

export default EmptyPlaceholder
