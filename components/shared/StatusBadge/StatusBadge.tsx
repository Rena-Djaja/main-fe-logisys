'use client'

import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/shared/ui/badge'

interface StatusBadgeProps {
  isActive: boolean
}

const StatusBadge: FC<StatusBadgeProps> = ({ isActive }) => {
  return (
    <Badge
      className={cn(
        'flex gap-2 items-center',
        isActive
          ? 'bg-chart-2/20 text-chart-2'
          : 'bg-destructive/20 text-destructive'
      )}
    >
      <div
        className={cn(
          'size-2 rounded-full',
          isActive ? 'bg-chart-2' : 'bg-destructive'
        )}
      />
      {isActive ? 'Aktif' : 'Tidak Aktif'}
    </Badge>
  )
}

export default StatusBadge
