'use client'

import React, { FC } from 'react'
import { CommonFormProps } from '@/type/Common'
import useProductForm from '@/components/ProductsPage/Form/useProductForm'
import { Form } from '@/components/shared/ui/form'
import { ChevronLeft, ChevronRight, Save } from 'lucide-react'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant, IconPlacementType } from '@/type/FormInputs'
import Stepper from '@/components/ProductsPage/Form/Stepper'

const ProductForm: FC<CommonFormProps> = ({ id }) => {
  const {
    activeStep,
    activeStepIdx,
    steps,
    form,
    isLoading,
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
      <Stepper
        steps={steps}
        activeStep={activeStep}
        activeStepIdx={activeStepIdx}
      />
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
              disabled={!activeStepIdx || isLoading}
            />
            {activeStepIdx + 1 === steps.length ? (
              <CustomButton
                label={'Save'}
                type={ButtonType.SUBMIT}
                icon={Save}
                iconPlacement={IconPlacementType.RIGHT}
                isLoading={isLoading}
              />
            ) : (
              <CustomButton
                label={'Next'}
                type={ButtonType.BUTTON}
                icon={ChevronRight}
                iconPlacement={IconPlacementType.RIGHT}
                disabled={isLoading}
                onClick={() => {
                  handleActiveSteps('next')
                }}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ProductForm
