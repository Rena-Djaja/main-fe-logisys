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

export const editDiscountSchema = z.object({
  discount: z
    .array(
      z.object({
        id: z.number().nullable(),
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

export const complimentarySchema = z.object({
  complimentary: z
    .array(
      z.object({
        quantity: z.string().min(1, 'Please insert product quantity'),
        payment_type: z.string().min(1, 'Please insert payment type'),
        name: z.string().min(1, 'Please insert promo name'),
        description: z.string().nullable(),
        start_date: z.string().min(1, "Please insert discount's start date"),
        end_date: z.string().nullable(),
        is_stacked: z.boolean(),
        items: z
          .array(
            z.object({
              product_id: z
                .string()
                .min(1, 'Please choose the complimentary product'),
              variants: z
                .array(
                  z.object({
                    complimentary_variant_id: z
                      .string()
                      .min(1, 'Please select the complimentary variant'),
                    amount: z
                      .string()
                      .min(1, 'Please insert the complimentary amount'),
                  })
                )
                .min(1, 'Please choose at least complimentary variant'),
            })
          )
          .min(1, 'Please insert at least 1 complimentary item'),
      })
    )
    .optional(),
})

export const editComplimentarySchema = z.object({
  complimentary: z
    .array(
      z.object({
        rule_id: z.number().nullable(),
        quantity: z.string().min(1, 'Please insert product quantity'),
        payment_type: z.string().min(1, 'Please insert payment type'),
        name: z.string().min(1, 'Please insert promo name'),
        description: z.string().nullable(),
        start_date: z.string().min(1, "Please insert discount's start date"),
        end_date: z.string().nullable(),
        is_stacked: z.boolean(),
        items: z
          .array(
            z.object({
              product_id: z
                .string()
                .min(1, 'Please choose the complimentary product'),
              variants: z
                .array(
                  z.object({
                    id: z.number().nullable(),
                    complimentary_variant_id: z
                      .string()
                      .min(1, 'Please select the complimentary variant'),
                    amount: z
                      .string()
                      .min(1, 'Please insert the complimentary amount'),
                  })
                )
                .min(1, 'Please choose at least complimentary variant'),
            })
          )
          .min(1, 'Please insert at least 1 complimentary item'),
      })
    )
    .optional(),
})

export const variantSchema = z.object({
  variants: z.array(
    z
      .object({
        name: z.string().min(1, 'Please insert variant name'),
        extra_base_price: z
          .string()
          .min(1, 'Please insert variant extra base price'),
        extra_selling_price: z
          .string()
          .min(1, 'Please insert variant extra selling price'),
        custom_discount: z.boolean(),
        custom_complimentary: z.boolean(),
      })
      .merge(discountSchema)
      .merge(complimentarySchema)
  ),
})

export const editVariantSchema = z
  .object({
    name: z.string().min(1, 'Please insert variant name'),
    extra_base_price: z
      .string()
      .min(1, 'Please insert variant extra base price'),
    extra_selling_price: z
      .string()
      .min(1, 'Please insert variant extra selling price'),
  })
  .merge(editDiscountSchema)
  .merge(editComplimentarySchema)

export const productSchemaKeys = [
  Object.keys(productDetailsSchema.shape),
  Object.keys(discountSchema.shape),
  Object.keys(complimentarySchema.shape),
  Object.keys(variantSchema.shape),
]

export const productFormValidationSchema = productDetailsSchema
  .merge(discountSchema)
  .merge(complimentarySchema)
  .merge(variantSchema)
