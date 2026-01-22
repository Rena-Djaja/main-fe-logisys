'use client'

import { useEffect, useState } from 'react'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import {
  CommonApiResponse,
  CommonDetailsRequest,
  CommonFormProps,
} from '@/type/Common'
import {
  ProductStockProps,
  ProductStockRequest,
  TruckProps,
} from '@/type/Inventory'
import { InventoryAPI, ProductAPI } from '@/constant/APIUrls'
import { callAPI } from '@/lib/fetchers'
import { ProductListFilterProps, ProductListResponse } from '@/type/Product'
import { apiStatusChecker } from '@/lib/utils'

interface FetchProductListResponse extends CommonApiResponse {
  data: ProductListResponse
}

interface StockListFilterProps extends ProductListFilterProps {
  product_id?: number
}

const defaultFilterMenu = {
  product_type: {
    category: 'Product Category',
    items: [
      {
        title: 'All Items',
        value: '',
      },
      {
        title: 'Selling Item',
        value: 'selling_item',
      },
      {
        title: 'Complimentary',
        value: 'complimentary',
      },
    ],
  },
  product_id: {
    category: 'Product',
    items: [] as { title: string; value: any }[],
  },
}

const defaultFilter = {
  page: 1,
  per_page: 1000,
  search: '',
}

const useTruckDetails = ({ id }: CommonFormProps) => {
  const [filterMenu, setFilterMenu] = useState(defaultFilterMenu)
  const [filter, setFilter] = useState<StockListFilterProps>(defaultFilter)

  const { data: truckDetails, isValidating } = useCommonApi<
    CommonDetailsRequest,
    TruckProps
  >(InventoryAPI.GET_TRUCK_DETAILS, { id: Number(id) }, { method: 'GET' })

  const { data: stockList, isValidating: isStockListValidating } = useCommonApi<
    ProductStockRequest,
    ProductStockProps[]
  >(
    InventoryAPI.GET_TRUCK_INVENTORY,
    {
      id: Number(id),
      category: filter.product_type,
      product_id: filter.product_id,
    },
    { method: 'GET' }
  )

  const search = (key: keyof StockListFilterProps, value: number | string) => {
    const newState = { ...filter, [key]: value }

    if (key === 'product_type') {
      newState['product_id'] = undefined
    }

    setFilter(newState)
  }

  const resetFilter = () => {
    setFilter(defaultFilter)
  }

  const fetchProductItems = async () => {
    try {
      const param = {
        page: filter.page,
        per_page: filter.per_page,
        search: '',
        product_type: filter.product_type,
      }
      const apiRes = await callAPI<
        ProductListFilterProps,
        FetchProductListResponse
      >(ProductAPI.GET_PRODUCT_LIST, param, { method: 'GET' })

      const { data: productListRes, status } = apiRes

      if (apiStatusChecker(status) && productListRes) {
        setFilterMenu((prev) => ({
          ...prev,
          product_id: {
            ...prev.product_id,
            items: productListRes.data.data.map((each) => ({
              title: each.name,
              value: each.id,
            })),
          },
        }))
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchProductItems()
  }, [filter])

  console.log(filterMenu)

  return {
    truckDetails,
    isValidating,
    stockList,
    isStockListValidating,
    filter,
    filterMenu,
    search,
    resetFilter,
  }
}

export default useTruckDetails
