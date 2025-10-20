import React from 'react'
import SupplierForm from '@/components/SuppliersPage/Form/SupplierForm'

interface FormProps {
  params: Promise<{ slug: string }>
}

const Form = async ({ params }: FormProps) => {
  const { slug } = await params
  return <SupplierForm id={slug} />
}

export default Form
