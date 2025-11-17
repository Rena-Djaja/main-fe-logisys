'use client'

import React, { FC } from 'react'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { Layers2, Plus, Trash } from 'lucide-react'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/shared/ui/empty'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/shared/ui/form'
import { Switch } from '@/components/shared/ui/switch'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomNumberFormatInput from '@/components/shared/FormInputs/CustomNumberFormatInput'
import { FormStepProps } from '@/type/Product'
import useVariant from '@/components/ProductsPage/Form/Steps/Variant/useVariant'
import Discount from '@/components/ProductsPage/Form/Steps/Variant/Discount/Discount'
import Complimentary from '@/components/ProductsPage/Form/Steps/Variant/Complimentary/Complimentary'

const Variant: FC<FormStepProps> = (props) => {
  const { fields, handleAddRow, remove } = useVariant(props)
  const { form } = props

  return (
    <div className="w-full lg:col-span-2 flex flex-col gap-8">
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold text-[1.25rem]">Product Variants</h2>
          <span className="font-medium text-[0.85rem] text-muted-foreground">
            You can add more than one product variants that apply to this
            product.
          </span>
          {form.formState.errors?.variants?.root && (
            <span className="font-medium text-[0.85rem] text-destructive">
              {form.formState.errors?.variants?.root?.message}
            </span>
          )}
        </div>
        <div>
          <CustomButton
            label={'Add Variant'}
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
              <Layers2 />
            </EmptyMedia>
            <EmptyTitle>No product variant added</EmptyTitle>
            <EmptyDescription>
              You have not added any variant yet. Please add one by clicking the
              button below.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex">
              <CustomButton
                label={'Add Variant'}
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
            >
              <Trash className="size-4.5 text-destructive" />
            </button>
            <div className="lg:col-span-2">
              <CustomInput
                name={`variants.${idx}.name`}
                control={form.control}
                label={'Variant Name'}
                placeholder={'Insert variant name'}
              />
            </div>
            <div>
              <CustomNumberFormatInput
                name={`variants.${idx}.extra_base_price`}
                control={form.control}
                label={'Extra Base Price (Rp)'}
                placeholder={'Insert variant extra base price'}
                helperText={'Insert `0` if no extra price'}
              />
            </div>
            <div>
              <CustomNumberFormatInput
                name={`variants.${idx}.extra_selling_price`}
                control={form.control}
                label={'Extra Selling Price (Rp)'}
                placeholder={'Insert variant extra selling price'}
                helperText={'Insert `0` if no extra price'}
              />
            </div>
            <div className="lg:col-span-2 w-full flex flex-col gap-4">
              <div>
                <FormField
                  name={`variants.${idx}.custom_discount`}
                  control={form.control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <FormItem className="lg:col-span-2 w-full flex items-center gap-2">
                        <FormControl>
                          <Switch
                            className="!opacity-100"
                            id={`${idx}.custom_discount`}
                            defaultChecked={!!value}
                            onClick={() => onChange(!value)}
                          />
                        </FormControl>
                        <FormLabel>Use custom discount schema</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              </div>
              <Discount form={form} variantIdx={idx} />
            </div>
            <div className="lg:col-span-2 w-full flex flex-col gap-4">
              <div>
                <FormField
                  name={`variants.${idx}.custom_complimentary`}
                  control={form.control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <FormItem className="lg:col-span-2 w-full flex items-center gap-2">
                        <FormControl>
                          <Switch
                            className="!opacity-100"
                            id={`${idx}.custom_complimentary`}
                            defaultChecked={!!value}
                            onClick={() => onChange(!value)}
                          />
                        </FormControl>
                        <FormLabel>Use custom complimentary schema</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              </div>
              <Complimentary form={form} variantIdx={idx} />
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Variant
