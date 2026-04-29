'use client'

import React, { FC } from 'react'
import { NavigationType, PaginationProps } from '@/type/Pagination'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shared/ui/pagination'

const CustomPagination: FC<PaginationProps> = (props) => {
  const { onChange, totalData, page, perPage } = props

  const totalPage = Math.ceil(totalData / perPage)
  const renderNumber = page + 5 >= totalPage ? [] : ['...']
  for (let index = Math.min(totalPage, 2); index >= 0; index--) {
    let lower = page + index
    const high = totalPage - index
    if (page + 5 > totalPage) {
      lower -= page + 5 - totalPage
    }
    if (lower > 0) renderNumber.unshift(String(lower))
    if (page + 5 >= totalPage) {
      if (high > 0) renderNumber.push(String(high))
    } else {
      if (high === totalPage) renderNumber.push(String(high))
    }
  }

  const handleNavigate = (type: NavigationType, index?: number) => () => {
    let nextPage = Number(page)
    if (type === 'next' && nextPage + 1 <= totalPage) {
      nextPage++
    } else if (type === 'previous' && nextPage - 1 >= 1) {
      nextPage--
    } else if (type === 'index' && index !== undefined) {
      nextPage = index
    } else if (type === 'first' && index !== 1) {
      nextPage = 1
    } else if (type === 'last' && index !== totalPage) {
      nextPage = totalPage
    } else {
      return
    }
    onChange(nextPage)
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="order-2 lg:order-1 w-full">
          <p className="text-[0.875rem] text-[#414651]">
            Hasil <span>{1 + (perPage * page - perPage)}</span> ke{' '}
            <span>
              {perPage * page >= totalData ? totalData : perPage * page}
            </span>{' '}
            dari <span>{totalData} data</span>
          </p>
        </div>
        <Pagination className="order-1 lg:order-2">
          <PaginationContent className="lg:ml-auto">
            <PaginationItem>
              <PaginationPrevious
                onClick={handleNavigate('previous')}
                className="cursor-pointer"
                text={'Sebelumnya'}
              />
            </PaginationItem>
            {renderNumber.map((each, index) =>
              each === '...' ? (
                <PaginationEllipsis key={index} />
              ) : (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={handleNavigate('index', Number(each))}
                    isActive={page === Number(each)}
                    className="cursor-pointer"
                  >
                    {each}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={handleNavigate('next')}
                className="cursor-pointer"
                text={'Selanjutnya'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default CustomPagination
