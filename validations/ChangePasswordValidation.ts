import { z } from 'zod'

export const changePasswordValidationSchema = z
  .object({
    current_password: z.string().min(1, 'Mohon masukkan kata sandi saat ini'),
    new_password: z.string().min(1, 'Mohon masukkan kata sandi baru'),
    confirm_password: z
      .string()
      .min(1, 'Mohon masukkan konfirmasi kata sandi baru'),
  })
  .superRefine((data, ctx) => {
    if (data.new_password && data.new_password.length < 8) {
      ctx.addIssue({
        code: 'too_small',
        origin: 'string',
        minimum: 8,
        message: 'Kata sandi harus mempunyai minimal 8 karakter',
        path: ['new_password'],
      })
    }

    if (data.new_password && data.confirm_password) {
      if (data.new_password !== data.confirm_password) {
        ctx.addIssue({
          code: 'custom',
          origin: 'string',
          message: 'Kata sandi baru & konfirmasi harus sama',
          path: [`confirm_password`],
        })
      }
    }

    if (data.current_password && data.new_password) {
      if (data.current_password === data.new_password) {
        ctx.addIssue({
          code: 'custom',
          origin: 'string',
          message:
            'Kata sandi baru tidak boleh sama dengan kata sandi saat ini',
          path: [`new_password`],
        })
      }
    }
  })
