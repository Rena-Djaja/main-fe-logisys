'use client'

import React, { FC } from 'react'
import useDiscountForm from '@/components/DiscountsPage/Form/useDiscountForm'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/shared/ui/form'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import { ButtonType, ButtonVariant, InputType } from '@/type/FormInputs'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/shared/ui/empty'
import { Minus, Plus, ScanBarcode } from 'lucide-react'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { Separator } from '@/components/shared/ui/separator'
import { cn } from '@/lib/utils'
import AddProduct from '@/components/DiscountsPage/Form/AddProduct/AddProduct'
import CustomNumberFormatInput from '@/components/shared/FormInputs/CustomNumberFormatInput'
import { Switch } from '@/components/shared/ui/switch'
import DatePicker from '@/components/shared/DatePicker/DatePicker'
import ItemVariant from '@/components/DiscountsPage/Form/ItemVariant/ItemVariant'
import { CommonFormProps } from '@/type/Common'

const DiscountsForm: FC<CommonFormProps> = ({ id }) => {
  const {
    form,
    productSchemaOpen,
    addedProducts,
    isLoading,
    onSubmit,
    handleOpenProductSchema,
    handleAddProduct,
    handleRemoveProduct,
  } = useDiscountForm({ id })

  return (
    <>
      <AddProduct
        open={productSchemaOpen}
        onClose={handleOpenProductSchema}
        onAdd={handleAddProduct}
        products={form.watch('products')}
      />
      <div className="mt-8 w-full flex flex-col gap-10">
        <div className="w-full flex flex-col">
          <h1 className="font-semibold text-[2rem]">Add Discount</h1>
          <span className="font-medium text-[0.95rem]">
            Add new product discount
          </span>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-x-6 gap-y-10"
          >
            <div className="w-full max-w-3xl grid lg:grid-cols-2 gap-x-6 gap-y-10">
              <div className="lg:col-span-2">
                <CustomInput
                  name={'name'}
                  control={form.control}
                  label={'Discount Name'}
                  placeholder={'Enter discount name'}
                />
              </div>
              <div className="lg:col-span-2">
                <CustomInput
                  name={'description'}
                  control={form.control}
                  label={'Description'}
                  placeholder={'Enter discount description'}
                  type={InputType.TEXTAREA}
                />
              </div>
              <div>
                <DatePicker
                  name={'start_date'}
                  control={form.control}
                  label={'Start Date'}
                  placeholder={'Select start date'}
                />
              </div>
              <div>
                <DatePicker
                  name={'end_date'}
                  control={form.control}
                  label={'End Date'}
                  placeholder={'Select end date'}
                  minDate={new Date(form.watch('start_date'))}
                />
              </div>
              <div>
                <CustomNumberFormatInput
                  name={'valid_thru_days'}
                  control={form.control}
                  label={'Valid Thru Days'}
                  placeholder={'Enter valid thru days'}
                />
              </div>
              <div className="w-full lg:col-span-2">
                <FormField
                  name={'is_combinable'}
                  control={form.control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <div className="w-full flex gap-4">
                            <FormLabel>Is Discount Combinable</FormLabel>
                            <Switch
                              id={'is_combinable'}
                              defaultChecked={!!value}
                              onClick={() => {
                                onChange(!value)
                              }}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
              </div>
            </div>
            <div>
              <Separator />
            </div>
            <div className="flex flex-col gap-7">
              <div className="w-full flex justify-between items-center gap-4">
                <div className="w-full flex flex-col gap-2">
                  <h2 className="font-semibold text-[1.25rem]">Products</h2>
                  <span className="font-medium text-[0.85rem] text-muted-foreground">
                    You can add more than one of specific products that apply to
                    this discount schema.
                  </span>
                  {form.formState.errors.products?.message && (
                    <span className="text-destructive text-sm">
                      {form.formState.errors.products?.message}
                    </span>
                  )}
                </div>
                <div>
                  <CustomButton
                    label={'Add Product'}
                    icon={Plus}
                    variant={ButtonVariant.OUTLINE}
                    onClick={handleOpenProductSchema}
                    type={ButtonType.BUTTON}
                  />
                </div>
              </div>
              {!addedProducts.length ? (
                <Empty
                  className={cn(
                    'border',
                    form.formState.errors.products?.message &&
                      'border-destructive'
                  )}
                >
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <ScanBarcode />
                    </EmptyMedia>
                    <EmptyTitle>No product schemas added</EmptyTitle>
                    <EmptyDescription>
                      You have not added any product schemas yet. Please add one
                      by clicking the button below.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <div className="flex">
                      <CustomButton
                        label={'Add Product'}
                        variant={ButtonVariant.OUTLINE}
                        onClick={handleOpenProductSchema}
                        type={ButtonType.BUTTON}
                      />
                    </div>
                  </EmptyContent>
                </Empty>
              ) : (
                <div className="flex flex-col gap-6">
                  {addedProducts.map((each, productIdx) => (
                    <div key={each.id} className="w-full flex flex-col gap-6">
                      <div className="w-full flex justify-between items-center gap-4">
                        <div className="w-full flex gap-4 items-center">
                          <div className="p-2 bg-accent rounded-md">
                            <ScanBarcode />
                          </div>
                          <div className="w-full flex flex-col">
                            <span className="font-bold text-[1.365rem]">
                              {each.name}
                            </span>
                            <span className="font-semibold text-[0.825rem] text-muted-foreground">
                              SKU: {each.sku}
                            </span>
                          </div>
                        </div>
                        <button
                          type={ButtonType.BUTTON}
                          className="border border-primary rounded-sm p-0.5"
                          onClick={() => handleRemoveProduct(productIdx)}
                        >
                          <Minus className="size-3" />
                        </button>
                      </div>
                      {each.variants.map((variant, variantIdx) => (
                        <div
                          key={variantIdx}
                          className={cn(
                            'px-4 py-6 border rounded-md bg-primary-foreground/50 w-full flex flex-col gap-10',
                            form.formState.errors?.products?.[productIdx]
                              ?.variants?.[variantIdx]?.message &&
                              '!border-destructive',
                            !form.watch(
                              `products.${productIdx}.variants.${variantIdx}.is_active`
                            ) && 'opacity-50 pointer-events-none'
                          )}
                        >
                          <div className="w-full flex justify-between items-center gap-4">
                            <div className="w-full flex gap-2 items-center">
                              <div
                                className={cn(
                                  'size-2 rounded-full transition-all duration-200',
                                  !form.watch(
                                    `products.${productIdx}.variants.${variantIdx}.is_active`
                                  )
                                    ? 'bg-muted-foreground'
                                    : 'bg-chart-2 animate-pulse'
                                )}
                              />
                              <span className="font-semibold text-[0.987rem]">
                                {variant.name}
                              </span>
                            </div>
                            <div className="w-full flex items-center gap-5">
                              <div className="w-full">
                                <CustomSelect
                                  name={`products.${productIdx}.variants.${variantIdx}.discount_type`}
                                  control={form.control}
                                  placeholder={'Discount type'}
                                  disabled={
                                    !form.watch(
                                      `products.${productIdx}.variants.${variantIdx}.is_active`
                                    )
                                  }
                                  options={['Price', 'Percentage'].map(
                                    (opt) => ({
                                      label: opt,
                                      value: opt.toLowerCase(),
                                    })
                                  )}
                                />
                              </div>
                              <div className={'w-full'}>
                                <CustomNumberFormatInput
                                  name={`products.${productIdx}.variants.${variantIdx}.limit`}
                                  control={form.control}
                                  placeholder={'Limit'}
                                  disabled={
                                    !form.watch(
                                      `products.${productIdx}.variants.${variantIdx}.is_active`
                                    )
                                  }
                                />
                              </div>
                              <div className="w-fit">
                                <FormField
                                  name={`products.${productIdx}.variants.${variantIdx}.is_active`}
                                  control={form.control}
                                  render={({ field: { onChange, value } }) => {
                                    return (
                                      <FormItem>
                                        <FormControl>
                                          <div className="flex gap-3 items-center !pointer-events-auto">
                                            <FormLabel className="lg:hidden font-semibold text-[0.8rem]">
                                              Inactive
                                            </FormLabel>
                                            <Switch
                                              id={`${variant.product_variant_id}.is_active`}
                                              defaultChecked={!!value}
                                              onClick={() => {
                                                onChange(!value)
                                                form.clearErrors(
                                                  `products.${productIdx}.variants.${variantIdx}`
                                                )
                                              }}
                                            />
                                            <FormLabel className="lg:hidden font-semibold text-[0.8rem]">
                                              Active
                                            </FormLabel>
                                          </div>
                                        </FormControl>
                                      </FormItem>
                                    )
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div className="w-full flex gap-8">
                            <ItemVariant
                              productIdx={productIdx}
                              variantIdx={variantIdx}
                              paymentType={'cash'}
                              form={form}
                            />
                            <ItemVariant
                              productIdx={productIdx}
                              variantIdx={variantIdx}
                              paymentType={'credit'}
                              form={form}
                            />
                          </div>
                          {form.formState.errors?.products?.[productIdx]
                            ?.variants?.[variantIdx]?.message && (
                            <span className="text-[0.875rem] text-destructive">
                              {
                                form.formState.errors?.products?.[productIdx]
                                  ?.variants?.[variantIdx]?.message
                              }
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="lg:col-span-2 mt-4 flex gap-2">
              <CustomButton
                type={ButtonType.BUTTON}
                variant={ButtonVariant.OUTLINE}
                label={'Cancel'}
                link={'/dashboard/discounts'}
                disabled={isLoading.submit}
              />
              <CustomButton label={'Save'} isLoading={isLoading.submit} />
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default DiscountsForm
