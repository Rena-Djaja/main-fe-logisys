'use client'

import React, { FC } from 'react'
import MapProvider from '@/components/shared/MapProvider/MapProvider'
import SupplierForm from '@/components/SuppliersPage/Form/SupplierForm'
import { CommonFormProps } from '@/type/Common'

const SupplierFormWrapper: FC<CommonFormProps> = ({ id }) => {
  return (
    <MapProvider>
      <SupplierForm id={id} />
    </MapProvider>
  )
}

export default SupplierFormWrapper
