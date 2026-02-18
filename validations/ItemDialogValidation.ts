import { z } from 'zod'

export const itemDialogValidationSchema = z
  .object({
    product_id: z.string().min(1, 'Please select a product'),
    variant_id: z.string().min(1, 'Please select a variant'),
    quantity: z.string().min(1, 'Please select product quantity'),
  })
  .superRefine((data, ctx) => {
    if (Number(data.quantity.replaceAll(',', '')) <= 0) {
      ctx.addIssue({
        code: 'too_small',
        origin: 'string',
        minimum: 1,
        message: 'Quantity must be greater than 0',
        path: [`quantity`],
      })
    }
  })
