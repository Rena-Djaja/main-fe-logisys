import { LOCATION_TYPES } from '@/constant/Location'

export const handleFetchLocationType = (location: string): string => {
  const selectedType = LOCATION_TYPES.find((each) => each.value === location)

  return selectedType?.label || '-'
}
