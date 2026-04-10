import React, { useState } from 'react'
import { useDiscountStore } from '@/store/discount'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/shared/ui/collapsible'
import { Package, PackageOpen, Play } from 'lucide-react'
import StatusBadge from '@/components/shared/StatusBadge/StatusBadge'
import { thousandFormat } from '@/lib/utils'

const Items = () => {
  const {
    discount: { discountItems },
  } = useDiscountStore()

  const [selectedItem, setSelectedItem] = useState<number>()

  return (
    <>
      {discountItems?.length > 0 &&
        discountItems.map((each, idx) => (
          <Collapsible
            key={idx}
            open={selectedItem === idx}
            onOpenChange={() =>
              setSelectedItem(selectedItem === idx ? undefined : idx)
            }
            className="w-full flex flex-col gap-4 bg-popover p-2.5 rounded-md"
          >
            <CollapsibleTrigger>
              <div className="w-full flex items-center gap-4">
                <div className="w-fit flex items-center bg-muted p-3 rounded-md">
                  {selectedItem === idx ? (
                    <PackageOpen className="size-7" />
                  ) : (
                    <Package className="size-7" />
                  )}
                </div>
                <div className="w-full flex flex-col items-start">
                  <span className="font-semibold text-[0.775rem] text-muted-foreground">
                    Product & Variant
                  </span>
                  <span className="font-bold text-[0.875rem]">{each.name}</span>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="w-full flex flex-col gap-6">
              {each.variants.map((variant, variantIdx) => (
                <div key={variantIdx} className="w-full flex flex-col gap-4">
                  <div className="w-full flex items-center justify-between">
                    <div className="w-fit flex items-center gap-2">
                      <Play className="size-2.5 fill-foreground" />
                      <span className="font-semibold text-[0.9rem]">
                        {variant.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-medium text-[0.8rem] text-muted-foreground">
                      <span>
                        {thousandFormat(Number(variant.used_count))} /{' '}
                        {variant?.limit
                          ? thousandFormat(Number(variant.limit ?? 0))
                          : '-'}
                        &nbsp;{variant.unit}
                      </span>
                      <StatusBadge isActive={!!variant?.is_active} />
                    </div>
                  </div>
                  <div className="w-full grid md:grid-cols-2 gap-4 md:gap-2">
                    {(['cash', 'credit'] as const).map((type, typeIdx) => (
                      <div
                        key={typeIdx}
                        className="w-full flex flex-col gap-1 pt-2.5 pb-4 px-2.5 bg-muted rounded-md"
                      >
                        <span className="font-semibold text-[0.7rem] text-muted-foreground uppercase">
                          {type}
                        </span>
                        <div className="w-full flex flex-col divide-y">
                          {!!variant[type]?.length &&
                            variant[type].map((discRow, discRowIdx) => (
                              <div
                                key={discRowIdx}
                                className="w-full grid grid-cols-2 gap-2 py-1.5"
                              >
                                <span className="font-medium text-[0.8rem]">
                                  {thousandFormat(Number(discRow.min_quantity))}{' '}
                                  {!!discRow.max_quantity && ' - '}
                                  {!!discRow.max_quantity &&
                                    thousandFormat(
                                      Number(discRow.max_quantity)
                                    )}
                                </span>
                                <span className="w-full flex justify-end font-medium text-[0.8rem]">
                                  {thousandFormat(
                                    Number(discRow.discount_amount)
                                  )}
                                  /{variant.unit}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
    </>
  )
}

export default Items
