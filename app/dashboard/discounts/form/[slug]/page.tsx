import React from 'react'
import { CommonServerFormProps } from '@/type/Common'
import DiscountsForm from '@/components/DiscountsPage/Form/DiscountsForm'

const Form = async ({ params }: CommonServerFormProps) => {
  const { slug } = await params
  return <DiscountsForm id={slug} />
}

export default Form
