import React from 'react'
import TruckDetailsPage from '@/components/InventoryPage/Tabs/Trucks/Details/TruckDetailsPage'

interface FormProps {
  params: Promise<{ slug: string }>
}

const Details = async ({ params }: FormProps) => {
  const { slug } = await params

  return <TruckDetailsPage id={slug} />
}

export default Details
