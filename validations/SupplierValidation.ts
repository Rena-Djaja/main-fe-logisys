import { z } from 'zod'

export const supplierFormValidationSchema = z.object({
  name: z
    .string('Please insert company name')
    .min(1, 'Please insert company name'),
  location: z
    .string('Please insert company address')
    .min(1, 'Please insert company address'),
  phone_number: z
    .string()
    .nullable()
    .refine(
      (val) => {
        if (!val) return true

        return /^(62)(8|2)[1-9][0-9]{6,9}$/.test(val)
      },
      { message: 'Invalid phone number format' }
    ),
})
