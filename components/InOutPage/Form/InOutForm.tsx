'use client'

import React, { FC } from 'react'
import { CommonFormProps } from '@/type/Common'
import { Form } from '@/components/shared/ui/form'
import useInOutForm from '@/components/InOutPage/Form/useInOutForm'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import { LocationType } from '@/type/Inventory'
import DatePicker from '@/components/shared/DatePicker/DatePicker'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import {
  ButtonLength,
  ButtonType,
  ButtonVariant,
  InputType,
} from '@/type/FormInputs'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { List, Plus, Trash2 } from 'lucide-react'
import EmptyPlaceholder from '@/components/shared/EmptyPlaceholder/EmptyPlaceholder'
import ItemDialog from '@/components/InOutPage/Form/ItemDialog/ItemDialog'

const InOutForm: FC<CommonFormProps> = (props) => {
  const {
    form,
    transactionTypes,
    locationList,
    isLocationValidating,
    isDialogOpen,
    fields,
    isDraft,
    isLoading,
    onSubmit,
    search,
    handleDialog,
    handleAdd,
    remove,
    setIsDraft,
  } = useInOutForm(props)
  const { id } = props

  return (
    <>
      <ItemDialog
        baseForm={form}
        isOpen={isDialogOpen}
        handleDialog={handleDialog}
        fields={fields}
        handleAdd={handleAdd}
      />
      <div className="mt-8 w-full flex flex-col gap-10">
        <div className="w-full flex flex-col">
          <h1 className="font-semibold text-[2rem]">
            {!!id ? 'Edit' : 'Add'} Item Movement
          </h1>
          <span className="font-medium text-[0.95rem]">
            {!!id ? 'Update' : 'Add new'} item movement transaction
          </span>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-2xl grid lg:grid-cols-2 gap-x-6 gap-y-10"
          >
            <div>
              <DatePicker
                name={'transaction_date'}
                control={form.control}
                label={'Transaction Date'}
              />
            </div>
            <div>
              <CustomSelect
                label={'Transaction Type'}
                name={'movement_type'}
                control={form.control}
                placeholder={'Enter transaction type'}
                options={transactionTypes}
              />
            </div>
            <div className="w-full lg:col-span-2">
              <CustomSelect
                label={'From/To'}
                name={'location_id'}
                control={form.control}
                placeholder={'From/To'}
                isLoading={isLocationValidating}
                onSearch={(val) => search('search', val)}
                options={(locationList?.data || []).map((each) => ({
                  label:
                    each.location_type === LocationType.WAREHOUSE
                      ? String(each.warehouse_name)
                      : String(each.salesman_name),
                  value: String(each.id),
                }))}
              />
            </div>
            <div className="w-full lg:col-span-2">
              <CustomInput
                label={'Description'}
                placeholder={'Enter transaction description'}
                name={'description'}
                control={form.control}
                type={InputType.TEXTAREA}
              />
            </div>
            <div className="w-full lg:col-span-2 mt-4 flex flex-col gap-8">
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-[1.5rem]">Item List</span>
                  {form.formState.errors.items && (
                    <span className="text-destructive text-[0.875rem]">
                      {form.formState.errors.items.message}
                    </span>
                  )}
                </div>
                <div>
                  <CustomButton
                    label={'Add Item'}
                    icon={Plus}
                    onClick={handleDialog}
                    type={ButtonType.BUTTON}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-10">
                {fields.length ? (
                  <div className="w-full flex flex-col gap-8">
                    {fields.map((each, idx) => (
                      <div
                        key={each.id}
                        className="w-full flex justify-between items-center border rounded-xl p-4"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-[0.995rem]">
                            {each.product_id.split('|')[1]}
                          </span>
                          <span className="font-medium text-muted-foreground text-[0.85rem]">
                            {each.variant_id.split('|')[1]}
                          </span>
                          <span className="mt-1 font-bold">
                            {each.quantity} {each.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type={ButtonType.BUTTON}
                            onClick={() => remove(idx)}
                          >
                            <Trash2 className="size-5 text-destructive" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyPlaceholder
                    icon={List}
                    title={'No item added'}
                    description={
                      'You have not added any item yet. Please add one by clicking the button below.'
                    }
                    isError={!!form.formState.errors.items?.message}
                    buttonText={'Add Item'}
                    onClick={handleDialog}
                  />
                )}
              </div>
            </div>
            <div className="mt-4 lg:col-span-2 w-full flex flex-col lg:flex-row lg:justify-between gap-2">
              <div className="order-2 lg:order-1 mt-4 lg:mt-0">
                <CustomButton
                  type={ButtonType.BUTTON}
                  variant={ButtonVariant.OUTLINE}
                  label={'Cancel'}
                  link={'/dashboard/inventory'}
                  length={ButtonLength.FULL}
                  disabled={isLoading.submit}
                />
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 order-1">
                <div className="w-full lg:w-fit order-2 lg:order-1">
                  <CustomButton
                    label={'Save as Draft'}
                    onClick={() => setIsDraft(true)}
                    variant={ButtonVariant.SECONDARY}
                    length={ButtonLength.FULL}
                    isLoading={isDraft && isLoading.submit}
                    disabled={isLoading.submit}
                  />
                </div>
                <div className="w-full lg:w-fit order-1 lg:order-2">
                  <CustomButton
                    label={'Save'}
                    onClick={() => setIsDraft(false)}
                    length={ButtonLength.FULL}
                    isLoading={!isDraft && isLoading.submit}
                    disabled={isLoading.submit}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}

export default InOutForm
