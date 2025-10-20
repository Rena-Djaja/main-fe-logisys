import { PaginationResponse } from '@/type/Common'
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

export type LocationFormInputs = z.infer<typeof locationFormValidationSchema>
