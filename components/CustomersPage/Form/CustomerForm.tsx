'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import FileInput from '@/components/shared/FileInput/FileInput'
import { FileTypes } from '@/type/UploadInputs'

const CustomerForm = () => {
  const { control } = useForm()

  return (
    <div>
      <FileInput
        control={control}
        name={'file-input'}
        handleChange={(file) => console.log(file)}
        allowedTypes={[FileTypes.PNG, FileTypes.JPEG, FileTypes.JPG]}
        files={[]}
      />
    </div>
  )
}

export default CustomerForm
