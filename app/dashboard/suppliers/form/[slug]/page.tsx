import React from 'react'
import SupplierForm from '@/components/SuppliersPage/Form/SupplierForm'
import { CommonServerFormProps } from '@/type/Common'

const Form = async ({ params }: CommonServerFormProps) => {
  const { slug } = await params
  return <SupplierForm id={slug} />
}

export default Form
