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
import { useEffect, useState } from 'react'
import { ButtonType, CustomSelectProps, OptionType } from '@/type/FormInputs'
import { FieldValues } from 'react-hook-form'
import { Check, ChevronsUpDown, X } from 'lucide-react'
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
import { Spinner } from '@/components/shared/ui/spinner'

const CustomSelect = <T extends FieldValues = FieldValues>(
  props: CustomSelectProps<T>
) => {
  const {
    isLoading,
    label,
    placeholder,
    options,
    multiple,
    control,
    disabled,
    name,
    helperText,
    customOnChange,
    onSearch,
  } = props
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
                  ? value.filter((v: any) => v !== selectedValue)
                  : [...(value ?? []), selectedValue]
              onChange?.(newValue)
              customOnChange && customOnChange(newValue)
            } else {
              onChange?.(selectedValue)
              customOnChange && customOnChange(selectedValue)
              setOpen(false)
            }
          }

          const handleClear = () => {
            onChange?.(multiple ? [] : '')
          }

          return (
            <FormItem className={cn(disabled && 'opacity-55')}>
              {!!label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Popover
                  open={open}
                  onOpenChange={!disabled && !isLoading ? setOpen : undefined}
                >
                  <PopoverTrigger asChild>
                    <div>
                      <SelectionInput
                        value={value}
                        options={options}
                        placeholder={String(placeholder)}
                        handleSelect={handleSelect}
                        multiple={!!multiple}
                        handleClear={handleClear}
                        isLoading={isLoading}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <OptionList
                      options={options}
                      handleSelect={handleSelect}
                      value={value}
                      onSearch={onSearch}
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
                ? value.filter((v: any) => v !== selectedValue)
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
                      isLoading={isLoading}
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
                      onSearch={onSearch}
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
  isLoading?: boolean
}) => {
  const {
    value,
    options,
    placeholder,
    handleSelect,
    handleClear,
    multiple,
    isLoading,
  } = props

  return (
    <Button
      disabled={isLoading}
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
      {!isLoading ? (
        (multiple ? !!value?.length : !!value) ? (
          <div onClick={handleClear}>
            <X />
          </div>
        ) : (
          <ChevronsUpDown className="opacity-50" />
        )
      ) : (
        <Spinner />
      )}
    </Button>
  )
}

function OptionList({
  options,
  handleSelect,
  value,
  onSearch,
}: {
  options: OptionType[] | [] | undefined
  handleSelect: (selectedValue: string | number) => void
  value: string | number
  onSearch?: (value: string) => void
}) {
  return (
    <Command className="w-full" shouldFilter={!onSearch}>
      <CommandInput placeholder="Search..." onValueChange={onSearch} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          <ScrollArea>
            <div>
              {!!options?.length &&
                options.map((opt) => {
                  const isSelected =
                    Array.isArray(value) && value.includes(opt.value)

                  return (
                    <CommandItem
                      key={opt.value}
                      value={opt.label}
                      onSelect={() => handleSelect(String(opt.value))}
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
