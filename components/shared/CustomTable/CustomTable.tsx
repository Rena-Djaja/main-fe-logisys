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
import { Skeleton } from '@/components/shared/ui/skeleton'
import { MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared/ui/dropdown-menu'
import { Button } from '@/components/shared/ui/button'
import Link from 'next/link'

const CustomTable: FC<CustomTableProps> = (props) => {
  const {
    headers,
    data,
    isLoading,
    allowDetails = true,
    allowEdit = true,
    onChange,
    totalData,
    page,
    perPage,
    onRowClick,
    onUpdate,
    onDelete,
    customActions = [],
    customActionParam,
    allowedCustomAction,
  } = props

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((each, idx) => (
                <TableHead key={idx}>{each.title}</TableHead>
              ))}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(4)].map((_, rowIdx) => (
                <TableRow key={rowIdx} className="py-[8rem]">
                  {headers.map((_, cellIdx) => (
                    <TableCell key={cellIdx} className="text-center">
                      <Skeleton className="h-4 w-[80%]" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data?.length ? (
              data.map((each, rowIdx) => (
                <TableRow key={rowIdx}>
                  {headers.map((h, headerIdx) => (
                    <TableCell
                      key={`cell-${rowIdx}-${headerIdx}`}
                      onClick={() => allowDetails && onRowClick(each.id)}
                    >
                      {h?.customComponent ? (
                        <h.customComponent data={each} />
                      ) : (
                        <span>{each?.[h.key] || '-'}</span>
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="!w-[4rem]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {allowDetails && (
                          <DropdownMenuItem onClick={() => onRowClick(each.id)}>
                            Details
                          </DropdownMenuItem>
                        )}
                        {allowEdit && (
                          <DropdownMenuItem onClick={() => onUpdate(each.id)}>
                            Edit
                          </DropdownMenuItem>
                        )}
                        {customActionParam &&
                          allowedCustomAction &&
                          allowedCustomAction(each?.[customActionParam]) &&
                          customActions.length && (
                            <>
                              <DropdownMenuSeparator />
                              {customActions.map((act, actIdx) =>
                                act.link ? (
                                  <DropdownMenuItem key={actIdx} asChild>
                                    <Link href={act.link + `/${each.id}`}>
                                      {act.title}
                                    </Link>
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    key={actIdx}
                                    onClick={act.onClick}
                                  >
                                    {act.title}
                                  </DropdownMenuItem>
                                )
                              )}
                            </>
                          )}
                        {!!(
                          allowEdit ||
                          allowDetails ||
                          customActions?.length
                        ) && <DropdownMenuSeparator />}
                        <DropdownMenuItem
                          variant={'destructive'}
                          onClick={() => onDelete(each.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length + 1}
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
