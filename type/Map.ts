import { CommonApiResponse } from '@/type/Common'

export interface LocationSuggestion {
  mapbox_id: string
  name: string
  full_address: string
}

export interface LocationFeature {
  properties: {
    name: string
    mapbox_id: string
    full_address: string
    feature_type: string
    coordinates: {
      longitude: number
      latitude: number
    }
  }
}

export interface SearchLocationRequest {
  q: string
}

export interface SearchLocationResponse extends CommonApiResponse {
  data: LocationSuggestion[]
}

export interface StyleOption {
  id: string
  label: string
  icon: React.ReactNode
}
