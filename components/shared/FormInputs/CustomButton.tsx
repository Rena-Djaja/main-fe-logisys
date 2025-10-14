import React, { FC } from 'react'
import { Button } from '@/components/shared/ui/button'
import { ButtonType, CustomButtonProps } from '@/type/FormInputs'
import { Spinner } from '@/components/shared/ui/spinner'
import Link from 'next/link'

const CustomButton: FC<CustomButtonProps> = (props) => {
  const {
    label,
    size,
    variant,
    isLoading,
    disabled,
    link,
    onClick,
    type = ButtonType.SUBMIT,
  } = props

  return (
    <Button
      {...(onClick && {
        onClick: onClick,
      })}
      type={type}
      size={size}
      variant={variant}
      disabled={disabled || isLoading}
      asChild={!!link}
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
