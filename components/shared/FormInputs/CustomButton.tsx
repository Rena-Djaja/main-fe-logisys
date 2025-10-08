import React, { FC } from 'react'
import { Button } from '@/components/shared/ui/button'
import { ButtonType, CustomButtonProps } from '@/type/FormInputs'
import { Spinner } from '@/components/shared/ui/spinner'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const CustomButton: FC<CustomButtonProps> = (props) => {
  const {
    label,
    size,
    variant,
    isLoading,
    disabled,
    link,
    className,
    type = ButtonType.SUBMIT,
  } = props

  return (
    <Button
      type={type}
      size={size}
      variant={variant}
      disabled={disabled || isLoading}
      asChild={!!link}
      className={cn(
        className,
        'w-full cursor-pointer disabled:!cursor-not-allowed'
      )}
    >
      {!!link ? (
        <Link href={link}>{label}</Link>
      ) : (
        <>
          {isLoading ? <Spinner /> : props?.icon && <props.icon />}
          {label}
        </>
      )}
    </Button>
  )
}

export default CustomButton
