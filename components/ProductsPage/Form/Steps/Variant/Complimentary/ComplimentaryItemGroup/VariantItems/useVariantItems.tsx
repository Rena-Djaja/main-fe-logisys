'use client'

import { useEffect, useRef, useState } from 'react'
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

const variantsCache = new Map<string, ProductVariantProps[]>()

interface VariantItemProps extends FormStepProps {
  complimentaryIdx: number
  itemIdx: number
  productId: string
  variantIdx: number
}

const useVariantItems = ({
  complimentaryIdx,
  itemIdx,
  productId,
  variantIdx,
}: VariantItemProps) => {
  const { fields, append, remove } = useFieldArray({
    name: `variants.${variantIdx}.complimentary.${complimentaryIdx}.items.${itemIdx}.variants`,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [variants, setVariants] = useState<ProductVariantProps[] | undefined>(
    () => (productId ? variantsCache.get(productId) : undefined)
  )
  const prevProductIdRef = useRef(productId)

  const syncFormFields = (newVariants: ProductVariantProps[]) => {
    remove()
    newVariants.forEach((variant) => {
      append({
        complimentary_variant_id: String(variant.id),
        amount: '',
      })
    })
  }

  const fetchVariants = async () => {
    setIsLoading(true)
    try {
      const isProductChanged = prevProductIdRef.current !== productId

      if (!productId) {
        setVariants(undefined)
        remove()
        prevProductIdRef.current = productId
        return
      }

      const cachedVariants = variantsCache.get(productId)

      if (cachedVariants) {
        setVariants(cachedVariants)
        if (isProductChanged) {
          syncFormFields(cachedVariants)
        }
      } else {
        const apiRes = await callAPI<
          ProductVariantsRequest,
          ProductVariantsResponse
        >(
          ProductAPI.GET_PRODUCT_VARIANTS,
          { product_id: Number(productId) },
          { method: 'GET' }
        )

        const { status, data: productVariantsData } = apiRes

        if (apiStatusChecker(status) && productVariantsData?.data) {
          const newVariants = productVariantsData.data
          variantsCache.set(productId, newVariants)
          setVariants(newVariants)
          syncFormFields(newVariants)
        } else {
          console.log('error')
        }
      }

      prevProductIdRef.current = productId
    } catch {
      throw 'Failed to fetch product variants'
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVariants()
  }, [productId, remove, append])

  return {
    fields,
    variants,
    isLoading,
  }
}

export default useVariantItems
