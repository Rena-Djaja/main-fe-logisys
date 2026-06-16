'use client'

import React from 'react'
import MapProvider from '@/components/shared/MapProvider/MapProvider'
import SavedLocationForm from '@/components/SavedLocationPage/Form/SavedLocationForm'

const SavedLocationWrapper = () => {
  return (
    <MapProvider>
      <SavedLocationForm />
    </MapProvider>
  )
}

export default SavedLocationWrapper
