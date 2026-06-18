'use client'

import React from 'react'
import { Form } from '@/components/shared/ui/form'
import CustomInput from '@/components/shared/FormInputs/CustomInput'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonType, ButtonVariant, InputType } from '@/type/FormInputs'
import useSavedLocationForm from '@/components/SavedLocationPage/Form/useSavedLocationForm'
import { Separator } from '@/components/shared/ui/separator'
import CustomSelect from '@/components/shared/FormInputs/CustomSelect'
import { Locate, MapIcon, Search } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shared/ui/sheet'
import CustomMap from '@/components/shared/Map/CustomMap'
import { LOCATION_TYPES } from '@/constant/Location'

const SavedLocationForm = () => {
  const {
    form,
    isLoading,
    isMapOpen,
    selectedLocation,
    currentPosition,
    handleMapOpen,
    handleSelectCurrentLocation,
    handleConfirmLocation,
    handleSearchLocation,
    onSubmit,
  } = useSavedLocationForm()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl flex flex-col gap-x-6 gap-y-10"
      >
        <Sheet open={isMapOpen} onOpenChange={handleMapOpen}>
          <SheetContent className="w-[55rem] max-w-dvw md:max-w-dvw lg:max-w-none overflow-auto">
            <SheetHeader>
              <SheetTitle>Pilih Lokasi</SheetTitle>
              <SheetDescription>
                Masukkan latitude dan longitude dari lokasi terkait. Anda dapat
                menyisipkan tautan lokasi dari Google Maps.
              </SheetDescription>
            </SheetHeader>
            <div className="w-full flex flex-col gap-6 pb-8 px-6">
              <div className="w-full flex items-start gap-4">
                <div className="w-full">
                  <CustomInput
                    name={'lat_long'}
                    placeholder={'Tautan Lokasi'}
                    helperText={'Format: {latitude}, {longitude}'}
                    control={form.control}
                  />
                </div>
                <div className="flex gap-2">
                  <div>
                    <CustomButton
                      label=""
                      type={ButtonType.BUTTON}
                      icon={Search}
                      disabled={!form.watch('lat_long')}
                      onClick={handleSearchLocation}
                    />
                  </div>
                  <div>
                    <CustomButton
                      label=""
                      type={ButtonType.BUTTON}
                      icon={Locate}
                      disabled={!currentPosition.hasLocation}
                      onClick={handleSelectCurrentLocation}
                    />
                  </div>
                </div>
              </div>
              <div className="aspect-square lg:aspect-video">
                <CustomMap
                  mapId={'saved-location-map'}
                  withSearchbox={false}
                  withDefaultMarkerClick={false}
                  withCustomMarkerClick={true}
                  onMarkerClick={handleConfirmLocation}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="mt-8 w-full flex flex-col gap-10">
          <div className="w-full flex flex-col">
            <h1 className="font-semibold text-[2rem]">Tambah Lokasi</h1>
            <span className="font-medium text-[0.95rem]">
              Tambah daftar lokasi tersimpan
            </span>
          </div>
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex flex-col">
              <span className="font-medium text-[1.155rem]">Detail Lokasi</span>
              <span className="text-[0.9rem] text-muted-foreground">
                Detail terkait lokasi
              </span>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <CustomInput
                  label={'Nama Lokasi'}
                  name={'name'}
                  control={form.control}
                  placeholder={'Masukkan nama lokasi'}
                />
              </div>
              <div>
                <CustomSelect
                  label={'Jenis Lokasi'}
                  name={'address_type'}
                  options={LOCATION_TYPES}
                  control={form.control}
                  placeholder={'Pilih jenis lokasi'}
                />
              </div>
              <div className="lg:col-span-2">
                <CustomInput
                  label={'Alamat'}
                  type={InputType.TEXTAREA}
                  name={'address'}
                  control={form.control}
                  placeholder={'Masukkan alamat lengkap lokasi'}
                />
              </div>
            </div>
          </div>
          <Separator />
          <div className="w-full flex flex-col gap-6">
            <div className="w-full flex">
              <div className="w-full flex flex-col">
                <span className="font-medium text-[1.155rem]">
                  Letak Geografis
                </span>
                <span className="text-[0.9rem] text-muted-foreground">
                  Letak geografis lokasi terkait
                </span>
              </div>
              <CustomButton
                label={''}
                icon={MapIcon}
                type={ButtonType.BUTTON}
                onClick={handleMapOpen}
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
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
            </div>
          </div>
          <div className="lg:col-span-2 mt-4 flex gap-2">
            <CustomButton
              type={ButtonType.BUTTON}
              variant={ButtonVariant.OUTLINE}
              label={'Batal'}
              link={'/dashboard/locations'}
              disabled={isLoading.submit}
            />
            <CustomButton label={'Simpan'} isLoading={isLoading.submit} />
          </div>
        </div>
      </form>
    </Form>
  )
}

export default SavedLocationForm
