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
import {
  ComplimentaryItemData,
  ComplimentaryItemRequest,
  InsertProductRequest,
  ProductFormInputs,
} from '@/type/Product'
import Discount from '@/components/ProductsPage/Form/Steps/Discount/Discount'
import Complimentary from '@/components/ProductsPage/Form/Steps/Complimentary/Complimentary'
import Variant from '@/components/ProductsPage/Form/Steps/Variant/Variant'
import { apiStatusChecker, parseDate } from '@/lib/utils'
import { callAPI } from '@/lib/fetchers'
import { ProductAPI } from '@/constant/APIUrls'
import { CommonApiResponse } from '@/type/Common'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

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
      component: () => <Variant form={form} />,
    },
  ]

  const { push } = useRouter()

  const [activeStepIdx, setActiveStepIdx] = useState(0)
  const [activeStep, setActiveStep] = useState(steps[activeStepIdx])
  const [isLoading, setIsLoading] = useState(false)

  const handleComplimentaryItems = (cmpItem: ComplimentaryItemData[]) => {
    const items: ComplimentaryItemRequest[] = []

    cmpItem.forEach((item) => {
      item.variants.forEach((variant) => {
        const amount = Number(variant.amount.replaceAll(',', ''))

        if (amount > 0) {
          const row = {
            complimentary_variant_id: Number(variant.complimentary_variant_id),
            amount: Number(variant.amount.replaceAll(',', '')),
          }
          items.push(row)
        }
      })
    })

    return items
  }

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    push('/dashboard/products')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: ProductFormInputs) => {
    setIsLoading(true)

    try {
      const req = {
        product_name: data.product_name,
        sku: data.sku,
        supplier_id: Number(data.supplier_id),
        category: data.category,
        unit: data.unit,
        base_price: Number(data.base_price.replaceAll(',', '')),
        selling_price: Number(data.selling_price.replaceAll(',', '')),
        variants: data.variants.length
          ? data.variants.map((variant) => ({
              name: variant.name,
              extra_base_price: Number(
                variant.extra_base_price.replaceAll(',', '')
              ),
              extra_selling_price: Number(
                variant.extra_selling_price.replaceAll(',', '')
              ),
              discount: variant.custom_discount
                ? variant.discounts?.map((customDsc) => ({
                    ...customDsc,
                    quantity: Number(customDsc.quantity.replaceAll(',', '')),
                    amount: Number(customDsc.amount.replaceAll(',', '')),
                    start_date: parseDate(customDsc.start_date),
                    end_date: customDsc.end_date || null,
                  })) || []
                : data.discounts?.map((dsc) => ({
                    ...dsc,
                    quantity: Number(dsc.quantity.replaceAll(',', '')),
                    amount: Number(dsc.amount.replaceAll(',', '')),
                    start_date: parseDate(dsc.start_date),
                    end_date: dsc.end_date || null,
                  })) || [],
              complimentary: variant.custom_complimentary
                ? variant.complimentary?.map((customCmp) => ({
                    ...customCmp,
                    quantity: Number(customCmp.quantity.replaceAll(',', '')),
                    start_date: parseDate(customCmp.start_date),
                    end_date: customCmp.end_date
                      ? parseDate(customCmp.end_date)
                      : null,
                    items: handleComplimentaryItems(customCmp.items),
                  })) || []
                : data.complimentary?.map((cmp) => ({
                    ...cmp,
                    quantity: Number(cmp.quantity.replaceAll(',', '')),
                    start_date: parseDate(cmp.start_date),
                    end_date: cmp.end_date ? parseDate(cmp.end_date) : null,
                    items: handleComplimentaryItems(cmp.items),
                  })) || [],
            }))
          : [
              {
                name: 'Umum',
                extra_base_price: 0,
                extra_selling_price: 0,
                discount:
                  data.discounts?.map((dsc) => ({
                    ...dsc,
                    quantity: Number(dsc.quantity.replaceAll(',', '')),
                    amount: Number(dsc.amount.replaceAll(',', '')),
                    start_date: parseDate(dsc.start_date),
                    end_date: dsc.end_date || null,
                  })) || [],
                complimentary:
                  data.complimentary?.map((cmp) => ({
                    ...cmp,
                    quantity: Number(cmp.quantity.replaceAll(',', '')),
                    start_date: parseDate(cmp.start_date),
                    end_date: cmp.end_date ? parseDate(cmp.end_date) : null,
                    items: handleComplimentaryItems(cmp.items),
                  })) || [],
              },
            ],
      }

      const apiRes = await callAPI<InsertProductRequest, CommonApiResponse>(
        ProductAPI.POST_PRODUCT,
        req,
        { method: 'POST' }
      )

      const { status, data: postProductData } = apiRes

      if (apiStatusChecker(status) && postProductData) {
        handleSuccess(postProductData)
      } else {
        handleFailure(postProductData)
      }
    } catch {
      handleFailure()
      throw 'Failed to insert product'
    } finally {
      setIsLoading(false)
    }
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
      default:
        return
    }
  }

  return {
    activeStep,
    activeStepIdx,
    steps,
    form,
    isLoading,
    onSubmit,
    handleActiveSteps,
  }
}

export default useProductForm
