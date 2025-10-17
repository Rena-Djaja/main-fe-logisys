'use client'

import React, { FC, useRef } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/shared/ui/input'

interface SearchInputProps {
  onChange: (value: string) => void
}

const SearchInput: FC<SearchInputProps> = (props) => {
  const { onChange } = props
  const debounce = useRef(0)

  const handleChange = (val: string) => {
    if (debounce.current) {
      clearTimeout(debounce.current)
    }
    debounce.current = window.setTimeout(() => {
      onChange(val)
    }, 500)
  }

  return (
    <div className="w-full relative">
      <div className="absolute left-3 top-2.5">
        <Search className="size-4 text-muted-foreground" />
      </div>
      <Input
        placeholder={'Search...'}
        className="pl-10"
        onChange={(e) => handleChange(e?.target?.value)}
      />
    </div>
  )
}

export default SearchInput
