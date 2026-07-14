import React from 'react'
import { CommonServerFormProps } from '@/type/Common'
import SupplierFormWrapper from '@/components/SuppliersPage/Form/SupplierFormWrapper'

const Form = async ({ params }: CommonServerFormProps) => {
  const { slug } = await params
  return <SupplierFormWrapper id={slug} />
}

export default Form
