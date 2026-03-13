'use client'

import React from 'react'
import useDiscountForm from '@/components/DiscountsPage/Form/useDiscountForm'
import { Form } from '@/components/shared/ui/form'
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
import { Plus, ScanBarcode } from 'lucide-react'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { Separator } from '@/components/shared/ui/separator'
import { cn } from '@/lib/utils'
import AddProduct from '@/components/DiscountsPage/Form/AddProduct/AddProduct'

const DiscountsForm = () => {
  const { form, onSubmit, productSchemaOpen, handleOpenProductSchema } =
    useDiscountForm()

  return (
    <>
      <AddProduct open={productSchemaOpen} onClose={handleOpenProductSchema} />
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
            className="w-full max-w-2xl grid lg:grid-cols-2 gap-x-6 gap-y-10"
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
              <CustomSelect
                name={'discount_type'}
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
                name={'payment_type'}
                control={form.control}
                label={'Payment Type'}
                placeholder={'Select payment type'}
                options={['All Payments', 'Cash', 'Credit'].map((opt) => ({
                  label: opt,
                  value: opt.toLowerCase().replace(' ', '_'),
                }))}
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
