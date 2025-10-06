import React, { FC } from 'react'
import { Button } from '@/components/shared/ui/button'
import { CustomButtonProps } from '@/type/FormInputs'
import { Spinner } from '@/components/shared/ui/spinner'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const CustomButton: FC<CustomButtonProps> = (props) => {
  const { label, size, variant, isLoading, disabled, link, className } = props

  return (
    <Button
      size={size}
      variant={variant}
      disabled={disabled || isLoading}
      asChild={!!link}
      className={cn(className, 'cursor-pointer disabled:!cursor-not-allowed')}
    >
      {isLoading ? <Spinner /> : props?.icon && <props.icon />}
      {!!link ? <Link href={link}>{label}</Link> : !!label && label}
    </Button>
  )
}

export default CustomButton
