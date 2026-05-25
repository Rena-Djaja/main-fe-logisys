'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/shared/ui/tabs'
import useAssignedAreaList from '@/components/UsersPage/AssignAreaPage/List/useAssignedAreaList'
import { AssignedAreaListProps } from '@/type/SalesArea'
import EmptyPlaceholder from '@/components/shared/EmptyPlaceholder/EmptyPlaceholder'
import { MapPinned, TextAlignStart } from 'lucide-react'
import CustomTable from '@/components/shared/CustomTable/CustomTable'
import CustomMap from '@/components/shared/Map/CustomMap'
import { Button } from '@/components/shared/ui/button'

const AssignedAreaList = (props: AssignedAreaListProps) => {
  const { assignedAreas, isLoading, handleFormState } = props
  const { tabStyles, activeTab, handleTabChange, handleGoToLocations } =
    useAssignedAreaList(props)

  return (
    <div className="w-full flex flex-col gap-4">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          {tabStyles.map((style) => (
            <TabsTrigger
              key={style.id}
              value={style.id}
              onClick={() => handleTabChange(style.id)}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm flex items-center sm:px-3 sm:py-1.5"
            >
              {style.icon}
              <span className="hidden lg:inline">{style.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {activeTab === tabStyles[0].id ? (
        !isLoading && !assignedAreas?.areas?.length ? (
          <EmptyPlaceholder
            icon={TextAlignStart}
            title={'Belum Ada Daerah'}
            description={'Anda belum mendaftarkan daerah kepada pengguna ini.'}
            buttonText={'Daftar Daerah Baru'}
            onClick={handleFormState}
          />
        ) : (
          <div className="w-full">
            <CustomTable
              headers={[{ key: 'district_name', title: 'Kecamatan' }]}
              data={assignedAreas?.areas || []}
              isLoading={isLoading}
              withPagination={false}
              onChange={() => null}
              page={0}
              perPage={0}
              totalData={assignedAreas?.total_data || 0}
              onRowClick={() => null}
              allowDetails={() => false}
              allowDelete={() => false}
              allowEdit={() => false}
              onUpdate={() => null}
              onDelete={() => null}
            />
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
