import {
  CommonApiResponse,
  CommonFilterRequest,
  PaginationResponse,
} from '@/type/Common'
import { z } from 'zod'
import {
  assignLocationValidationSchema,
  userFormValidationSchema,
} from '@/validations/UserValidation'

export interface UserProps {
  id: number
  name: string
  email: string
  role_id: number
  role_name: string
  created_at: string
  updated_at: string
  deleted_at: string
  is_deleted: boolean
}

export interface UserListResponse {
  users: UserProps[]
  pagination: PaginationResponse
}

export interface UserDetailsRequest {
  id: string
}

export interface UserDetailsResponse extends CommonApiResponse {
  data: UserProps
}

export type UserFormInputs = z.infer<typeof userFormValidationSchema>

export interface EmployeeDataRequest {
  title: string
  salary: number
  allowance: number
  premium: number
  daily_allowance: number
  meal_allowance: number
  overtime_pay: number
  joined_date: string
}

export interface PostUserRequest {
  id?: string
  name: string
  email: string
  role_id: number
  // employee_data: EmployeeDataRequest | null
}

export interface DeleteUserRequest {
  id: number
}

export interface AssignedAreaListRequest {
  sales_id: string
}

export interface AssignAreaFormProps {
  userID: string
  isOpen: boolean
  handleClose: () => void
  mutate: () => void
}

export type AssignLocationFormInputs = z.infer<
  typeof assignLocationValidationSchema
>

export interface AssignLocationRequest {
  sales_id: number
  locations: { location_id: number }[]
}

export interface UserListRequest extends CommonFilterRequest {
  is_active?: boolean
  role_id?: number
}

export interface AssignedLocationListRequest extends CommonFilterRequest {
  sales_id: number
}

export interface AssignedLocationProps {
  id: number
  sales_id: number
  sales_name: string
  location_id: number
  location_name: string
}

export interface AssignedLocationListResponse {
  data: AssignedLocationProps[]
  pagination: PaginationResponse
}

export interface DeleteAssignedLocationRequest {
  id: number
  sales_id: number
}
