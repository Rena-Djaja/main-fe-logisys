'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { discountValidationSchema } from '@/validations/DiscountValidation'
import { useEffect, useState } from 'react'
import { BulkProductDetailsProps } from '@/type/Product'
import {
  DiscountFormInputs,
  DiscountItemsResponse,
  DiscountProductFormInputs,
  DiscountRuleDetailsResponse,
  DiscountVariantItemFormInputs,
  DiscountVariantParentFormInputs,
  PostDiscountRequest,
  VariantRequestProps,
} from '@/type/Discounts'
import { apiStatusChecker, convertStringToNumber } from '@/lib/utils'
import { callAPI } from '@/lib/fetchers'
import {
  CommonApiResponse,
  CommonDetailsRequest,
  CommonFormProps,
} from '@/type/Common'
import { DiscountAPI } from '@/constant/APIUrls'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { mapDiscountsByProductId } from '@/components/DiscountsPage/Resource'

const useDiscountForm = (props: CommonFormProps) => {
  const { id } = props
  const { push } = useRouter()

  const form = useForm<DiscountFormInputs>({
    resolver: zodResolver(discountValidationSchema),
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: undefined,
      valid_thru_days: '',
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
    const existedIds = form
      .getValues('products')
      .map((each) => String(each.product_id))

    const existedSet = new Set(existedIds)

    data.forEach((each) => {
      if (!existedSet.has(String(each.id))) {
        const row: DiscountProductFormInputs = {
          product_id: each.id,
          name: each.name,
          sku: each.sku,
          supplier_id: each.supplier_id,
          supplier_name: each.supplier_name,
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
      ...(varItem?.id && { id: varItem.id }),
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
        ...(id && { id: Number(id) }),
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

  const fetchDetails = async () => {
    try {
      const apiRes = await callAPI<
        CommonDetailsRequest,
        DiscountRuleDetailsResponse
      >(
        DiscountAPI.GET_DISCOUNT_RULE_DETAILS,
        { id: Number(id) },
        { method: 'GET' }
      )

      const { data: discountDetailsData, status } = apiRes

      if (apiStatusChecker(status) && discountDetailsData) {
        return discountDetailsData.data
      } else {
        handleFailure(discountDetailsData)
      }
    } catch {
      handleFailure()
      throw 'Failed to fetch details'
    }
  }

  const fetchDiscountItems = async () => {
    try {
      const apiRes = await callAPI<CommonDetailsRequest, DiscountItemsResponse>(
        DiscountAPI.GET_DISCOUNT_ITEM_LIST,
        { id: Number(id) },
        { method: 'GET' }
      )

      const { data: discountItemsData, status } = apiRes

      if (apiStatusChecker(status) && discountItemsData) {
        return discountItemsData.data
      } else {
        handleFailure(discountItemsData)
      }
    } catch {
      handleFailure()
      throw 'Failed to fetch discount items'
    }
  }

  const fetchDiscount = async () => {
    const [discountDetails, discountItems] = await Promise.all([
      fetchDetails(),
      fetchDiscountItems(),
    ])

    if (discountDetails && discountItems) {
      ;[
        'name',
        'description',
        'start_date',
        'end_date',
        'is_combinable',
        'valid_thru_days',
      ].forEach((each) => {
        if (each === 'is_combinable') {
          form.setValue(
            each as keyof DiscountFormInputs,
            // @ts-ignore
            discountDetails[each as keyof DiscountFormInputs]
          )
        } else {
          form.setValue(
            each as keyof DiscountFormInputs,
            // @ts-ignore
            String(discountDetails[each as keyof DiscountFormInputs])
          )
        }

        const items = mapDiscountsByProductId(discountItems)

        form.setValue('products', items)
      })
    }
  }

  useEffect(() => {
    handleValidateEndDate()
  }, [form.watch('start_date'), form.watch('end_date')])

  useEffect(() => {
    if (!!id) {
      fetchDiscount()
    }
  }, [id])

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
