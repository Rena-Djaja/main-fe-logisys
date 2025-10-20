import React from 'react'
import LocationForm from '@/components/LocationsPage/Form/LocationForm'

interface FormProps {
  params: Promise<{ slug: string }>
}

const Form = async ({ params }: FormProps) => {
  const { slug } = await params
  return <LocationForm id={slug} />
}

export default Form
