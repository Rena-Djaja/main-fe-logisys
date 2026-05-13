'use client'

import React from 'react'
import { toZonedTime } from 'date-fns-tz'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shared/ui/popover'
import { Button } from '@/components/shared/ui/button'
import { Calendar } from '@/components/shared/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import {
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form'
import { CustomDateInputProps } from '@/type/FormInputs'
import { formattedDate } from '@/lib/utils'
import { Matcher } from 'react-day-picker'
import { format } from 'date-fns'
import { FieldValues } from 'react-hook-form'

const DatePicker = <T extends FieldValues = FieldValues>(
  props: CustomDateInputProps<T>
) => {
  const {
    name,
    control,
    label,
    placeholder,
    minDate,
    maxDate,
    helperText,
    disabled,
  } = props
  props
  const [open, setOpen] = React.useState(false)

  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <div className="w-full flex flex-col gap-3">
            {!!label && <FormLabel>{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild disabled={disabled}>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full justify-between font-normal"
                >
                  {value
                    ? formattedDate(value)
                    : (placeholder ?? 'Select date')}
                  <CalendarIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={value}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    let formattedDate
                    if (date) {
                      const timezone = 'Asia/Jakarta'

                      const zonedDate = toZonedTime(new Date(date), timezone)
                      formattedDate = format(
                        zonedDate,
                        "yyyy-MM-dd'T'HH:mm:ssXXX"
                      )
                    }
                    onChange(formattedDate || '')
                    setOpen(false)
                  }}
                  disabled={
                    {
                      before: minDate,
                      after: maxDate,
                    } as Matcher
                  }
                />
              </PopoverContent>
            </Popover>
            {helperText && (
              <FormDescription className="text-[0.8rem]">
                {helperText}
              </FormDescription>
            )}
            <FormMessage />
          </div>
        )
      }}
    />
  )
}

export default DatePicker
