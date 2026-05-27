'use client'

import { useEffect, useState } from 'react'
import { AssignedAreaListProps } from '@/type/SalesArea'
import { useMapContext } from '@/components/shared/context/MapContext'
import { LocationFeature } from '@/type/Map'

const useAssignedAreaList = (props: AssignedAreaListProps) => {
  const { assignedAreas, activeTab } = props
  const { map, locationList, setLocationList } = useMapContext()

  const [openedDistrict, setOpenedDistrict] = useState<string>()

  const handleOpenDistrict = (districtId: string) => {
    if (openedDistrict === districtId) {
      setOpenedDistrict(undefined)
    } else {
      setOpenedDistrict(districtId)
    }
  }

  const handleFetchLocations = () => {
    if (activeTab === 'map' && assignedAreas?.areas?.length) {
      const locations: LocationFeature[] = assignedAreas?.areas.map((each) => ({
        properties: {
          mapbox_id: each.district_id,
          name: each.district_name,
          full_address: '',
          feature_type: '',
          coordinates: {
            latitude: each.latitude,
            longitude: each.longitude,
          },
        },
      }))
      setLocationList(locations)
    }
  }

  const handleGoToLocations = () => {
    map?.flyTo({
      center: [
        locationList[0].properties.coordinates.longitude,
        locationList[0].properties.coordinates.latitude,
      ],
      zoom: 9,
      speed: 4,
      duration: 1000,
      essential: false,
    })
  }

  useEffect(() => {
    handleFetchLocations()
  }, [activeTab, assignedAreas])

  return {
    activeTab,
    openedDistrict,
    handleOpenDistrict,
    handleGoToLocations,
  }
}

export default useAssignedAreaList
