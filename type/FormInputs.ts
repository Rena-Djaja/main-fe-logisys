import { Control, FieldValue, FieldValues } from 'react-hook-form'
import {
  ForwardRefExoticComponent,
  HTMLAttributeAnchorTarget,
  RefAttributes,
} from 'react'
import { LucideProps } from 'lucide-react'

export interface CustomInputProps {
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  helperText?: string
  control: Control<FieldValue<FieldValues>>
  iconPlacement?: IconPlacementType
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  iconOnClick?: () => void
  type?: string
  defaultValue?: string
}

export interface CustomDateInputProps extends CustomInputProps {
  minDate?: Date
  maxDate?: Date
}

export interface CustomSelectProps extends CustomInputProps {
  isAsync?: boolean
  defaultOptions?: OptionType[]
  // callbackOptions?: (inputValue: string, callback: (options: any[]) => void) => void;
  options?: OptionType[] | []
  multiple?: boolean
  isLoading?: boolean
  customOnChange?: any
  onSearch?: (value: string) => void
  defaultFilter?: string
}

export interface OptionType {
  label: string
  value: string | number
}

export interface CustomButtonProps {
  type?: ButtonType
  label?: string
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  iconPlacement?: IconPlacementType
  disabled?: boolean
  isLoading?: boolean
  size?: ButtonSize | null | undefined
  variant?: ButtonVariant
  link?: string
  onClick?: any
  length?: ButtonLength
  target?: HTMLAttributeAnchorTarget
}

export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
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
  DEFAULT = 'default',
  OUTLINE = 'outline',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  DESTRUCTIVES = 'destructive',
  LINK = 'link',
}

export enum ButtonLength {
  DEFAULT = 'default',
  FULL = 'full',
}
