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
  data: AuthInfoProps
}

export interface GetPermissionListResponse extends CommonApiResponse {
  data: PermissionItemProps[]
}

export interface AuthInfoProps {
  id: number
  name: string
  email: string
  roleID: number
  createdAt: string
  updatedAt: string
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
  READ_INVENTORY = 3,
}
