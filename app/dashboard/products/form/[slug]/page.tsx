import React from 'react'
import { CommonServerFormProps } from '@/type/Common'
import EditProductForm from '@/components/ProductsPage/EditForm/EditProductForm'

const Form = async ({ params }: CommonServerFormProps) => {
  const { slug } = await params
  return <EditProductForm id={slug} />
}

export default Form
