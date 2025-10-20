import { z } from 'zod'

export const locationFormValidationSchema = z.object({
  name: z
    .string('Please insert location name')
    .min(1, 'Please insert location name'),
})
