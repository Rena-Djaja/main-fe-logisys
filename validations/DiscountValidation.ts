import { z } from 'zod'

export const discountValidationSchema = z.object({
  name: z.string().min(1, "Please insert the discount's name"),
  description: z.string().min(1, 'Please insert the discount percentage'),
  discount_type: z.enum(
    ['percentage', 'price'],
    'Please select the discount type'
  ),
  payment_type: z.enum(
    ['all_payments', 'cash', 'credit'],
    'Please select the payment type'
  ),
  products: z.array(z.object({})).min(1, 'Please select at least one product'),
})
