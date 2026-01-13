import React from 'react'
import InventoryPage from '@/components/InventoryPage/InventoryPage'

interface FormProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Inventory = async ({ searchParams }: FormProps) => {
  const param = await searchParams

  return <InventoryPage tab={param.tab as string} />
}

export default Inventory
