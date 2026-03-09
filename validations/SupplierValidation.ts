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
}).superRefine((data, ctx) => {
  if(data.phone_number) {
    if(data.phone_number.length > 0 && data.phone_number.length < 11) {
      ctx.addIssue({
        code: 'too_small',
        origin: 'string',
        minimum: 11,
        message: 'Phone number must be at least 11 digits',
        path: ['phone_number'],
      })
    }
    if(!(/^(62)(8|2)[1-9][0-9]{6,9}$/.test(data.phone_number))) {
      ctx.addIssue({
        code: 'custom',
        origin: 'string',
        message: "Phone number should contain only numeric value and started with '62'",
        path: ['phone_number']
      })
    }
  }
})
