import React from 'react'
import { formattedDate } from '@/lib/utils'
import { useDiscountStore } from '@/store/discount'

const Logs = () => {
  const {
    discount: { discountDetails },
  } = useDiscountStore()

  return (
    <>
      <div className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-[0.75rem] text-muted-foreground">
            Created
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-[0.85rem]">
              {formattedDate(discountDetails?.created_at, true)}
            </span>
            <span className="text-[0.85rem]">
              by <b>{discountDetails?.created_by_name}</b>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-[0.75rem] text-muted-foreground">
            Last Updated
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-[0.85rem]">
              {formattedDate(discountDetails?.updated_at, true)}
            </span>
            <span className="text-[0.85rem]">
              by <b>{discountDetails?.updated_by_name}</b>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Logs
