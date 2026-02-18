import React from 'react'
import InOutDetails from '@/components/InOutPage/Details/InOutDetails'

interface DetailsProps {
  params: Promise<{ slug: string }>
}

const Details = async ({ params }: DetailsProps) => {
  const { slug } = await params

  return <InOutDetails id={slug} />
}

export default Details
