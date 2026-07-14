'use client'

import React, { FC } from 'react'
import { CommonFormProps } from '@/type/Common'
import { Form } from '@/components/shared/ui/form'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant, InputType } from '@/type/FormInputs'
import useSupplierForm from '@/components/SuppliersPage/Form/useSupplierForm'
import { Spinner } from '@/components/shared/ui/spinner'
import CustomMap from '@/components/shared/Map/CustomMap'
import { Separator } from '@/components/shared/ui/separator'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'

const SupplierForm: FC<CommonFormProps> = ({ id }) => {
  const { form, isLoading, selectedLocation, handleSelectLocation, onSubmit } =
    useSupplierForm({ id })

  if (isLoading.form) {
    return (
      <div className="w-full flex justify-center items-center py-[20rem]">
        <Spinner className="size-14" />
      </div>
    )
  }

  return (
    <div className="mt-8 w-full flex flex-col gap-10">
      <div className="w-full flex flex-col">
        <h1 className="font-semibold text-[2rem]">
          {!!id ? 'Edit' : 'Add'} Supplier
        </h1>
        <span className="font-medium text-[0.95rem]">
          {!!id ? 'Update' : 'Add new'} supplier record
        </span>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-3xl grid lg:grid-cols-2 gap-x-6 gap-y-10"
        >
          <div>
            <CustomInput
              label={'Nama Perusahaan'}
              name={'name'}
              control={form.control}
              placeholder={'Masukkan nama perusahaan'}
            />
          </div>
          <div>
            <CustomInput
              label={'Nomor Telepon'}
              name={'phone_number'}
              control={form.control}
              placeholder={'Masukkan nomor telp. perusahaan'}
              helperText={'Ex: 622123456'}
            />
          </div>
          <div className="lg:col-span-2 aspect-video">
            <CustomMap
              mapId={'supplier-form-map'}
              withPopupSelectButton={true}
              handlePopupSelect={(location) => handleSelectLocation(location)}
              withCustomMarkerClick={true}
              withDefaultMarkerClick={false}
            />
          </div>
          <div className="lg:col-span-2">
            <Separator />
          </div>
          <div className="lg:col-span-2">
            <h2 className="font-semibold text-[1.25rem]">Detail Alamat</h2>
          </div>
          <div className="lg:col-span-2">
            <CustomInput
              type={InputType.TEXTAREA}
              disabled
              label={'Alamat'}
              name={'address'}
              control={form.control}
              placeholder={'Masukkan alamat perusahaan'}
            />
          </div>
          <div>
            <CustomSelect
              label={'Provinsi'}
              name={'province_id'}
              control={form.control}
              placeholder={''}
              options={
                selectedLocation
                  ? [
                      {
                        label: selectedLocation.province_name,
                        value: selectedLocation.province_id,
                      },
                    ]
                  : []
              }
              disabled
              readOnly
            />
          </div>
          <div>
            <CustomSelect
              label={'Kota/Kabupaten'}
              name={'regency_id'}
              control={form.control}
              placeholder={''}
              options={
                selectedLocation
                  ? [
                      {
                        label: selectedLocation.regency_name,
                        value: selectedLocation.regency_id,
                      },
                    ]
                  : []
              }
              disabled
              readOnly
            />
          </div>
          <div>
            <CustomSelect
              label={'Kecamatan'}
              name={'district_id'}
              control={form.control}
              placeholder={''}
              options={
                selectedLocation
                  ? [
                      {
                        label: selectedLocation.district_name,
                        value: selectedLocation.district_id,
                      },
                    ]
                  : []
              }
              disabled
              readOnly
            />
          </div>
          <div>
            <CustomSelect
              label={'Desa/Kelurahan'}
              name={'village_id'}
              control={form.control}
              placeholder={''}
              options={
                selectedLocation
                  ? [
                      {
                        label: selectedLocation.village_name,
                        value: selectedLocation.village_id,
                      },
                    ]
                  : []
              }
              disabled
              readOnly
            />
          </div>
          <div className="lg:col-span-2 mt-4 flex gap-2">
            <CustomButton
              type={ButtonType.BUTTON}
              variant={ButtonVariant.OUTLINE}
              label={'Batal'}
              link={'/dashboard/suppliers'}
              disabled={isLoading.submit}
            />
            <CustomButton label={'Simpan'} isLoading={isLoading.submit} />
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SupplierForm
