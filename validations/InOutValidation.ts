import { z } from 'zod'

export const inOutValidationSchema = z.object({
  transaction_date: z.string().min(1, 'Please insert the transaction date'),
  location_id: z.string().min(1, 'Please insert the location'),
  movement_type: z.string().min(1, 'Please insert the movement type'),
  description: z.string().min(1, 'Please insert the description'),
  items: z
    .array(
      z.object({
        product_id: z.string().min(1, 'Please select a product'),
        variant_id: z.string().min(1, 'Please select a variant'),
        quantity: z.string().min(1, 'Please select product quantity'),
        unit: z.string(),
      })
    )
    .min(1, 'Pleas insert at least one item'),
})
