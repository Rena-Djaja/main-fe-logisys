import { CommonApiResponse } from '@/type/Common'
import { loginValidationSchema } from '@/validations/LoginValidation'
import { z } from 'zod'

export type PostLoginRequest = z.infer<typeof loginValidationSchema>

export interface PostLoginResponse extends CommonApiResponse {
  data: {
    access_token: string
  }
}

export interface PostAuthInfoResponse extends CommonApiResponse {
  data: AuthContextProps
}

export interface AuthContextProps {
  id: number
  name: string
  email: string
  roleID: number
  createdAt: string
  updatedAt: string
}
