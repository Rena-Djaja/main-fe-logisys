import {
  Control,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from 'react-hook-form'

export enum FileTypes {
  JPEG = 'jpeg',
  JPG = 'jpg',
  PNG = 'png',
  PDF = 'pdf',
  XLS = 'xls',
  XLSX = 'xlsx',
}

export interface ValidateFileProps {
  allowedSize: number
  allowedTypes: string[]
  fileNameMaxLength?: number
  fileObject: File
}

export interface FileInputWrapperProps {
  allowedSize?: number
  allowedTypes: FileTypes[]
  children: any
  handleUploadChange: (file: File) => void
  multipleFile?: boolean
}

export interface FileProps {
  file: File
  blob: string
}

export interface FileInputProps {
  control: any
  name: string
  handleChange: (file: FileProps[]) => void
  isMulti?: boolean
  allowedTypes: FileTypes[]
  allowedSize?: number
  files: FileProps[] | []
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  helperText?: string
  defaultValues?: string[]
}
