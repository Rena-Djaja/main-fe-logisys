'use client'

import { FieldPath, useForm } from 'react-hook-form'
import {
  Layers2,
  LucideProps,
  Package,
  Percent,
  ShoppingBag,
} from 'lucide-react'
import React, { useState } from 'react'
import Details from '@/components/ProductsPage/Form/Steps/Details/Details'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  productFormValidationSchema,
  productSchemaKeys,
} from '@/validations/ProductValidation'
import { ProductFormInputs } from '@/type/Product'
import Discount from '@/components/ProductsPage/Form/Steps/Discount/Discount'
import Complimentary from '@/components/ProductsPage/Form/Steps/Complimentary/Complimentary'

const useProductForm = () => {
  const form = useForm<ProductFormInputs>({
    mode: 'all',
    resolver: zodResolver(productFormValidationSchema),
    defaultValues: {
      product_name: '',
      sku: '',
      supplier_id: '',
      category: '',
      unit: '',
      base_price: '',
      selling_price: '',
      discounts: [],
      complimentary: [],
    },
  })

  const steps = [
    {
      title: 'Product Details',
      description: 'Enter Product Details',
      icon: (props: LucideProps) => <Package {...props} />,
      component: () => <Details form={form} />,
    },
    {
      title: 'Discount',
      description: "Setup Product's Discount",
      icon: (props: LucideProps) => <Percent {...props} />,
      component: () => <Discount form={form} />,
    },
    {
      title: 'Complimentary',
      description: "Setup Product's Complimentary",
      icon: (props: LucideProps) => <ShoppingBag {...props} />,
      component: () => <Complimentary form={form} />,
    },
    {
      title: 'Variants',
      description: "Setup Product's Variants",
      icon: (props: LucideProps) => <Layers2 {...props} />,
      component: () => <Details form={form} />,
    },
  ]

  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const [activeStep, setActiveStep] = useState(steps[activeStepIdx])

  console.log(form.formState.errors)

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  const handleActiveSteps = async (type: 'previous' | 'next') => {
    switch (type) {
      case 'previous':
        {
          setActiveStepIdx((prev) => prev - 1)
          setActiveStep(steps[activeStepIdx - 1])
        }
        break
      case 'next':
        {
          const isSuccess = await form.trigger(
            productSchemaKeys[activeStepIdx] as FieldPath<ProductFormInputs>[]
          )

          if (isSuccess) {
            setActiveStepIdx((prev) => prev + 1)
            setActiveStep(steps[activeStepIdx + 1])
          }
        }
        break
    }
  }

  return {
    activeStep,
    activeStepIdx,
    steps,
    form,
    onSubmit,
    handleActiveSteps,
  }
}

export default useProductForm
