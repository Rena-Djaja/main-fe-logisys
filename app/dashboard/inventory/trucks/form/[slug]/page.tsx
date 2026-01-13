import React from 'react'
import TruckForm from '@/components/InventoryPage/Tabs/Trucks/Form/TruckForm'

interface FormProps {
  params: Promise<{ slug: string }>
}

const Form = async ({ params }: FormProps) => {
  const { slug } = await params

  return <TruckForm id={slug} />
}

export default Form
