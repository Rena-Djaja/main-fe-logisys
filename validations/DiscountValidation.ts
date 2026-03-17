import { z } from 'zod'

export const itemVariantValidationSchema = z.object({
  id: z.number(),
  name: z.string(),
  discount_type: z.enum(['percentage', 'price'], 'Select the discount type'),
  payment_type: z.enum(
    ['all_payments', 'cash', 'credit'],
    'Select the payment type'
  ),
  discount_amount: z.string().optional(),
  is_active: z.boolean(),
})

export const discountValidationSchema = z.object({
  name: z.string().min(1, "Please insert the discount's name"),
  description: z.string().min(1, 'Please insert the discount percentage'),
  start_date: z.string().min(1, 'Please insert the discount start date'),
  end_date: z.string().optional(),
  valid_thru_days: z.string().optional(),
  is_combinable: z.boolean(),
  products: z
    .array(
      z.object({
        id: z.number(),
        supplier_id: z.number(),
        supplier_name: z.string(),
        name: z.string(),
        sku: z.string(),
        variants: z.array(
          itemVariantValidationSchema.superRefine((data, ctx) => {
            if (
              data.is_active &&
              (Number.isNaN(data.discount_amount?.replaceAll(',', '')) ||
                !Number(data.discount_amount?.replaceAll(',', '')))
            ) {
              ctx.addIssue({
                code: 'too_small',
                origin: 'string',
                minimum: 1,
                message: 'Insert discount amount',
                path: ['discount_amount'],
              })
            }

            if (
              data.discount_type === 'percentage' &&
              Number(data.discount_amount?.replaceAll(',', '')) >= 100
            ) {
              ctx.addIssue({
                code: 'custom',
                message: 'Should be less than 100',
                path: ['discount_amount'],
              })
            }
          })
        ),
      })
    )
    .min(1, 'Please select at least one product'),
})
