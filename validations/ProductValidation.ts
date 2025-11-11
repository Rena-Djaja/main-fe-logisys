import { z } from 'zod'

export const productDetailsSchema = z.object({
  product_name: z.string().min(1, 'Please insert product name'),
  sku: z.string().min(1, 'Please insert product short name'),
  supplier_id: z.string().min(1, 'Please choose the supplier'),
  category: z.string().min(1, 'Please choose the category'),
  unit: z.string().min(1, "Please insert product's unit"),
  base_price: z.string().min(1, "Please insert product's base_price"),
  selling_price: z.string().min(1, "Please insert product's selling price"),
})

export const discountSchema = z.object({
  discounts: z
    .array(
      z.object({
        is_stacked: z.boolean(),
        name: z.string().min(1, 'Please insert discount name'),
        description: z.string().nullable(),
        type: z.string().min(1, 'Please insert discount type'),
        quantity: z.string().min(1, 'Please insert minimum product quantity'),
        amount: z.string().min(1, 'Please insert discount amount'),
        payment_type: z.string().min(1, 'Please insert payment type'),
        start_date: z.string().min(1, "Please insert discount's start date"),
        end_date: z.string().nullable(),
      })
    )
    .optional(),
})

export const productSchemaKeys = [
  Object.keys(productDetailsSchema.shape),
  Object.keys(discountSchema.shape),
]

export const productFormValidationSchema =
  productDetailsSchema.merge(discountSchema)
