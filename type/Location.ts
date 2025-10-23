import { CommonApiResponse, PaginationResponse } from '@/type/Common'
import { z } from 'zod'
import { locationFormValidationSchema } from '@/validations/LocationValidation'

export interface LocationProps {
  id: number
  name: string
}

export interface LocationListResponse {
  data: LocationProps[]
  pagination: PaginationResponse
}

export interface LocationDetailsRequest {
  id: number
}

export interface LocationDetailsResponse extends CommonApiResponse {
  data: LocationProps
}

export type LocationFormInputs = z.infer<typeof locationFormValidationSchema>

export interface DeleteLocationRequest {
  id: number
}

export interface ValidateLocationRequest {
  location_id: string
}

export interface ValidateLocationResponse extends CommonApiResponse {
  data: {
    is_available: boolean
  }
}
