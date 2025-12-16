import React from 'react'
import { CommonServerFormProps } from '@/type/Common'
import EditVariantForm from '@/components/ProductsPage/EditForm/Variant/EditVariantForm'

const Form = async ({ params }: CommonServerFormProps) => {
  const { slug } = await params
  return <EditVariantForm id={slug} />
}

export default Form
