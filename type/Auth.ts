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
  name: string
}

export interface AuthContextProps {
  authInfo: AuthInfoProps
  permissions: PermissionItemProps[]
}

export enum PermissionTypes {
  PUBLIC = 'public',
  READ_USER = 'read_user',
  WRITE_USER = 'write_user',
  READ_ROLE = 'read_role',
  WRITE_ROLE = 'write_role',
  READ_SUPPLIER = 'read_supplier',
  WRITE_SUPPLIER = 'write_supplier',
  READ_LOCATION = 'read_location',
  WRITE_LOCATION = 'write_location',
  READ_PRODUCT = 'read_product',
  WRITE_PRODUCT = 'write_product',
  READ_INVENTORY = 'read_inventory',
  WRITE_INVENTORY = 'write_inventory',
  READ_MOVEMENT = 'read_movement',
  WRITE_MOVEMENT = 'write_movement',
  READ_DISCOUNT = 'read_discount',
  WRITE_DISCOUNT = 'write_discount',
}

export type ChangePasswordFormInputs = z.infer<
  typeof changePasswordValidationSchema
>

export interface ChangePasswordRequest {
  current_password: string
  new_password: string
}
