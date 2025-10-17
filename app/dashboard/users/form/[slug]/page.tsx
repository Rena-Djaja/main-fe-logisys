import React from 'react'
import UserForm from '@/components/UsersPage/Form/UserForm'

interface FormProps {
  params: Promise<{ slug: string }>
}

const Form = async ({ params }: FormProps) => {
  const { slug } = await params
  return <UserForm id={slug} />
}

export default Form
