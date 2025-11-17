'use client'

import React, { FC } from 'react'
import { FormStepProps } from '@/type/Product'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { Percent, Plus, Trash } from 'lucide-react'
import { ButtonType, ButtonVariant, InputType } from '@/type/FormInputs'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/shared/ui/empty'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import DatePicker from '@/components/shared/DatePicker/DatePicker'
import CustomNumberFormatInput from '@/components/shared/FormInputs/CustomNumberFormatInput'
import { Switch } from '@/components/shared/ui/switch'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/shared/ui/form'
import { cn } from '@/lib/utils'
import useDiscount from '@/components/ProductsPage/Form/Steps/Variant/Discount/useDiscount'

interface VariantDiscountProps extends FormStepProps {
  variantIdx: number
}

const Discount: FC<VariantDiscountProps> = (props) => {
  const { fields, handleAddRow, remove } = useDiscount(props)
  const { form, variantIdx } = props
  const productUnit = form.getValues('unit')
  const isDisabled = !form.watch(`variants.${variantIdx}.custom_discount`)

  return (
    <div
      className={cn(
        'w-full lg:col-span-2 flex flex-col gap-8',
        isDisabled && 'opacity-40'
      )}
    >
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold text-[1.25rem]">Discount</h2>
        </div>
        <div>
          <CustomButton
            label={'Add Discount'}
            disabled={isDisabled}
            icon={Plus}
            variant={ButtonVariant.OUTLINE}
            onClick={handleAddRow}
            type={ButtonType.BUTTON}
          />
        </div>
      </div>
      {!fields.length ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Percent />
            </EmptyMedia>
            <EmptyTitle>No discount schemas added</EmptyTitle>
            <EmptyDescription>
              You have not added any discount schemas yet. Please add one by
              clicking the button below.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex">
              <CustomButton
                label={'Add Discount'}
                disabled={isDisabled}
                variant={ButtonVariant.OUTLINE}
                onClick={handleAddRow}
                type={ButtonType.BUTTON}
              />
            </div>
          </EmptyContent>
        </Empty>
      ) : (
        fields.map((field, idx) => (
          <div
            key={field.id}
            className="relative w-full grid lg:grid-cols-2 gap-x-6 gap-y-10 p-6 border rounded-lg"
          >
            <button
              className="absolute right-4 -top-2.5 px-1 bg-background cursor-pointer"
              type={ButtonType.BUTTON}
              onClick={() => remove(idx)}
              disabled={isDisabled}
            >
              <Trash className="size-4.5 text-destructive" />
            </button>
            <div>
              <FormField
                name={`variants.${variantIdx}.discounts.${idx}.is_stacked`}
                control={form.control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <FormItem className="lg:col-span-2 w-full flex items-center gap-2">
                      <FormControl>
                        <Switch
                          disabled={isDisabled}
                          id={`${field.id}.is_stacked`}
                          defaultChecked={!!value}
                          onClick={() => onChange(!value)}
                        />
                      </FormControl>
                      <FormLabel>Combined Promo</FormLabel>
                    </FormItem>
                  )
                }}
              />
            </div>
            <div className="lg:col-span-2">
              <CustomInput
                name={`variants.${variantIdx}.discounts.${idx}.name`}
                control={form.control}
                label={'Discount Name'}
                placeholder={'Insert discount name'}
                disabled={isDisabled}
              />
            </div>
            <div className="lg:col-span-2">
              <CustomInput
                name={`variants.${variantIdx}.discounts.${idx}.description`}
                control={form.control}
                label={'Description'}
                placeholder={'Insert description'}
                type={InputType.TEXTAREA}
                disabled={isDisabled}
              />
            </div>
            <div>
              <CustomSelect
                name={`variants.${variantIdx}.discounts.${idx}.type`}
                control={form.control}
                label={'Discount Type'}
                placeholder={'Select discount type'}
                disabled={isDisabled}
                options={['Price', 'Percentage'].map((opt) => ({
                  label: opt,
                  value: opt.toLowerCase(),
                }))}
              />
            </div>
            <div>
              <CustomSelect
                name={`variants.${variantIdx}.discounts.${idx}.payment_type`}
                control={form.control}
                label={'Payment Type'}
                placeholder={'Select payment type'}
                disabled={isDisabled}
                options={['Cash', 'Credit'].map((opt) => ({
                  label: opt,
                  value: opt.toLowerCase(),
                }))}
              />
            </div>
            <div>
              <CustomNumberFormatInput
                name={`variants.${variantIdx}.discounts.${idx}.quantity`}
                control={form.control}
                label={`Quantity (${productUnit})`}
                placeholder={"Insert product's minimum quantity"}
                disabled={isDisabled}
              />
            </div>
            <div>
              <CustomNumberFormatInput
                name={`variants.${variantIdx}.discounts.${idx}.amount`}
                control={form.control}
                label={'Amount'}
                placeholder={'Insert discount amount'}
                disabled={isDisabled}
              />
            </div>
            <div>
              <DatePicker
                name={`variants.${variantIdx}.discounts.${idx}.start_date`}
                control={form.control}
                label={'Start Date'}
                disabled={isDisabled}
              />
            </div>
            <div>
              <DatePicker
                name={`variants.${variantIdx}.discounts.${idx}.end_date`}
                control={form.control}
                label={'End Date'}
                minDate={
                  new Date(
                    form.watch(
                      `variants.${variantIdx}.discounts.${idx}.start_date`
                    )
                  )
                }
                disabled={isDisabled}
              />
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Discount
