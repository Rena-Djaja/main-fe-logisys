'use client'

import React, { FC } from 'react'
import { ItemVariantProps } from '@/type/Discounts'
import useItemVariant from '@/components/DiscountsPage/Form/ItemVariant/useItemVariant'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { FileSliders, PlusCircle, Trash2 } from 'lucide-react'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import CustomNumberFormatInput from '@/components/shared/FormInputs/CustomNumberFormatInput'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from '@/components/shared/ui/empty'

const ItemVariant: FC<ItemVariantProps> = (props) => {
  const { fields, handleAddRow, handleRemoveRow } = useItemVariant(props)
  const { paymentType, productIdx, variantIdx, form } = props
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex justify-between items-center">
        <span className="uppercase font-bold text-[0.85rem] text-muted-foreground">
          {paymentType} schemas
        </span>
        <CustomButton
          label={'Add New'}
          icon={PlusCircle}
          variant={ButtonVariant.GHOST}
          type={ButtonType.BUTTON}
          onClick={handleAddRow}
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        {!fields.length ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="default">
                <FileSliders className="text-muted-foreground" />
              </EmptyMedia>
              <EmptyDescription>No schemas configured.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          fields.map((field, idx) => (
            <div
              key={field.id}
              className="w-full flex flex-col gap-6 bg-secondary/70 px-4 pt-6 pb-4 rounded-md "
            >
              <div className="w-full flex items-start gap-4">
                <div>
                  <CustomNumberFormatInput
                    name={`products.${productIdx}.variants.${variantIdx}.${paymentType}.${idx}.min_quantity`}
                    control={form.control}
                    label={'Min Qty'}
                    placeholder={'Min quantity'}
                  />
                </div>
                <div>
                  <CustomNumberFormatInput
                    name={`products.${productIdx}.variants.${variantIdx}.${paymentType}.${idx}.max_quantity`}
                    control={form.control}
                    label={'Max Qty'}
                    placeholder={'Max quantity'}
                  />
                </div>
                <div>
                  <CustomNumberFormatInput
                    name={`products.${productIdx}.variants.${variantIdx}.${paymentType}.${idx}.discount_amount`}
                    control={form.control}
                    label={'Amount'}
                    placeholder={'Amount'}
                  />
                </div>
              </div>
              <button
                type={ButtonType.BUTTON}
                className="w-full flex justify-end"
                onClick={() => handleRemoveRow(idx)}
              >
                <Trash2 className="size-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ItemVariant
