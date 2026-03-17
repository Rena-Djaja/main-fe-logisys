'use client'

import React from 'react'
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

const DiscountsForm = () => {
  const {
    form,
    productSchemaOpen,
    addedProducts,
    onSubmit,
    handleOpenProductSchema,
    handleAddProduct,
    handleRemoveProduct,
  } = useDiscountForm()

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
            className="w-full max-w-4xl grid lg:grid-cols-2 gap-x-6 gap-y-10"
          >
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
            <div className="lg:col-span-2">
              <Separator />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4">
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
                <div className="flex flex-col border rounded-md divide-y">
                  {addedProducts.map((each, productIdx) => (
                    <div key={each.id} className="w-full flex flex-col p-4">
                      <div className="w-full flex justify-between items-center gap-4">
                        <span className="font-semibold text-[0.925rem]">
                          {each.name}
                        </span>
                        <button
                          type={ButtonType.BUTTON}
                          className="border border-primary rounded-sm p-0.5"
                          onClick={() => handleRemoveProduct(productIdx)}
                        >
                          <Minus className="size-3" />
                        </button>
                      </div>
                      <div className="w-full p-4 flex flex-col gap-4">
                        {each.variants.map((variant, variantIdx) => (
                          <div
                            key={variant.id}
                            className="w-full flex flex-col lg:flex-row lg:items-center py-2 gap-5"
                          >
                            <span className="w-full font-medium text-[0.875rem] md:col-span-2 lg:col-span-1">
                              {variant.name}
                            </span>
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
                                options={['Price', 'Percentage'].map((opt) => ({
                                  label: opt,
                                  value: opt.toLowerCase(),
                                }))}
                              />
                            </div>
                            <div className="w-full">
                              <CustomSelect
                                name={`products.${productIdx}.variants.${variantIdx}.payment_type`}
                                control={form.control}
                                placeholder={'Payment type'}
                                disabled={
                                  !form.watch(
                                    `products.${productIdx}.variants.${variantIdx}.is_active`
                                  )
                                }
                                options={['All Payments', 'Cash', 'Credit'].map(
                                  (opt) => ({
                                    label: opt,
                                    value: opt.toLowerCase().replace(' ', '_'),
                                  })
                                )}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              {form.watch(
                                `products.${productIdx}.variants.${variantIdx}.discount_type`
                              ) && (
                                <span
                                  className={
                                    cn(
                                      form.watch(
                                        `products.${productIdx}.variants.${variantIdx}.discount_type`
                                      ) === 'price'
                                    )
                                      ? 'order-1'
                                      : 'order-2'
                                  }
                                >
                                  {form.watch(
                                    `products.${productIdx}.variants.${variantIdx}.discount_type`
                                  ) === 'price'
                                    ? 'Rp'
                                    : form.watch(
                                          `products.${productIdx}.variants.${variantIdx}.discount_type`
                                        ) === 'percentage'
                                      ? '%'
                                      : ''}
                                </span>
                              )}
                              <div
                                className={cn(
                                  form.watch(
                                    `products.${productIdx}.variants.${variantIdx}.discount_type`
                                  ) === 'price'
                                    ? 'order-2'
                                    : 'order-1',
                                  'w-full'
                                )}
                              >
                                <div className="w-full min-w-[10rem]">
                                  <CustomNumberFormatInput
                                    name={`products.${productIdx}.variants.${variantIdx}.discount_amount`}
                                    control={form.control}
                                    placeholder={'Discount amount'}
                                    disabled={
                                      !form.watch(
                                        `products.${productIdx}.variants.${variantIdx}.is_active`
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="w-fit">
                              <FormField
                                name={`products.${productIdx}.variants.${variantIdx}.is_active`}
                                control={form.control}
                                render={({ field: { onChange, value } }) => {
                                  return (
                                    <FormItem>
                                      <FormControl>
                                        <div className="flex gap-3 items-center">
                                          <FormLabel className="lg:hidden font-semibold text-[0.8rem]">
                                            Inactive
                                          </FormLabel>
                                          <Switch
                                            id={`${variant.id}.is_active`}
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
                        ))}
                      </div>
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
                // disabled={isLoading.submit}
              />
              <CustomButton
                label={'Save'}
                // isLoading={isLoading.submit}
              />
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default DiscountsForm
