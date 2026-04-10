'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { discountValidationSchema } from '@/validations/DiscountValidation'
import { useEffect, useState } from 'react'
import { BulkProductDetailsProps } from '@/type/Product'
import {
  DiscountFormInputs,
  DiscountProductFormInputs,
  DiscountVariantItemFormInputs,
  DiscountVariantParentFormInputs,
  PostDiscountRequest,
  VariantRequestProps,
} from '@/type/Discounts'
import { apiStatusChecker, convertStringToNumber } from '@/lib/utils'
import { callAPI } from '@/lib/fetchers'
import { CommonApiResponse } from '@/type/Common'
import { DiscountAPI } from '@/constant/APIUrls'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const useDiscountForm = () => {
  const { push } = useRouter()
  const form = useForm<DiscountFormInputs>({
    resolver: zodResolver(discountValidationSchema),
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: undefined,
      valid_thru_days: undefined,
      is_combinable: false,
      products: [],
    },
  })

  const {
    fields: addedProducts,
    append,
    remove,
  } = useFieldArray({
    name: 'products',
    control: form.control,
  })

  const [productSchemaOpen, setProductSchemaOpen] = useState(false)
  const [isLoading, setIsLoading] = useState({
    page: false,
    submit: false,
  })

  const handleOpenProductSchema = () => {
    setProductSchemaOpen((prev) => !prev)
  }

  const handleAddProduct = (data: BulkProductDetailsProps[]) => {
    const existedIds = form.getValues('products').map((each) => String(each.id))

    const existedSet = new Set(existedIds)

    data.forEach((each) => {
      if (!existedSet.has(String(each.id))) {
        const row: DiscountProductFormInputs = {
          ...each,
          variants: each.variants.map((variant) => ({
            product_variant_id: variant.id,
            name: variant.name,
            is_active: variant.is_active,
            discount_type: '' as 'percentage' | 'price',
          })),
        }
        append(row)
      }
    })
  }

  const handleRemoveProduct = (idx: number) => {
    remove(idx)
  }

  const handleValidateEndDate = () => {
    const startDate = new Date(form.getValues('start_date'))
    const endDate = new Date(form.getValues('end_date') || '')

    if (startDate > endDate) {
      form.setError('end_date', {
        type: 'manual',
        message: 'End date must be after the start date',
      })
    } else {
      form.clearErrors('end_date')
    }
  }

  const handleMapVariantSchema = (
    varParent: DiscountVariantParentFormInputs,
    varItem: DiscountVariantItemFormInputs,
    type: 'cash' | 'credit'
  ) => {
    return {
      product_variant_id: varParent.product_variant_id,
      payment_type: type,
      discount_type: varParent.discount_type,
      discount_amount: convertStringToNumber(varItem.discount_amount),
      is_active: varParent.is_active,
      limit: convertStringToNumber(varParent?.limit || '') || null,
      min_quantity: convertStringToNumber(varItem.min_quantity),
      max_quantity: convertStringToNumber(varItem?.max_quantity || '') || null,
    } as VariantRequestProps
  }

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    push('/dashboard/discounts')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  console.log(form.getValues())

  const onSubmit = async (data: DiscountFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      let variants: VariantRequestProps[] = []

      data.products.forEach((product) => {
        product.variants.forEach((variant) => {
          const cashRows: VariantRequestProps[] =
            variant.cash?.map((each) =>
              handleMapVariantSchema(variant, each, 'cash')
            ) || []
          const creditRows: VariantRequestProps[] =
            variant.credit?.map((each) =>
              handleMapVariantSchema(variant, each, 'credit')
            ) || []

          variants = [...variants, ...cashRows, ...creditRows]
        })
      })

      const req: PostDiscountRequest = {
        name: data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date || null,
        is_combinable: data.is_combinable,
        valid_thru_days: convertStringToNumber(data.valid_thru_days),
        discount_items: variants,
      }

      const apiRes = await callAPI<PostDiscountRequest, CommonApiResponse>(
        DiscountAPI.POST_DISCOUNT,
        req,
        { method: 'POST' }
      )

      const { status, data: postDiscountRes } = apiRes

      if (apiStatusChecker(status) && postDiscountRes) {
        handleSuccess(postDiscountRes)
      } else {
        handleFailure(postDiscountRes)
      }
    } catch {
      handleFailure()
      throw 'Failed to post discounts'
    } finally {
      setIsLoading((prev) => ({ ...prev, submit: false }))
    }
  }

  useEffect(() => {
    handleValidateEndDate()
  }, [form.watch('start_date'), form.watch('end_date')])

  return {
    form,
    productSchemaOpen,
    addedProducts,
    isLoading,
    onSubmit,
    handleOpenProductSchema,
    handleAddProduct,
    handleRemoveProduct,
  }
}

export default useDiscountForm
