'use client'

import React, { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <NextThemesProvider
      {...props}
      scriptProps={
        typeof window !== 'undefined' ? { type: 'application/json' } : undefined
      }
    >
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider
