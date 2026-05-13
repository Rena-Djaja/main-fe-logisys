'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

const useSavedLocationForm = () => {
  const form = useForm()
  const [isLoading] = useState({
    form: false,
    submit: false,
  })

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  return {
    form,
    isLoading,
    onSubmit,
  }
}

export default useSavedLocationForm
