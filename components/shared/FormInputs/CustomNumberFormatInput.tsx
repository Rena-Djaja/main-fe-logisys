'use client'

import React from 'react'
import { CustomNumberInputProps } from '@/type/FormInputs'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form'
import { Input } from '@/components/shared/ui/input'
import { NumericFormat } from 'react-number-format'
import { FieldValues } from 'react-hook-form'

const CustomNumberFormatInput = <T extends FieldValues = FieldValues>(
  props: CustomNumberInputProps<T>
) => {
  const {
    label,
    placeholder,
    name,
    control,
    disabled,
    helperText,
    allowNegative = false,
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
              <NumericFormat
                {...field}
                allowNegative={allowNegative}
                customInput={Input}
                placeholder={placeholder}
                thousandSeparator=","
                decimalSeparator="."
                value={field.value}
                onValueChange={(values) => {
                  // Pass the float value back to the form
                  field.onChange(String(values.floatValue))
                }}
                onBlur={field.onBlur}
                name={field.name}
                disabled={disabled}
              />
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

export default CustomNumberFormatInput
