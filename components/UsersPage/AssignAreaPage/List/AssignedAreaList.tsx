'use client'

import React from 'react'
import useAssignedAreaList from '@/components/UsersPage/AssignAreaPage/List/useAssignedAreaList'
import { AssignedAreaListProps, ListTabStyle } from '@/type/SalesArea'
import EmptyPlaceholder from '@/components/shared/EmptyPlaceholder/EmptyPlaceholder'
import { ChevronDown, MapPinned, TextAlignStart } from 'lucide-react'
import CustomMap from '@/components/shared/Map/CustomMap'
import { Button } from '@/components/shared/ui/button'
import { cn } from '@/lib/utils'

const AssignedAreaList = (props: AssignedAreaListProps) => {
  const { assignedAreas, isLoading, handleFormState } = props
  const { activeTab, openedDistrict, handleOpenDistrict, handleGoToLocations } =
    useAssignedAreaList(props)

  return (
    <div className="w-full flex flex-col gap-4">
      {activeTab === ListTabStyle.LIST ? (
        !isLoading && !assignedAreas?.areas?.length ? (
          <EmptyPlaceholder
            icon={TextAlignStart}
            title={'Belum Ada Daerah'}
            description={'Anda belum mendaftarkan daerah kepada pengguna ini.'}
            buttonText={'Daftar Daerah Baru'}
            onClick={handleFormState}
          />
        ) : (
          <div className="w-full flex flex-col gap-4">
            {assignedAreas?.areas.map((each) => (
              <div key={each.district_id} className="w-full flex flex-col">
                <div
                  key={each.district_id}
                  className={cn(
                    'py-6 px-4 bg-card flex rounded-md justify-between',
                    openedDistrict === each.district_id && 'rounded-b-none'
                  )}
                  onClick={() => handleOpenDistrict(each.district_id)}
                >
                  <div className="flex gap-5">
                    <div className="p-3 bg-muted rounded">
                      <MapPinned className="size-8" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{each.district_name}</span>
                      <div className="flex gap-2 text-[0.85rem] text-muted-foreground">
                        <span>Lat: {each.latitude}</span>
                        <span>Long: {each.longitude}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-[0.8rem] text-muted-foreground uppercase">
                        Jumlah Kelurahan
                      </span>
                      <span className="font-bold text-[0.95rem] self-end">
                        {each.villages.length} Wilayah
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'size-6 transition-transform duration-300 cursor-pointer',
                        openedDistrict === each.district_id && 'rotate-180'
                      )}
                    />
                  </div>
                </div>
                {openedDistrict === each.district_id && (
                  <div className="bg-muted/70 w-full grid md:grid-cols-3 gap-4 py-6 px-4 rounded-b-md">
                    {each.villages.map((village) => (
                      <div
                        key={village.id}
                        className="flex flex-col gap-1 p-4 border rounded-md"
                      >
                        <span className="font-bold text-[0.95rem]">
                          {village.village_name}
                        </span>
                        <div className="flex gap-2 text-[0.85rem] text-muted-foreground">
                          <span>Lat: {village.latitude}</span>
                          <span>Long: {each.longitude}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="relative w-full aspect-square md:aspect-video">
          <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
            <Button
              type="button"
              className="bg-background"
              variant="ghost"
              size="icon"
              onClick={handleGoToLocations}
            >
              <MapPinned className="size-4 md:size-5" />
              <span className="sr-only">Go to Locations</span>
            </Button>
          </div>
          <CustomMap
            mapId={'assigned-area-list'}
            withMarkerClick={false}
            withSearchbox={false}
          />
        </div>
      )}
    </div>
  )
}

export default AssignedAreaList
