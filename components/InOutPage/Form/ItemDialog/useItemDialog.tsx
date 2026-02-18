'use client'

import { useEffect, useState } from 'react'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { ProductAPI } from '@/constant/APIUrls'
import {
  ProductListFilterProps,
  ProductListResponse,
  ProductVariantProps,
  ProductVariantsRequest,
} from '@/type/Product'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { itemDialogValidationSchema } from '@/validations/ItemDialogValidation'
import {
  ItemDialogFormInputs,
  ItemDialogProps,
  ItemRowProps,
} from '@/type/Inventory'
import { thousandFormat } from '@/lib/utils'

const useItemDialog = (props: ItemDialogProps) => {
  const { baseForm, fields, isOpen, handleAdd, handleDialog } = props

  const form = useForm<ItemDialogFormInputs>({
    resolver: zodResolver(itemDialogValidationSchema),
    mode: 'onSubmit',
    defaultValues: {
      product_id: '',
      variant_id: '',
      quantity: '',
    },
  })

  const [filter, setFilter] = useState<ProductListFilterProps>({
    page: 1,
    per_page: 5,
    search: '',
  })

  const { data: productList, isValidating: isProductListValidating } =
    useCommonApi<ProductListFilterProps, ProductListResponse>(
      ProductAPI.GET_PRODUCT_LIST,
      filter,
      { method: 'GET' }
    )

  const { data: variantList, isValidating: isVariantListValidating } =
    useCommonApi<ProductVariantsRequest, ProductVariantProps[]>(
      ProductAPI.GET_PRODUCT_VARIANTS,
      { product_id: Number(form.watch('product_id').split('|')[0]) },
      { method: 'GET' },
      { skipCall: !form.watch('product_id') }
    )

  const selectedProduct = productList?.data.find(
    (each) => each.id === Number(form.watch('product_id').split('|')[0])
  )

  const search = (
    key: keyof ProductListFilterProps,
    value: number | string
  ) => {
    const newState = { ...filter, [key]: value }
    if (key === 'search') {
      newState.page = 1
    }

    setFilter(newState)
  }

  const onSubmit = async (data: ItemDialogFormInputs) => {
    const row: ItemRowProps = {
      ...data,
      quantity: data.quantity.replace('-', ''),
      unit: selectedProduct?.unit || '',
    }

    const existedData = fields.find(
      (each) => each.variant_id === row.variant_id
    )

    if (existedData) {
      const existedIdx = fields.indexOf(existedData)
      const quantity =
        Number(existedData.quantity.replaceAll(',', '')) +
        Number(row.quantity.replaceAll(',', ''))
      fields[existedIdx] = {
        ...row,
        quantity: thousandFormat(quantity),
      }

      baseForm.setValue('items', fields)
    } else {
      handleAdd(row)
    }

    handleDialog()
  }

  useEffect(() => {
    if (!form.watch('product_id') || !isOpen) {
      form.reset()
    }
  }, [form.watch('product_id'), isOpen])

  return {
    form,
    productList,
    isProductListValidating,
    variantList,
    isVariantListValidating,
    selectedProduct,
    search,
    onSubmit,
  }
}

export default useItemDialog
