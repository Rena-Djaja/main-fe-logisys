'use client'

import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shared/ui/sheet'
import { Badge } from '@/components/shared/ui/badge'
import { Skeleton } from '@/components/shared/ui/skeleton'
import useSavedLocationDetails from '@/components/SavedLocationPage/Details/useSavedLocationDetails'
import { CommonDetailsComponentProps } from '@/type/Common'
import { handleFetchLocationType } from '@/lib/locations'
import CustomMap from '@/components/shared/Map/CustomMap'

const SavedLocationDetails = (props: CommonDetailsComponentProps) => {
  const { locationDetails, isLoading } = useSavedLocationDetails(props)
  const { detailsState, handleDetails } = props

  return (
    <Sheet
      open={detailsState.isOpen}
      onOpenChange={() => handleDetails('close')}
    >
      <SheetContent className="w-[55rem] max-w-dvw md:max-w-dvw lg:max-w-none overflow-auto pb-10">
        <SheetHeader>
          <SheetTitle>Detail Lokasi</SheetTitle>
          <SheetDescription>
            Lihat detail dari lokasi tersimpan yang dipilih
          </SheetDescription>
        </SheetHeader>
        <div className="px-6 mt-2">
          {isLoading ? (
            <DetailsSkeleton />
          ) : (
            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <Badge className="mt-1 text-[0.65rem]">
                    {handleFetchLocationType(
                      locationDetails?.address_type || ''
                    )}
                  </Badge>
                  <span className="font-semibold text-[1.45rem]">
                    {locationDetails?.name}
                  </span>
                </div>
                <span className="text-[0.85rem]">
                  {locationDetails?.address}
                </span>
              </div>
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="font-bold text-[0.8rem] text-muted-foreground">
                    Provinsi
                  </span>
                  <span className="font-medium">
                    {locationDetails?.province_name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[0.8rem] text-muted-foreground">
                    Kota/Kabupaten
                  </span>
                  <span className="font-medium">
                    {locationDetails?.regency_name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[0.8rem] text-muted-foreground">
                    Kecamatan
                  </span>
                  <span className="font-medium">
                    {locationDetails?.district_name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[0.8rem] text-muted-foreground">
                    Desa/Kelurahan
                  </span>
                  <span className="font-medium">
                    {locationDetails?.village_name}
                  </span>
                </div>
              </div>
              <div className="w-full aspect-square md:aspect-video">
                <CustomMap
                  mapId={'saved-location-details-map'}
                  withSearchbox={false}
                  withCurrentLocation={false}
                  withPopupCloseButton={false}
                />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SavedLocationDetails

const DetailsSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-14 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[15rem]" />
        <Skeleton className="h-3 w-[10rem]" />
        <Skeleton className="h-3 w-[5rem]" />
      </div>
    </div>
  )
}
