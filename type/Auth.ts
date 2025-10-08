import { CommonApiResponse } from '@/type/Common'
import { loginValidationSchema } from '@/validations/LoginValidation'
import { z } from 'zod'

export type PostLoginRequest = z.infer<typeof loginValidationSchema>

export interface PostLoginResponse extends CommonApiResponse {
  data: {
    access_token: string
  }
}
