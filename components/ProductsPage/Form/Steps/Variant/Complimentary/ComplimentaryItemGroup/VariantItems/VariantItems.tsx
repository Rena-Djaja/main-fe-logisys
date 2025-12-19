'use client'

import React, { FC } from 'react'
import { FormStepProps } from '@/type/Product'
import CustomNumberFormatInput from '@/components/shared/FormInputs/CustomNumberFormatInput'
import useVariantItems from '@/components/ProductsPage/Form/Steps/Variant/Complimentary/ComplimentaryItemGroup/VariantItems/useVariantItems'
import { Skeleton } from '@/components/shared/ui/skeleton'

interface VariantItemProps extends FormStepProps {
  complimentaryIdx: number
  itemIdx: number
  productId: string
  variantIdx: number
}

const VariantItems: FC<VariantItemProps> = (props) => {
  const { fields, variants, isLoading } = useVariantItems(props)
  const { form, complimentaryIdx, itemIdx, variantIdx } = props
  const isDisabled = !form.watch(`variants.${variantIdx}.custom_complimentary`)

  return (
    <div className="w-full flex flex-col gap-6">
      {isLoading
        ? [...Array(2)].map((_, idx) => (
            <div key={idx} className="grid lg:grid-cols-2 gap-6">
              <Skeleton className="h-4 w-[15rem]" />
              <Skeleton className="h-4 w-[15rem]" />
            </div>
          ))
        : !!fields.length &&
          fields.map((field, idx) => (
            <div key={field.id} className="grid lg:grid-cols-2 gap-6">
              <span>
                {
                  variants?.find(
                    (each) =>
                      each.id ===
                      Number(
                        form.getValues(
                          `variants.${variantIdx}.complimentary.${complimentaryIdx}.items.${itemIdx}.variants.${idx}.complimentary_variant_id`
                        )
                      )
                  )?.name
                }
              </span>
              <div>
                <CustomNumberFormatInput
                  name={`variants.${variantIdx}.complimentary.${complimentaryIdx}.items.${itemIdx}.variants.${idx}.amount`}
                  control={form.control}
                  disabled={isDisabled}
                />
              </div>
            </div>
          ))}
    </div>
  )
}

export default VariantItems
