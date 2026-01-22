import React from 'react'
import WarehouseDetailsPage from '@/components/InventoryPage/Tabs/Warehouse/Details/WarehouseDetailsPage'

interface FormProps {
  params: Promise<{ slug: string }>
}

const Details = async ({ params }: FormProps) => {
  const { slug } = await params

  return <WarehouseDetailsPage id={slug} />
}

export default Details
