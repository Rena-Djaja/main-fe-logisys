import { z } from 'zod'
import { savedLocationSchema } from '@/validations/SavedLocationValidation'
import { CommonApiResponse, PaginationResponse } from '@/type/Common'
import { UserProps } from '@/type/User'

export type SavedLocationFormInputs = z.infer<typeof savedLocationSchema>

export interface SavedLocationRequest {
  name: string
  address: string
  address_type: string
  latitude: number
  longitude: number
  village_id: string
}

export interface SavedLocationListResponse {
  locations: SavedLocationProps[]
  pagination: PaginationResponse
}

export interface SavedLocationProps {
  id: string
  name: string
  address: string
  address_type: string
  province_id: string
  province_name: string
  regency_id: string
  regency_name: string
  district_id: string
  district_name: string
  village_id: string
  village_name: string
  latitude: number
  longitude: number
  created_at: string
  updated_at: string
}

export interface SavedLocationDetailsRequest {
  location_id: string
}

export interface SavedLocationDetailsResponse extends CommonApiResponse {
  data: SavedLocationProps
}
