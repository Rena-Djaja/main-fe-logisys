'use client'

import React, { FC } from 'react'
import { handleTransactionStatus } from '@/lib/statuses'
import { LogProps } from '@/type/Logs'
import { formattedDate } from '@/lib/utils'

interface TimelineProps {
  logs?: LogProps[]
  isLoading?: boolean
}

const Timeline: FC<TimelineProps> = ({ logs }) => {
  // TODO: add loading skeleton while log is loading

  return (
    <div className="w-full flex flex-col gap-6">
      {logs?.map((log, idx) => (
        <div key={idx} className="flex gap-5 justify-start">
          <div className="w-fit flex flex-col items-center gap-4">
            <div className="size-3 shrink-0 rounded-full bg-foreground outline outline-offset-3" />
            {idx !== logs.length - 1 && (
              <div className="h-full min-h-24 w-[0.085rem] bg-foreground rounded-full" />
            )}
          </div>
          <div className="flex flex-col gap-3 -mt-1">
            <span className="font-semibold text-[0.75rem] text-foreground/90">
              {formattedDate(log.log_date)}
            </span>
            <div className="flex flex-col gap-1 ml-3">
              <div>{handleTransactionStatus(log.status)}</div>
              <span className="font-medium text-[0.75rem] text-muted-foreground ml-2">
                Notes: {log.notes}
              </span>
              <span className="font-semibold text-[0.75rem] text-foreground/90 ml-2">
                By: {log.user_name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Timeline
