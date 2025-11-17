import React, { FC } from 'react'
import { Button } from '@/components/shared/ui/button'
import {
  ButtonType,
  CustomButtonProps,
  IconPlacementType,
} from '@/type/FormInputs'
import { Spinner } from '@/components/shared/ui/spinner'
import Link from 'next/link'

const CustomButton: FC<CustomButtonProps> = (props) => {
  const {
    label,
    size,
    variant,
    isLoading,
    iconPlacement = IconPlacementType.LEFT,
    disabled,
    link,
    onClick,
    type = ButtonType.SUBMIT,
  } = props

  return (
    <Button
      {...(onClick && {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()
          onClick()
        },
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
          {isLoading ? (
            <Spinner />
          ) : (
            props?.icon &&
            iconPlacement === IconPlacementType.LEFT && <props.icon />
          )}
          {label}
          {props.icon && iconPlacement === IconPlacementType.RIGHT && (
            <props.icon />
          )}
        </>
      )}
    </Button>
  )
}

export default CustomButton
