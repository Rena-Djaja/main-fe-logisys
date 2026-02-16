'use client'

import React, { FC, JSXElementConstructor, ReactElement } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { DocumentProps } from '@react-pdf/renderer'

interface PDFPreviewProps {
  children:
    | ReactElement<DocumentProps, string | JSXElementConstructor<any>>
    | undefined
}

const PDFPreview: FC<PDFPreviewProps> = (props) => {
  const { children } = props

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>{children}</PDFViewer>
  )
}

export default PDFPreview
