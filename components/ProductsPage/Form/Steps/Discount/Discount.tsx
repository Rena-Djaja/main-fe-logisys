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
import useDiscount from '@/components/ProductsPage/Form/Steps/Discount/useDiscount'
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

const Discount: FC<FormStepProps> = (props) => {
  const { isComplimentary, fields, handleAddRow, remove } = useDiscount(props)
  const { form } = props
  const productUnit = form.getValues('unit')

  return (
    <div
      className={cn(
        'w-full lg:col-span-2 flex flex-col gap-8',
        isComplimentary && 'opacity-40'
      )}
    >
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold text-[1.25rem]">Discount</h2>
          <span className="font-medium text-[0.85rem] text-muted-foreground">
            You can add more than one discount schemas that apply to all
            variants of this product.
          </span>
        </div>
        <div>
          <CustomButton
            label={'Add Discount'}
            icon={Plus}
            variant={ButtonVariant.OUTLINE}
            onClick={handleAddRow}
            type={ButtonType.BUTTON}
            disabled={isComplimentary}
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
                variant={ButtonVariant.OUTLINE}
                onClick={handleAddRow}
                type={ButtonType.BUTTON}
                disabled={isComplimentary}
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
            >
              <Trash className="size-4.5 text-destructive" />
            </button>
            <div>
              <FormField
                name={`discounts.${idx}.is_stacked`}
                control={form.control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <FormItem className="lg:col-span-2 w-full flex items-center gap-2">
                      <FormControl>
                        <Switch
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
                name={`discounts.${idx}.name`}
                control={form.control}
                label={'Discount Name'}
                placeholder={'Insert discount name'}
              />
            </div>
            <div className="lg:col-span-2">
              <CustomInput
                name={`discounts.${idx}.description`}
                control={form.control}
                label={'Description'}
                placeholder={'Insert description'}
                type={InputType.TEXTAREA}
              />
            </div>
            <div>
              <CustomSelect
                name={`discounts.${idx}.type`}
                control={form.control}
                label={'Discount Type'}
                placeholder={'Select discount type'}
                options={['Price', 'Percentage'].map((opt) => ({
                  label: opt,
                  value: opt.toLowerCase(),
                }))}
              />
            </div>
            <div>
              <CustomSelect
                name={`discounts.${idx}.payment_type`}
                control={form.control}
                label={'Payment Type'}
                placeholder={'Select payment type'}
                options={['Cash', 'Credit'].map((opt) => ({
                  label: opt,
                  value: opt.toLowerCase(),
                }))}
              />
            </div>
            <div>
              <CustomNumberFormatInput
                name={`discounts.${idx}.quantity`}
                control={form.control}
                label={`Quantity (${productUnit})`}
                placeholder={"Insert product's minimum quantity"}
              />
            </div>
            <div>
              <CustomNumberFormatInput
                name={`discounts.${idx}.amount`}
                control={form.control}
                label={'Amount'}
                placeholder={'Insert discount amount'}
              />
            </div>
            <div>
              <DatePicker
                name={`discounts.${idx}.start_date`}
                control={form.control}
                label={'Start Date'}
              />
            </div>
            <div>
              <DatePicker
                name={`discounts.${idx}.end_date`}
                control={form.control}
                label={'End Date'}
                minDate={
                  new Date(form.watch(`discounts.${idx}.start_date`) as string)
                }
              />
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Discount
