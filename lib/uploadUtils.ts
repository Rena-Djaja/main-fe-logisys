import { ValidateFileProps } from '@/type/UploadInputs'
import byteSize from 'byte-size'

export const MimeType = {
  JPG: 'image/jpeg',
  PDF: 'application/pdf',
  PNG: 'image/png',
  XLS: 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export const getAcceptedType = (argType: string) => {
  const type = argType.toLowerCase()
  if (['jpeg', 'jpg'].includes(type)) {
    return MimeType.JPG
  } else if ('png' === type) {
    return MimeType.PNG
  } else if ('pdf' === type) {
    return MimeType.PDF
  } else if ('xls' === type) {
    return MimeType.XLS
  } else if ('xlsx' === type) {
    return MimeType.XLSX
  }
  return type.toLowerCase()
}

export function validateFile(option: ValidateFileProps) {
  const {
    allowedSize,
    allowedTypes,
    fileNameMaxLength = 50,
    fileObject,
  } = option

  const { name, type, size } = fileObject
  const allowedType = allowedTypes.some((allowedType) => {
    return type
      .toLowerCase()
      .includes(getAcceptedType(allowedType).toLowerCase())
  })

  const splitFile = name.split('.')
  const stringType = splitFile[splitFile.length - 1]
  const stringFileName = splitFile
    .slice(0, splitFile.length - 1)
    .join('.')
    .substring(0, fileNameMaxLength - (stringType.length + 1))

  return {
    fileValid: size < allowedSize && allowedType,
    fileType: stringType,
    fileName: [stringFileName, stringType].join('.'),
  }
}

const customUnits = {
  simple: [
    { from: 0, to: 1e3, unit: 'B' },
    { from: 1e3, to: 1e6, unit: 'KB' },
    { from: 1e6, to: 1e9, unit: 'MB' },
    { from: 1e9, to: 1e12, unit: 'GB' },
  ],
}

export const fileSizeHandler = (size: number) => {
  const { value, unit } = byteSize(size, { customUnits, units: 'simple' })

  return `${value} ${unit}`
}

export const getPreviewImage = (type: string, blob: string) => {
  switch (type) {
    case MimeType.JPG:
    case MimeType.PNG:
      return blob

    case MimeType.PDF:
      return '/common/pdf-icon.png'

    case MimeType.XLS:
    case MimeType.XLSX:
      return '/common/xls-icon.png'
  }
}
