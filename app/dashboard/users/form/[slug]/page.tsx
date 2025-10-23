import React from 'react'
import UserForm from '@/components/UsersPage/Form/UserForm'
import { CommonServerFormProps } from '@/type/Common'

const Form = async ({ params }: CommonServerFormProps) => {
  const { slug } = await params
  return <UserForm id={slug} />
}

export default Form
