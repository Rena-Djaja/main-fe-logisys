'use client'

import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { apiStatusChecker, cn } from '@/lib/utils'
import { ButtonType } from '@/type/FormInputs'
import {
  CircleCheck,
  CirclePlus,
  CloudUpload,
  FolderOpen,
  Trash2,
  XCircle,
} from 'lucide-react'
import FileInputWrapper from '@/components/shared/FileInput/FileInputWrapper'
import { FileInputProps, FileProps, UploadStatus } from '@/type/UploadInputs'
import { fileSizeHandler, getPreviewImage, MimeType } from '@/lib/uploadUtils'
import { Progress } from '@/components/shared/ui/progress'
import { callAPI } from '@/lib/fetchers'
import { FileAPI } from '@/constant/APIUrls'

const FileInput = (props: FileInputProps) => {
  const {
    control,
    name,
    handleChange,
    isMulti = false,
    allowedTypes,
    allowedSize,
    error,
    helperText,
    defaultValues = [],
  } = props

  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadStatus, setuploadStatus] = useState<UploadStatus>(
    UploadStatus.UPLOADING
  )
  const [selectedFiles, setSelectedFiles] = useState<FileProps[] | []>([])

  const handleFileChange = async (file: File) => {
    setIsLoading(true)
    setLoadingProgress(0)
    setuploadStatus(UploadStatus.UPLOADING)

    const loadInterval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 95) {
          return prevProgress
        }

        const increment = Math.floor(Math.random() * 15) + 5
        return Math.min(prevProgress + increment, 95)
      })
    }, 420)

    try {
      const formData = new FormData()
      if (file) {
        formData.append('file', file)
      }

      const newState = [
        ...(isMulti ? [...selectedFiles] : []),
        {
          file: file,
          blob: URL.createObjectURL(file),
        },
      ]

      setSelectedFiles(newState)
      if (handleChange) {
        handleChange(newState)
      }

      const apiRes = await callAPI(FileAPI.POST_UPLOAD_FILE, formData, {
        method: 'POST',
        isMultipart: true,
      })
      const { data: uploadFileRes, status } = apiRes

      if (apiStatusChecker(status) && uploadFileRes) {
        setuploadStatus(UploadStatus.SUCCESS)
      } else {
        setuploadStatus(UploadStatus.FAILED)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      setuploadStatus(UploadStatus.FAILED)
    } finally {
      setLoadingProgress(100)
      clearInterval(loadInterval)
      await new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
        setIsLoading(false)
      })
    }
  }

  const handleDeleteFile = (
    idx: number,
    onChange: (...event: any[]) => void
  ) => {
    const newState = [...selectedFiles]

    newState.splice(idx, 1)

    onChange('')
    setSelectedFiles(newState)
    if (handleChange) {
      handleChange(newState)
    }
  }

  const fetchDefaultImages = async () => {
    if (defaultValues.length > 0) {
      for (const value of defaultValues) {
        const blob = await fetch(value, {
          headers: new Headers({ 'Access-Control-Allow-Origin': '*' }),
        })
          .then((r) => console.log(r))
          .catch((e) => console.error(e))
        console.log(blob)
      }
    }
  }

  useEffect(() => {
    fetchDefaultImages()
  }, [defaultValues])

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col w-full">
            <FileInputWrapper
              allowedTypes={allowedTypes}
              allowedSize={allowedSize}
              handleUploadChange={(file: File) => {
                onChange(file.name)
                handleFileChange(file)
              }}
            >
              {({ isDragged }: { isDragged: boolean }) => (
                <div
                  className={cn(
                    'w-full p-6 flex flex-col items-center justify-center gap-4 border border-dashed rounded-xl' +
                      ' min-h-[14rem]',
                    error ? 'border-destructive' : 'border-primary-blue'
                  )}
                >
                  {isDragged ? (
                    <FileInput.DragActive />
                  ) : (
                    <FileInput.Placeholder />
                  )}
                  <span className="text-[0.785rem] text-primary-grey/80 -mt-2">
                    {`Format: ${allowedTypes.map((each) => `.${each}`).join(', ')}`}
                  </span>
                </div>
              )}
            </FileInputWrapper>
            <span
              className={cn(
                'mt-[0.4rem]',
                error
                  ? 'text-[0.875rem] text-destructive'
                  : 'text-[0.7rem] text-primary-grey/80'
              )}
            >
              {error ? String(error) : helperText}
            </span>
          </div>
          {selectedFiles.length > 0 && (
            <div className="flex flex-col gap-3">
              {selectedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="w-full flex flex-col md:flex-row justify-between items-center p-4  bg-primary-grey/15 dark:bg-secondary-dark rounded-lg"
                >
                  <a className="w-full" href={file.blob} target={'_blank'}>
                    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-4">
                      <img
                        alt={`preview-image-${idx}`}
                        src={getPreviewImage(file.file.type, file.blob)}
                        className={cn(
                          'rounded-md self-center',
                          [MimeType.PNG, MimeType.JPG].includes(file.file.type)
                            ? 'w-full md:w-[6rem] h-[8rem] md:h-[4rem] object-cover object-top'
                            : 'w-[2.8rem] h-auto'
                        )}
                      />
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-[0.9rem]">
                          {file.file.name}
                        </span>
                        <span className="font-light text-[0.7rem] text-primary-grey/70">
                          {fileSizeHandler(Number(file.file.size))}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          {isLoading ? (
                            <>
                              <Progress
                                value={loadingProgress}
                                className="w-full h-1.5"
                              />
                              <span className="transition-all duration-150 text-[0.825rem]">
                                {loadingProgress}%
                              </span>
                            </>
                          ) : !isLoading && uploadStatus === 'success' ? (
                            <div className="flex items-center gap-0.5">
                              <CircleCheck className="size-4.5 fill-chart-2 stroke-primary-foreground" />
                              <span className="font-semibold text-[0.75rem] text-chart-2">
                                Terunggah
                              </span>
                            </div>
                          ) : !isLoading && uploadStatus === 'failed' ? (
                            <div className="flex items-center gap-1">
                              <XCircle className="size-4 fill-destructive stroke-primary-foreground" />
                              <span className="font-semibold text-[0.75rem] text-destructive">
                                Gagal Diunggah
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="mr-4 mt-4 md:mt-0">
                    <button
                      type={ButtonType.BUTTON}
                      onClick={() => handleDeleteFile(idx, onChange)}
                    >
                      <Trash2 className="h-5 w-auto text-primary-red" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    />
  )
}

export default FileInput

// eslint-disable-next-line react/display-name
FileInput.DragActive = () => {
  return (
    <>
      <div className="relative">
        <CloudUpload className="h-14 w-14 text-primary-blue" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 ">
        <span className="font-medium text-[0.85rem]">
          Letakkan file Anda disini
        </span>
      </div>
    </>
  )
}

// eslint-disable-next-line react/display-name
FileInput.Placeholder = () => {
  return (
    <>
      <div className="relative">
        <FolderOpen className="size-14 stroke-[1.8] text-primary-blue" />
        <div className="absolute -right-1 -bottom-1">
          <CirclePlus className="size-6 text-primary-blue fill-white stroke-black" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 ">
        <span className="font-medium text-[1rem]">Unggah file Anda</span>
        <span className="font-light text-[0.825rem] text-center">
          Seret dan letakkan file Anda di sini
          <br />
          atau klik untuk memilih file
        </span>
      </div>
    </>
  )
}
