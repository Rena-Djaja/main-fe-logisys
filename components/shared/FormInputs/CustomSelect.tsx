'use client'

import * as React from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/shared/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shared/ui/command'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shared/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shared/ui/popover'
import { FC, useEffect, useState } from 'react'
import { ButtonType, CustomSelectProps, OptionType } from '@/type/FormInputs'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/shared/ui/scroll-area'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/ui/form'

const CustomSelect: FC<CustomSelectProps> = (props) => {
  const { label, placeholder, options, multiple, control, name, helperText } =
    props
  const [isMounted, setIsMounted] = useState(false)
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  if (isDesktop) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => {
          const handleSelect = (selectedValue: string | number) => {
            if (multiple) {
              const newValue =
                value?.includes(selectedValue) && Array.isArray(value)
                  ? value.filter((v) => v !== selectedValue)
                  : [...(value ?? []), selectedValue]
              onChange?.(newValue)
            } else {
              onChange?.(selectedValue)
              setOpen(false)
            }
          }

          const handleClear = () => {
            onChange?.(multiple ? [] : '')
          }

          return (
            <FormItem>
              {!!label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <div>
                      <SelectionInput
                        value={value}
                        options={options}
                        placeholder={String(placeholder)}
                        handleSelect={handleSelect}
                        multiple={!!multiple}
                        handleClear={handleClear}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <OptionList
                      options={options}
                      handleSelect={handleSelect}
                      value={value}
                    />
                  </PopoverContent>
                </Popover>
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

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const handleSelect = (selectedValue: string | number) => {
          if (multiple) {
            const newValue =
              value?.includes(selectedValue) && Array.isArray(value)
                ? value.filter((v) => v !== selectedValue)
                : [...(value ?? []), selectedValue]
            onChange?.(newValue)
          } else {
            onChange?.(selectedValue)
            setOpen(false)
          }
        }

        const handleClear = () => {
          onChange?.(multiple ? [] : '')
        }

        return (
          <FormItem>
            {!!label && <FormLabel>Full Name</FormLabel>}
            <FormControl>
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <div>
                    <SelectionInput
                      value={value}
                      options={options}
                      placeholder={String(placeholder)}
                      handleSelect={handleSelect}
                      multiple={!!multiple}
                      handleClear={handleClear}
                    />
                  </div>
                </DrawerTrigger>
                <div className="hidden">
                  <DrawerTitle></DrawerTitle>
                </div>
                <DrawerContent>
                  <div className="mt-4 border-t min-h-[20dvh]">
                    <OptionList
                      options={options}
                      handleSelect={handleSelect}
                      value={value}
                    />
                  </div>
                </DrawerContent>
              </Drawer>
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

const SelectionInput = (props: {
  value: any
  options: OptionType[] | [] | undefined
  placeholder: string
  handleSelect: (value: string | number) => void
  multiple: boolean
  handleClear: () => void
}) => {
  const { value, options, placeholder, handleSelect, handleClear, multiple } =
    props

  return (
    <Button
      type={ButtonType.BUTTON}
      variant="outline"
      className="w-full flex justify-between items-center font-normal h-full"
    >
      {multiple ? (
        options?.length && (
          <div className="w-full flex flex-wrap gap-1">
            {!!options.filter(
              (option) => Array.isArray(value) && value.includes(option.value)
            ).length ? (
              options
                .filter(
                  (option) =>
                    Array.isArray(value) && value.includes(option.value)
                )
                .map((option) => (
                  <span
                    key={option.value}
                    className="inline-flex items-center gap-1 rounded-md border py-0.5 pl-2 pr-1 text-xs font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <span>{option.label}</span>
                    <span
                      onClick={(e) => {
                        e.preventDefault()
                        handleSelect(option.value)
                      }}
                      className="flex items-center rounded-sm px-[1px] text-muted-foreground/60 hover:bg-accent hover:text-muted-foreground"
                    >
                      <X />
                    </span>
                  </span>
                ))
            ) : (
              <>{placeholder}</>
            )}
          </div>
        )
      ) : value ? (
        <>
          {options?.find((opt) => String(opt.value) === String(value))?.label}
        </>
      ) : (
        <>{placeholder}</>
      )}
      {(multiple ? !!value?.length : !!value) && (
        <div onClick={handleClear}>
          <X />
        </div>
      )}
    </Button>
  )
}

function OptionList({
  options,
  handleSelect,
  value,
}: {
  options: OptionType[] | [] | undefined
  handleSelect: (selectedValue: string | number) => void
  value: string | number
}) {
  return (
    <Command className="w-full">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <ScrollArea>
            <div>
              {options?.length &&
                options.map((opt) => {
                  const isSelected =
                    Array.isArray(value) && value.includes(opt.value)

                  return (
                    <CommandItem
                      key={opt.value}
                      value={opt.label}
                      onSelect={() => handleSelect(opt.value)}
                    >
                      {opt.label}
                      <Check
                        className={cn(
                          'ml-auto',
                          opt.value === value || isSelected
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  )
                })}
            </div>
          </ScrollArea>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default CustomSelect
