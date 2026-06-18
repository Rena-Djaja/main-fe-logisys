'use client'

import React, { FC } from 'react'
import MapProvider from '@/components/shared/MapProvider/MapProvider'
import SavedLocationForm from '@/components/SavedLocationPage/Form/SavedLocationForm'
import { CommonFormProps } from '@/type/Common'

const SavedLocationWrapper: FC<CommonFormProps> = ({ id }) => {
  return (
    <MapProvider>
      <SavedLocationForm id={id} />
    </MapProvider>
  )
}

export default SavedLocationWrapper
