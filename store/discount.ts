import { DiscountRuleProps, MappedDiscountItems } from '@/type/Discounts'
import { create } from 'zustand/react'

type Discount = {
  isLoading: boolean
  discountDetails: DiscountRuleProps | undefined
  discountItems: MappedDiscountItems[]
}

type DiscountState = {
  discount: Discount
  setDiscountDetails: (value: DiscountRuleProps) => void
  setDiscountItems: (value: MappedDiscountItems[]) => void
  setLoading: (value: boolean) => void
}

const discountDefaultState = {
  isLoading: false,
  discountDetails: undefined,
  discountItems: [],
}

export const useDiscountStore = create<DiscountState>((set) => ({
  discount: discountDefaultState,
  setDiscountDetails: (value) =>
    set((state) => ({
      discount: { ...state.discount, discountDetails: value },
    })),
  setDiscountItems: (value) =>
    set((state) => ({
      discount: { ...state.discount, discountItems: value },
    })),
  setLoading: (value) =>
    set((state) => ({ discount: { ...state.discount, isLoading: value } })),
}))
