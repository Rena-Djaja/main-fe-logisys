import { z } from 'zod'

export const loginValidationSchema = z.object({
  email: z.email('Email tidak valid'),
  password: z
    .string('Mohon masukkan email Anda')
    .min(1, 'Mohon masukkan kata sandi Anda'),
})
