'use client'

import { CommonApiResponse, CommonFormProps } from '@/type/Common'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { ProductAPI } from '@/constant/APIUrls'
import {
  ComplimentaryItemProps,
  EditComplimentaryItemData,
  EditComplimentaryItemRequest,
  EditVariantRequest,
  ProductDetailsRequest,
  ProductProps,
  ProductVariantFormInputs,
  ProductVariantProps,
} from '@/type/Product'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { editVariantSchema } from '@/validations/ProductValidation'
import { useRouter } from 'next/navigation'
import { callAPI } from '@/lib/fetchers'
import { toast } from 'sonner'
import { apiStatusChecker } from '@/lib/utils'

const useEditVariant = ({ id }: CommonFormProps) => {
  const { push } = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const { data: productVariantDetails, isValidating: isVariantValidating } =
    useCommonApi<ProductDetailsRequest, ProductVariantProps>(
      ProductAPI.GET_PRODUCT_VARIANT_DETAILS,
      { id: Number(id) },
      { method: 'GET' }
    )

  const { data: productDetails, isValidating: isDetailsLoading } = useCommonApi<
    ProductDetailsRequest,
    ProductProps
  >(
    ProductAPI.GET_PRODUCT_DETAILS,
    { id: Number(productVariantDetails?.product_id) },
    { method: 'GET' },
    { skipCall: !productVariantDetails }
  )

  const form = useForm<ProductVariantFormInputs>({
    resolver: zodResolver(editVariantSchema),
    defaultValues: {
      name: '',
      extra_base_price: '',
      extra_selling_price: '',
      discount: [],
    },
  })

  const groupById = (array: any[], key: string) => {
    const result = new Map()

    array.forEach((item) => {
      if (result.has(item[key])) {
        const prev = result.get(item[key])
        result.set(item[key], [...prev, item])
      } else {
        result.set(item[key], [item])
      }
    })

    return result
  }

  console.log(form.watch())

  const fetchFromInputs = () => {
    if (productVariantDetails) {
      const fieldsToUpdate = ['name', 'extra_base_price', 'extra_selling_price']

      fieldsToUpdate.forEach((field) => {
        form.setValue(
          field as keyof ProductVariantFormInputs,
          // @ts-ignore
          String(productVariantDetails[field])
        )
      })
      if (!!productVariantDetails?.discount?.length) {
        form.setValue(
          'discount',
          productVariantDetails?.discount.map((each) => ({
            id: each.id,
            is_stacked: each.is_stacked,
            name: each.name,
            description: each.description || '',
            type: each.type,
            payment_type: each.payment_type,
            amount: String(each.amount),
            quantity: String(each.quantity),
            start_date: each.start_date,
            end_date: each.end_date,
          }))
        )
      }

      if (!!productVariantDetails?.complimentary?.length) {
        form.setValue(
          'complimentary',
          productVariantDetails?.complimentary.map((each) => {
            const grouped = groupById(each.items, 'complimentary_id')
            const keys = Array.from(grouped.keys())

            return {
              rule_id: each.rule_id,
              quantity: String(each.quantity),
              payment_type: each.payment_type,
              name: each.name,
              description: each.description || '',
              start_date: each.start_date,
              end_date: each.end_date,
              is_stacked: each.is_stacked,
              items: keys.map((k) => ({
                product_id: String(k),
                variants: (
                  Array.from(grouped.get(k)) as ComplimentaryItemProps[]
                ).map((each) => ({
                  id: each.id || null,
                  complimentary_variant_id: String(
                    each.complimentary_variant_id
                  ),
                  amount: String(each.amount),
                })),
              })),
            }
          })
        )
      }
    }
  }

  const handleComplimentaryItems = (cmpItem: EditComplimentaryItemData[]) => {
    const items: EditComplimentaryItemRequest[] = []

    cmpItem.forEach((item) => {
      item.variants.forEach((variant) => {
        const amount = Number(variant.amount.replaceAll(',', ''))

        if (amount > 0) {
          const row = {
            id: variant.id,
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
    const { message } = response
    toast.success(message)
    push('/dashboard/products')
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: ProductVariantFormInputs) => {
    setIsLoading(true)

    try {
      const req: EditVariantRequest = {
        ...data,
        id: Number(id),
        product_id: Number(productVariantDetails?.product_id),
        extra_base_price: Number(data.extra_base_price.replaceAll(',', '')),
        extra_selling_price: Number(
          data.extra_selling_price.replaceAll(',', '')
        ),
        discount:
          data.discount?.map((each) => ({
            ...each,
            quantity: Number(each.quantity.replaceAll(',', '')),
            amount: Number(each.amount.replaceAll(',', '')),
            start_date: each.start_date,
            end_date: each.end_date || null,
          })) || [],
        complimentary:
          data.complimentary?.map((each) => ({
            rule_id: each.rule_id,
            quantity: Number(each.quantity.replaceAll(',', '')),
            payment_type: each.payment_type,
            name: each.name,
            description: each.description,
            start_date: each.start_date,
            end_date: each.end_date || null,
            is_stacked: each.is_stacked,
            items: handleComplimentaryItems(each.items),
          })) || [],
      }

      const apiRes = await callAPI<EditVariantRequest, CommonApiResponse>(
        ProductAPI.POST_PRODUCT_VARIANT,
        req,
        { method: 'PUT' }
      )

      const { status, data: editVariantData } = apiRes

      if (apiStatusChecker(status) && editVariantData) {
        handleSuccess(editVariantData)
      } else {
        handleFailure(editVariantData)
      }
    } catch {
      handleFailure()
      throw 'Failed to update product variant'
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFromInputs()
  }, [productVariantDetails])

  return {
    form,
    productVariantDetails,
    isVariantValidating,
    productDetails,
    isDetailsLoading,
    isLoading,
    onSubmit,
  }
}

export default useEditVariant
