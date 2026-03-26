import { z } from 'zod'

export const variantItemValidationSchema = z.object({
  min_quantity: z.string().optional(),
  max_quantity: z.string().optional(),
  discount_amount: z.string().optional(),
})

export const variantsParentValidationSchema = z
  .object({
    product_variant_id: z.number(),
    name: z.string(),
    discount_type: z.string().optional(),
    limit: z.string().optional(),
    is_active: z.boolean(),
    cash: z.array(variantItemValidationSchema).optional(),
    credit: z.array(variantItemValidationSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.is_active && !data.discount_type) {
      ctx.addIssue({
        code: 'custom',
        message: 'Select the discount type',
        path: ['discount_type'],
      })
    }

    ;['cash', 'credit'].forEach((paymentType) => {
      // @ts-ignore
      if (data[paymentType]?.length && data.is_active) {
        // TODO: optional variant fields if is active is false

        // @ts-ignore
        data[paymentType].forEach((each, idx) => {
          if (!each.min_quantity) {
            ctx.addIssue({
              code: 'too_small',
              origin: 'string',
              minimum: 1,
              message: 'Insert min quantity',
              path: [paymentType, idx, 'min_quantity'],
            })
          }

          if (!each.discount_amount) {
            ctx.addIssue({
              code: 'too_small',
              origin: 'string',
              minimum: 1,
              message: 'Insert amount',
              path: [paymentType, idx, 'discount_amount'],
            })
          }
        })
      }
    })
  })

export const productValidationSchema = z
  .object({
    id: z.number(),
    supplier_id: z.number(),
    supplier_name: z.string(),
    name: z.string(),
    sku: z.string(),
    variants: z.array(variantsParentValidationSchema),
  })
  .superRefine((data, ctx) => {
    data.variants.forEach((variant, variantIdx) => {
      if (
        !variant.cash?.length &&
        !variant.credit?.length &&
        variant.is_active
      ) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please at least add one discount schema',
          path: ['variants', variantIdx],
        })
      }
    })
  })

export const discountValidationSchema = z.object({
  name: z.string().min(1, "Please insert the discount's name"),
  description: z.string().min(1, 'Please insert the discount percentage'),
  start_date: z.string().min(1, 'Please insert the discount start date'),
  end_date: z.string().optional(),
  valid_thru_days: z.string().optional(),
  is_combinable: z.boolean(),
  products: z
    .array(productValidationSchema)
    .min(1, 'Please select at least one product'),
})
