import { assignLocationValidationSchema } from '@/validations/UserValidation'
import { z } from 'zod'
import { DataType } from '@/components/shared/Hooks/CommonApi/useCommonApi'

export interface AssignAreaFormProps {
  userID: string
  isOpen: boolean
  handleClose: () => void
  mutateList: () => void
}

export type AssignLocationFormInputs = z.infer<
  typeof assignLocationValidationSchema
>

export interface AssignLocationProps {
  village_id: string
  salesman_id: string
}

export interface AssignLocationRequest {
  locations: AssignLocationProps[]
}

export interface SalesAreaFilterRequest {
  search?: string
  salesman_id?: string
  district_id?: string
}

export interface SalesAreaListProps {
  areas: AreaProps[]
  total_data: number
}

export interface AreaProps {
  district_id: string
  district_name: string
  latitude: number
  longitude: number
  salesmen: {
    salesman_id: string
    salesman_name: string
  }[]
  villages: {
    id: string
    village_id: string
    village_name: string
    latitude: number
    longitude: number
    created_at: string
    updated_at: string
  }[]
}

export interface AssignedAreaListProps {
  activeTab: ListTabStyle
  assignedAreas?: DataType<SalesAreaListProps>
  isLoading: boolean
  handleFormState: () => void
  handleDelete: (districtId: string) => void
}

export enum ListTabStyle {
  LIST = 'list',
  MAP = 'map',
}
