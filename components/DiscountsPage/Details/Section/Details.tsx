import React from 'react'
import StatusBadge from '@/components/shared/StatusBadge/StatusBadge'
import { formattedDate } from '@/lib/utils'
import { useDiscountStore } from '@/store/discount'

const Details = () => {
  const {
    discount: { discountDetails },
  } = useDiscountStore()

  return (
    <>
      <div className="w-full flex flex-col gap-1">
        <span className="font-semibold text-[1.5rem]">
          {discountDetails?.name}
        </span>
        <StatusBadge isActive={!!discountDetails?.is_active} />
      </div>
      <div className="w-full p-4 border rounded-md grid lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2 w-full flex flex-col gap-0.5">
          <span className="font-semibold text-[0.825rem]">Description</span>
          <span className="text-[0.875rem]">
            {discountDetails?.description}
          </span>
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <span className="font-semibold text-[0.825rem]">Start Date</span>
          <span className="text-[0.875rem]">
            {formattedDate(discountDetails?.start_date)}
          </span>
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <span className="font-semibold text-[0.825rem]">End Date</span>
          <span className="text-[0.875rem]">
            {formattedDate(discountDetails?.end_date)}
          </span>
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <span className="font-semibold text-[0.825rem]">Valid Thru</span>
          <span className="text-[0.875rem]">
            {discountDetails?.valid_thru_days} days
          </span>
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <span className="font-semibold text-[0.825rem]">Combinable Disc</span>
          <span className="text-[0.875rem]">
            {discountDetails?.is_combinable ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </>
  )
}

export default Details
