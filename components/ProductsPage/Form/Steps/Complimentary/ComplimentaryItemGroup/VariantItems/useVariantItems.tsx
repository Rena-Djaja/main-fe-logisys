'use client'

import { useEffect, useState } from 'react'
import {
  FormStepProps,
  ProductVariantProps,
  ProductVariantsRequest,
  ProductVariantsResponse,
} from '@/type/Product'
import { callAPI } from '@/lib/fetchers'
import { ProductAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import { useFieldArray } from 'react-hook-form'

interface VariantItemProps extends FormStepProps {
  complimentaryIdx: number
  itemIdx: number
  productId: string
}

const useVariantItems = ({
  form,
  complimentaryIdx,
  itemIdx,
  productId,
}: VariantItemProps) => {
  const { fields, append } = useFieldArray({
    name: `complimentary.${complimentaryIdx}.items.${itemIdx}.variants`,
  })

  const [variants, setVariants] = useState<ProductVariantProps[] | undefined>()

  const handleSuccess = (response: ProductVariantsResponse) => {
    const { data } = response

    setVariants(data)
    data.map((each) => {
      append({
        complimentary_variant_id: String(each.id),
        amount: '',
      })
    })
  }

  const handleFailure = (response?: ProductVariantsResponse) => {
    console.log(response)
  }

  const fetchVariants = async () => {
    // setIsLoading((prev) => ({ ...prev, variants: true }))

    try {
      form.setValue(
        `complimentary.${complimentaryIdx}.items.${itemIdx}.variants`,
        []
      )

      if (productId) {
        const apiRes = await callAPI<
          ProductVariantsRequest,
          ProductVariantsResponse
        >(
          ProductAPI.GET_PRODUCT_VARIANTS,
          { product_id: Number(productId) },
          { method: 'GET' }
        )

        const { data: productVariantsData, status } = apiRes

        if (apiStatusChecker(status) && productVariantsData) {
          handleSuccess(productVariantsData)
        } else {
          handleFailure(productVariantsData)
        }
      }
    } catch {
      handleFailure()
      throw 'Failed to fetch details'
    }
    // finally {
    //   // setTimeout(
    //   //   () => setIsLoading((prev) => ({ ...prev, variants: false })),
    //   //   500
    //   // )
    // }
  }

  useEffect(() => {
    fetchVariants()
  }, [productId])

  return {
    fields,
    variants,
  }
}

export default useVariantItems
