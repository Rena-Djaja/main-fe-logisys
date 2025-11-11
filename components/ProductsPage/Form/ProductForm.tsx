'use client'

import React, { FC } from 'react'
import { CommonFormProps } from '@/type/Common'
import useProductForm from '@/components/ProductsPage/Form/useProductForm'
import { Form } from '@/components/shared/ui/form'
import { ChevronLeft, ChevronRight, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant, IconPlacementType } from '@/type/FormInputs'

const ProductForm: FC<CommonFormProps> = ({ id }) => {
  const {
    activeStep,
    activeStepIdx,
    steps,
    form,
    onSubmit,
    handleActiveSteps,
  } = useProductForm()

  return (
    <div className="mt-8 w-full flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="font-semibold text-[2rem]">
          {!!id ? 'Edit' : 'Add'} Product
        </h1>
        <span className="font-medium text-[0.95rem]">
          {!!id ? 'Update' : 'Add new'} product record
        </span>
      </div>
      <div className="w-full flex items-center gap-6 mt-2 mb-8">
        {steps.map((each, idx) => (
          <div
            key={idx}
            className={cn(
              'flex items-center gap-2',
              idx > activeStepIdx && 'opacity-45'
            )}
          >
            <div className="p-3 rounded-full bg-sidebar-border">
              <each.icon className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-[0.925rem]">
                {each.title}
              </span>
              <span className="font-medium text-[0.75rem]">
                {each.description}
              </span>
            </div>
            {idx + 1 < steps.length && <ChevronRight className="size-5 ml-6" />}
          </div>
        ))}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-2xl grid lg:grid-cols-2 gap-x-6 gap-y-10"
        >
          <activeStep.component />
          <div className="lg:col-span-2 w-full flex flex-col lg:flex-row lg:justify-between gap-4">
            <CustomButton
              label={'Previous'}
              type={ButtonType.BUTTON}
              variant={ButtonVariant.SECONDARY}
              icon={ChevronLeft}
              onClick={() => handleActiveSteps('previous')}
              disabled={!activeStepIdx}
            />
            <CustomButton
              label={activeStepIdx + 1 === steps.length ? 'Save' : 'Next'}
              type={
                activeStepIdx + 1 === steps.length
                  ? ButtonType.SUBMIT
                  : ButtonType.BUTTON
              }
              icon={activeStepIdx + 1 === steps.length ? Save : ChevronRight}
              iconPlacement={IconPlacementType.RIGHT}
              {...(activeStepIdx + 1 !== steps.length && {
                onClick: () => handleActiveSteps('next'),
              })}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ProductForm
