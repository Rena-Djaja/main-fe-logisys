'use client'

import React, { DragEvent, FC, useRef, useState } from 'react'
import { FileInputWrapperProps } from '@/type/UploadInputs'
import { fileSizeHandler, getAcceptedType } from '@/lib/uploadUtils'
import { toast } from 'sonner'
import { InputType } from '@/type/FormInputs'

const DEFAULT_MAX_FILE_SIZE = 10000000 // 10 MB

const FileInputWrapper: FC<FileInputWrapperProps> = (props) => {
  const {
    allowedTypes,
    allowedSize = DEFAULT_MAX_FILE_SIZE,
    children,
    handleUploadChange,
  } = props
  const [isDragged, setIsDragged] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      if (!isDragged) {
        setIsDragged(true)
      }
    } else if (e.type === 'dragleave') {
      setIsDragged(false)
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragged(false)
    if (e?.dataTransfer.files && e.dataTransfer.files[0]) {
      handleChange(e)
    }
  }

  const handleClick = () => {
    inputRef?.current?.click()
  }

  const handleChange = (e: any) => {
    const { type } = e
    e.preventDefault()
    let file

    if (type === 'change') {
      file = e.target.files[0]
    } else {
      file = e.dataTransfer.files[0]
    }

    validateFile(file)
  }

  const validateFile = (file: File) => {
    const allowedMimes = allowedTypes.map((each) => getAcceptedType(each))

    if (allowedMimes.includes(file.type) && allowedSize >= file.size) {
      return handleUploadChange(file)
    } else if (allowedSize < file.size) {
      return toast.error(
        `Ukuran file harus kurang dari ${fileSizeHandler(allowedSize)}`
      )
    }

    toast.error('Ekstensi file tidak valid.')
  }

  return (
    <div
      onDrop={handleDrop}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onClick={handleClick}
      className="relative cursor-pointer"
    >
      <input
        accept={allowedTypes.map((type) => getAcceptedType(type)).join(',')}
        type={InputType.FILE}
        onChange={handleChange}
        ref={inputRef}
        className="absolute hidden"
      />
      <div className="relative">{children({ isDragged })}</div>
    </div>
  )
}

export default FileInputWrapper
