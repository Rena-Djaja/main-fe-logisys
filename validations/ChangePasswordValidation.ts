import { z } from 'zod'

export const changePasswordValidationSchema = z
  .object({
    current_password: z.string().min(1, 'Please insert your current password'),
    new_password: z.string().min(1, 'Please insert your new password'),
    confirm_password: z.string().min(1, 'Please confirm your new password'),
  })
  .superRefine((data, ctx) => {
    if (data.new_password && data.confirm_password) {
      if (data.new_password !== data.confirm_password) {
        ctx.addIssue({
          code: 'custom',
          origin: 'string',
          message: 'New password & confirmation must be the same',
          path: [`confirm_password`],
        })
      }
    }
  })
