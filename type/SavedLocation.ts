import { z } from 'zod'
import { savedLocationSchema } from '@/validations/SavedLocationValidation'

export type SavedLocationFormInputs = z.infer<typeof savedLocationSchema>

export interface SavedLocationRequest {
  name: string
  address: string
  address_type: string
  latitude: number
  longitude: number
  village_id: string
}
