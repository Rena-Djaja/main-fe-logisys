import { CommonApiResponse } from '@/type/Common'
import { loginValidationSchema } from '@/validations/LoginValidation'
import { z } from 'zod'
import { changePasswordValidationSchema } from '@/validations/ChangePasswordValidation'

export type PostLoginRequest = z.infer<typeof loginValidationSchema>

export interface PostLoginResponse extends CommonApiResponse {
  data: {
    access_token: string
  }
}

export interface PostAuthInfoResponse extends CommonApiResponse {
  data: AuthInfoProps
}

export interface GetPermissionListResponse extends CommonApiResponse {
  data: PermissionItemProps[]
}

export interface AuthInfoProps {
  id: number
  name: string
  email: string
  role_id: number
  role_name: string
  reset_password: boolean
  created_at: string
  updated_at: string
}

export interface PermissionItemProps {
  id: number
  name: string
}

export interface AuthContextProps {
  authInfo: AuthInfoProps
  permissions: PermissionItemProps[]
}

export enum PermissionTypes {
  PUBLIC = 0,
  READ_USER = 1,
  WRITE_USER = 2,
  READ_ROLE = 3,
  WRITE_ROLE = 4,
  READ_SUPPLIER = 5,
  WRITE_SUPPLIER = 6,
  READ_LOCATION = 7,
  WRITE_LOCATION = 8,
  READ_PRODUCT = 9,
  WRITE_PRODUCT = 10,
}

export type ChangePasswordFormInputs = z.infer<
  typeof changePasswordValidationSchema
>

export interface ChangePasswordRequest {
  old_password: string
  new_password: string
}
