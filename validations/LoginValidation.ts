import { z } from 'zod'

export const loginValidationSchema = z.object({
  email: z.email('Please insert a valid email address'),
  password: z
    .string('Please insert your password')
    .min(1, 'Please insert your password'),
})
