'use client'

import React, { FC } from 'react'
import { CustomInputProps, InputType } from '@/type/FormInputs'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form'
import { Input } from '@/components/shared/ui/input'
import { Textarea } from '@/components/shared/ui/textarea'

const CustomInput: FC<CustomInputProps> = (props) => {
  const inputProps = props
  const {
    label,
    placeholder,
    name,
    control,
    disabled,
    helperText,
    iconOnClick,
    type = InputType.TEXT,
  } = props

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem>
            {!!label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              {type === InputType.TEXTAREA ? (
                <Textarea
                  placeholder={placeholder}
                  {...field}
                  disabled={disabled}
                />
              ) : (
                <div className="relative">
                  <Input
                    placeholder={placeholder}
                    {...field}
                    disabled={disabled}
                    type={type}
                  />
                  <div className="absolute right-4 top-2.5">
                    {inputProps.icon && (
                      <inputProps.icon
                        className="size-4 cursor-pointer"
                        onClick={iconOnClick}
                      />
                    )}
                  </div>
                </div>
              )}
            </FormControl>
            {helperText && (
              <FormDescription className="text-[0.8rem]">
                {helperText}
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export default CustomInput
