import React from 'react'
import { CommonServerFormProps } from '@/type/Common'
import AssignAreaPage from '@/components/UsersPage/AssignAreaPage/AssignAreaPage'

const AssignArea = async ({ params }: CommonServerFormProps) => {
  const { slug } = await params
  return <AssignAreaPage id={slug} />
}

export default AssignArea
