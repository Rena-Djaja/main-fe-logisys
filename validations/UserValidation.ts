import { z } from 'zod'

export const userFormValidationSchema = z.object({
  name: z
    .string("Please insert a user's name")
    .min(1, "Please insert a user's name"),
  email: z.email('Please insert a valid email address'),
  role_id: z
    .number('Please select a role of this user')
    .min(1, 'Please select a role of this user'),
})
