import React from 'react'
import { CommonServerFormProps } from '@/type/Common'
import SavedLocationWrapper from '@/components/SavedLocationPage/Form/SavedLocationWrapper'

const Page = async ({ params }: CommonServerFormProps) => {
  const { slug } = await params
  return <SavedLocationWrapper id={slug} />
}

export default Page
