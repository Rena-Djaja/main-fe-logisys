import React from 'react'
import WarehouseForm from '@/components/InventoryPage/Tabs/Warehouse/Form/WarehouseForm'

interface FormProps {
  params: Promise<{ slug: string }>
}

const Form = async ({ params }: FormProps) => {
  const { slug } = await params

  return <WarehouseForm id={slug} />
}

export default Form
