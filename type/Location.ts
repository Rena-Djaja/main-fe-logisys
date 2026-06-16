import {
  CommonApiResponse,
  CommonFilterRequest,
  PaginationResponse,
} from '@/type/Common'
import { z } from 'zod'
import { locationFormValidationSchema } from '@/validations/LocationValidation'

export interface LocationProps {
  id: string
  name: string
  latitude: number
  longitude: number
  level: string
  parent_id: null
  geom: string
}

export interface LocationListProps {
  locations: LocationProps[]
  pagination: PaginationResponse
}

export interface LocationListResponse extends CommonApiResponse {
  data: LocationListProps
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

export interface LocationFilterRequest extends CommonFilterRequest {
  level: LocationLevelType
  parent_id?: string
}

export enum LocationLevelType {
  PROVINCE = 'province',
  REGENCY = 'regency',
  DISTRICT = 'district',
  VILLAGE = 'village',
}

export interface DisVilListRequest {
  regency_id: string
}

export interface DistrictProps {
  id: string
  name: string
  latitude: number
  longitude: number
  level: string
  villages: VillageProps[]
}

interface VillageProps {
  id: string
  name: string
  latitude: number
  longitude: number
}

export interface DisVilListResponse extends CommonApiResponse {
  data: DistrictProps[]
}

export interface GetLocationByLatLngRequest {
  lat: number
  long: number
}

export interface GetLocationByLatLngResponse extends CommonApiResponse {
  data: LocationByLatLngRowProps
}

export interface LocationByLatLngRowProps {
  village_id: string
  village_name: string
  district_id: string
  district_name: string
  regency_id: string
  regency_name: string
  province_id: string
  province_name: string
  distance_meters: number
}
