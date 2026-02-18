'use client'

import React, { FC } from 'react'
import { CommonDetailsPageProps } from '@/type/Common'
import useInOutDetails from '@/components/InOutPage/Details/useInOutDetails'
import { formattedDate, handleLocationLink } from '@/lib/utils'
import Link from 'next/link'
import {
  handleMovementTransactionType,
  handleTransactionStatus,
} from '@/lib/statuses'
import CustomTable from '@/components/shared/CustomTable/CustomTable'
import { inOutDetailsHeaders } from '@/components/InOutPage/Resource'
import { TransactionItemProps } from '@/type/Transaction'
import { Badge } from '@/components/shared/ui/badge'
import CommonPageLoading from '@/components/shared/Loading/CommonPageLoading'
import Timeline from '@/components/shared/Timeline/Timeline'
import { LogProps } from '@/type/Logs'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { FileDown } from 'lucide-react'

const InOutDetails: FC<CommonDetailsPageProps> = (props) => {
  const {
    transactionDetails,
    isDetailsValidating,
    transactionItems,
    isItemsValidating,
    transactionLogs,
    isLogsValidating,
  } = useInOutDetails(props)

  const { id } = props

  if (isDetailsValidating) {
    return <CommonPageLoading />
  }

  return (
    <div className="mt-8 w-full flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="font-semibold text-[2rem]">Order Details</h1>
        <span className="font-medium text-[0.95rem]">
          This is details of your transaction
        </span>
      </div>
      <div className="w-full flex flex-col gap-16">
        <div className="w-full flex flex-col gap-5 border rounded-xl px-4 py-6">
          <div className="w-full flex justify-between gap-5">
            <div className="flex flex-col gap-2">
              <div>
                {handleTransactionStatus(Number(transactionDetails?.status))}
              </div>
              <span className="text-[1.5rem] font-medium">
                Order# {transactionDetails?.transaction_id}
              </span>
              <div>
                {handleMovementTransactionType(
                  transactionDetails?.movement_type
                )}
              </div>
            </div>
            <div>
              <CustomButton
                label={'Export'}
                icon={FileDown}
                link={`/download/in-out?id=${id}`}
                target="_blank"
              />
            </div>
          </div>
          <div className="w-full flex items-center gap-4">
            <Badge variant={'secondary'}>
              Transaction Date:{' '}
              {formattedDate(transactionDetails?.transaction_date)}
            </Badge>
            <Link
              className="flex"
              href={handleLocationLink(
                !!transactionDetails?.warehouse_name,
                transactionDetails?.location_id
              )}
            >
              <Badge
                variant={'secondary'}
                className="hover:bg-blue-400/10 hover:text-blue-400/90"
              >
                Location:{' '}
                {transactionDetails?.warehouse_name ||
                  transactionDetails?.plate_number}
              </Badge>
            </Link>
          </div>
        </div>
        <div>
          <CustomTable
            headers={inOutDetailsHeaders}
            data={transactionItems as TransactionItemProps[]}
            isLoading={isItemsValidating}
            withPagination={false}
            withAction={false}
            onChange={() => null}
            onRowClick={() => null}
            onUpdate={() => null}
            onDelete={() => null}
            page={0}
            perPage={0}
            totalData={0}
          />
        </div>
        <div className="w-full flex flex-col gap-8 border rounded-xl px-6 pt-4 py-6">
          <span className="font-medium text-[1.35rem]">Order Logs</span>
          <Timeline
            logs={transactionLogs as LogProps[]}
            isLoading={isLogsValidating}
          />
        </div>
      </div>
    </div>
  )
}

export default InOutDetails
