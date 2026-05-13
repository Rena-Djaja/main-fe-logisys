'use client'

import React, { FC } from 'react'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { Plus, Trash } from 'lucide-react'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import { FormStepProps } from '@/type/Product'
import useComplimentaryItemGroup from '@/components/ProductsPage/Form/Steps/Complimentary/ComplimentaryItemGroup/useComplimentaryItemGroup'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import VariantItems from '@/components/ProductsPage/Form/Steps/Complimentary/ComplimentaryItemGroup/VariantItems/VariantItems'

interface ComplimentaryItemGroupProps extends FormStepProps {
  complimentaryIdx: number
}

const ComplimentaryItemGroup: FC<ComplimentaryItemGroupProps> = (props) => {
  const { fields, complimentaryList, isValidating, handleAddRow, remove } =
    useComplimentaryItemGroup(props)
  const { form, complimentaryIdx } = props

  return (
    <div className="lg:col-span-2 flex flex-col gap-8">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-[1.25rem]">Items</span>
          {form.formState.errors?.complimentary?.[complimentaryIdx]?.items && (
            <span className="text-destructive text-[0.85rem]">
              {
                form.formState.errors?.complimentary?.[complimentaryIdx]?.items
                  ?.message
              }
            </span>
          )}
        </div>
        <div>
          <CustomButton
            label={'Add Item'}
            icon={Plus}
            variant={ButtonVariant.OUTLINE}
            onClick={handleAddRow}
            type={ButtonType.BUTTON}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-20">
        {!fields.length
          ? null
          : fields.map((field, idx) => {
              return (
                <div key={field.id} className="w-full flex flex-col gap-4">
                  <div className="w-full flex gap-x-6 gap-y-10">
                    <div className="w-full">
                      <CustomSelect
                        name={`complimentary.${complimentaryIdx}.items.${idx}.product_id`}
                        control={form.control}
                        label={'Complimentary'}
                        placeholder={'Select complimentary'}
                        isLoading={isValidating}
                        options={complimentaryList?.data?.map((each) => ({
                          label: each.name,
                          value: each.id,
                        }))}
                      />
                    </div>
                    <div className="relative w-6">
                      <button
                        className="absolute top-[1.8rem] px-1 bg-background cursor-pointer"
                        type={ButtonType.BUTTON}
                        onClick={() => remove(idx)}
                      >
                        <Trash className="size-4.5 text-destructive" />
                      </button>
                    </div>
                  </div>
                  <div className="pl-4 pr-12">
                    <VariantItems
                      complimentaryIdx={complimentaryIdx}
                      itemIdx={idx}
                      productId={
                        form.watch(
                          `complimentary.${complimentaryIdx}.items.${idx}.product_id`
                        ) as string
                      }
                      form={form}
                    />
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default ComplimentaryItemGroup
