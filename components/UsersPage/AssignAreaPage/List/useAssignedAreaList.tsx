'use client'

import React, { useEffect, useState } from 'react'
import { List, MapIcon } from 'lucide-react'
import { AssignedAreaListProps } from '@/type/SalesArea'
import { useMapContext } from '@/components/shared/context/MapContext'
import { LocationFeature } from '@/type/Map'

const useAssignedAreaList = (props: AssignedAreaListProps) => {
  const { assignedAreas } = props
  const { map, locationList, setLocationList } = useMapContext()

  const tabStyles = [
    {
      id: 'list',
      label: 'List',
      icon: <List className="size-5" />,
    },
    {
      id: 'map',
      label: 'Peta',
      icon: <MapIcon className="size-5" />,
    },
  ]

  const [activeTab, setActiveTab] = useState(tabStyles[0].id)

  const handleTabChange = (id: string) => {
    setActiveTab(id)
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
    tabStyles,
    activeTab,
    handleTabChange,
    handleGoToLocations,
  }
}

export default useAssignedAreaList
