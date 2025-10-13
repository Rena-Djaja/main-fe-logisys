'use client'

import React, { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shared/ui/table'
import CustomPagination from '@/components/shared/Pagination/Pagination'
import { CustomTableProps } from '@/type/CustomTable'

const CustomTable: FC<CustomTableProps> = (props) => {
  const { headers, data, isLoading, onChange, totalData, page, perPage } = props

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((each, idx) => (
                <TableHead key={idx}>{each.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(4)].map((_, rowIdx) => (
                <TableRow key={rowIdx} className="py-[8rem]">
                  {headers.map((_, cellIdx) => (
                    <TableCell
                      key={cellIdx}
                      className="text-center animate-pulse"
                    >
                      <div className="w-full h-7 bg-accent/60 rounded-md" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data?.length ? (
              data.map((each, rowIdx) => (
                <TableRow key={rowIdx}>
                  {headers.map((h, headerIdx) => (
                    <TableCell key={`cell-${rowIdx}-${headerIdx}`}>
                      <span>{each?.[h.key]}</span>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="h-32 text-center"
                >
                  <span>No Data Available</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!isLoading && (
        <CustomPagination
          onChange={onChange}
          totalData={totalData}
          page={page}
          perPage={perPage}
        />
      )}
    </div>
  )
}

export default CustomTable
