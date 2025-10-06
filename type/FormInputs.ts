import { Control, FieldValue, FieldValues } from 'react-hook-form'
import { ReactNode } from 'react'

export interface CustomInputProps {
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  helperText?: string
  control: Control<FieldValue<FieldValues>>
  iconPlacement?: IconPlacementType
  icon?: string
  iconOnClick?: () => void
  type?: string
  defaultValue?: string
}

export interface CustomSelectProps extends CustomInputProps {
  isAsync?: boolean
  defaultOptions?: OptionType[]
  // callbackOptions?: (inputValue: string, callback: (options: any[]) => void) => void;
  options?: OptionType[] | []
  multiple?: boolean
  isLoading?: boolean
}

export interface OptionType {
  label: string
  value: string | number
}

export interface CustomButtonProps {
  label?: string
  icon?: () => ReactNode
  disabled?: boolean
  isLoading?: boolean
  size?: ButtonSize | null | undefined
  variant?: ButtonVariant
  link?: string
  className?: string
}

export enum IconPlacementType {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

export enum ButtonSize {
  SMALL = 'sm',
  LARGE = 'lg',
  ICON_SMALL = 'icon-sm',
  ICON_DEFAULT = 'icon',
  ICON_LARGE = 'icon-lg',
}

export enum ButtonVariant {
  OUTLINE = 'outline',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  DESTRUCTIVES = 'destructive',
  LINK = 'link',
}
