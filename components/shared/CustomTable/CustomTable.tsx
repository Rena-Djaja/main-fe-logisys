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
import { Checkbox } from '@/components/shared/ui/checkbox'
import { cn } from '@/lib/utils'

const CustomTable: FC<CustomTableProps> = (props) => {
  const {
    headers,
    data,
    isLoading,
    allowDetails = () => true,
    allowEdit = () => true,
    allowDelete = () => true,
    withPagination = true,
    withAction = true,
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
    withCheckbox,
    selectedRows,
    setSelectedRows = () => null,
    disabledIds,
  } = props

  const dataIds = data.map((each) => String(each.id))
  const dataset = new Set(dataIds)

  const eqSet = (selected: Set<string> | undefined, data: Set<string>) => {
    return [...data].every((x) => selected?.has(x))
  }

  const selectAll = eqSet(selectedRows, dataset)

  const handleSelectAll = (checked: boolean) => {
    const ext = selectedRows ? [...selectedRows] : []
    if (checked) {
      const newState = [...ext, ...data?.map((row) => String(row.id))]
      setSelectedRows(new Set(newState))
    } else {
      const newState = new Set(selectedRows ? [...selectedRows] : [])
      dataIds.forEach((each) => newState?.delete(each))
      setSelectedRows(newState)
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedRows(newSelected)
  }

  return (
    <div className="relative w-full flex flex-col gap-6">
      <div className="rounded-md border overflow-auto scroll-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {withCheckbox && !isLoading && (
                <TableHead className="w-8">
                  <Checkbox
                    id="select-all-checkbox"
                    name="select-all-checkbox"
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
              )}
              {headers.map((each, idx) => (
                <TableHead key={idx}>{each.title}</TableHead>
              ))}
              {withAction && <TableHead />}
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
                <TableRow
                  key={rowIdx}
                  className={cn(
                    disabledIds?.has(String(each.id)) && 'opacity-50'
                  )}
                >
                  {withCheckbox && (
                    <TableCell key={`row-${rowIdx}-checkbox`}>
                      <Checkbox
                        id={`row-${rowIdx}-checkbox`}
                        name={`row-${rowIdx}-checkbox`}
                        checked={selectedRows?.has(String(each.id))}
                        disabled={disabledIds?.has(each.id)}
                        onCheckedChange={(checked: boolean) => {
                          if (!disabledIds?.has(String(each.id))) {
                            handleSelectRow(String(each.id), checked)
                          }
                        }}
                      />
                    </TableCell>
                  )}
                  {headers.map((h, headerIdx) => (
                    <TableCell
                      key={`cell-${rowIdx}-${headerIdx}`}
                      onClick={() =>
                        allowDetails(each) &&
                        !disabledIds?.has(String(each.id)) &&
                        onRowClick(each.id)
                      }
                    >
                      {h?.customComponent ? (
                        <h.customComponent data={each} />
                      ) : (
                        <span>{each?.[h.key] || '-'}</span>
                      )}
                    </TableCell>
                  ))}
                  {withAction && (
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
                          {allowDetails(each) && (
                            <DropdownMenuItem
                              onClick={() => onRowClick(each.id)}
                            >
                              Details
                            </DropdownMenuItem>
                          )}
                          {allowEdit(each) && (
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
                            (allowEdit(each) ||
                              allowDetails(each) ||
                              customActions?.length) &&
                            allowDelete(each)
                          ) && <DropdownMenuSeparator />}
                          {allowDelete(each) && (
                            <DropdownMenuItem
                              variant={'destructive'}
                              onClick={() => onDelete(each.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={withAction ? headers.length + 1 : headers.length}
                  className="h-32 text-center"
                >
                  <span>No Data Available</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!isLoading && withPagination && (
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
