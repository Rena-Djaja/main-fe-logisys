'use client'

import React from 'react'
import { Spinner } from '@/components/shared/ui/spinner'

const CommonPageLoading = () => {
  return (
    <div className="w-full flex justify-center items-center py-[20rem]">
      <Spinner className="size-14" />
    </div>
  )
}

export default CommonPageLoading
