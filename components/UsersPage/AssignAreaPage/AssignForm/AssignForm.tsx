'use client'

import React, { FC } from 'react'
import CustomModal from '@/components/shared/CustomModal/CustomModal'
import useAssignForm from '@/components/UsersPage/AssignAreaPage/AssignForm/useAssignForm'
import { Form } from '@/components/shared/ui/form'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant } from '@/type/FormInputs'
import { DialogClose, DialogFooter } from '@/components/shared/ui/dialog'
import { AssignAreaFormProps } from '@/type/User'
import CustomAsyncSelect from '@/components/shared/FormInputs/CustomAsyncSelect'
import { LocationLevelType } from '@/type/Location'
import Map from '@/components/shared/Map/Map'

const AssignForm: FC<AssignAreaFormProps> = (props) => {
  const {
    form,
    searchLoading,
    isLoading,
    defaultFilter,
    provinceList,
    regencyList,
    handleSearch,
    fetchLocByRegency,
    handleCloseForm,
    onSubmit,
  } = useAssignForm(props)
  const { isOpen } = props

  return (
    <CustomModal
      onClose={handleCloseForm}
      size={'5xl'}
      open={isOpen}
      title="Assign New Area"
      description="You can add multiple areas to this user"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full grid lg:grid-cols-2 gap-4">
            <div className="w-full">
              <CustomAsyncSelect
                name={'province_id'}
                control={form.control}
                placeholder={'Pilih provinsi'}
                options={(provinceList?.locations || []).map((each) => ({
                  label: each.name,
                  value: each.id,
                }))}
                isLoading={searchLoading.province}
                defaultFilter={defaultFilter.province}
                onSearch={(val) =>
                  handleSearch(LocationLevelType.PROVINCE, val)
                }
                customOnChange={(provinceId: string) =>
                  handleSearch(
                    LocationLevelType.REGENCY,
                    defaultFilter.regency,
                    provinceId
                  )
                }
              />
            </div>
            <div className="w-full">
              <CustomAsyncSelect
                name={'regency_id'}
                control={form.control}
                placeholder={'Pilih kabupaten/kota'}
                options={(regencyList?.locations || []).map((each) => ({
                  label: each.name,
                  value: each.id,
                }))}
                isLoading={searchLoading.regency}
                defaultFilter={defaultFilter.regency}
                disabled={!form.watch('province_id')}
                customOnChange={fetchLocByRegency}
                onSearch={(val) => handleSearch(LocationLevelType.REGENCY, val)}
              />
            </div>
            <div className="w-full aspect-video lg:col-span-2 my-4">
              <Map withSearchbox={false} />
            </div>
            {/*<div>*/}
            {/*  <CustomButton*/}
            {/*    label={'Add'}*/}
            {/*    type={ButtonType.BUTTON}*/}
            {/*    onClick={handleAddLocation}*/}
            {/*    disabled={*/}
            {/*      !form.watch('location_id') ||*/}
            {/*      !!form.formState.errors?.location_id ||*/}
            {/*      isLoading.validate ||*/}
            {/*      fields*/}
            {/*        .map((each: any) => each.location_id)*/}
            {/*        .includes(form.watch('location_id'))*/}
            {/*    }*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <CustomButton
                type={ButtonType.BUTTON}
                label={'Cancel'}
                variant={ButtonVariant.OUTLINE}
                disabled={isLoading.submit}
              />
            </DialogClose>
            <CustomButton
              type={ButtonType.SUBMIT}
              label={'Save changes'}
              disabled={isLoading.validate}
              isLoading={isLoading.submit}
            />
          </DialogFooter>
        </form>
      </Form>
    </CustomModal>
  )
}

export default AssignForm
