'use client'

import React from 'react'
import { LocationFeature } from '@/type/Map'
import PopupWrapper from '@/components/shared/Map/Tools/Popup/PopupWrapper'
import { Check, LocateIcon, MapPin, Pin, Route } from 'lucide-react'
import { Separator } from '@/components/shared/ui/separator'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  IconPlacementType,
} from '@/type/FormInputs'
import { cn } from '@/lib/utils'
import { useMapContext } from '@/components/shared/context/MapContext'

type LocationPopupProps = {
  location: LocationFeature
  withCloseButton?: boolean
  withSelectButton?: boolean
  onClose?: () => void
  handleSelect?: (location: LocationFeature) => void
  selectButtonLoading?: boolean
}

const LocationPopup = (props: LocationPopupProps) => {
  const { selectedLocations } = useMapContext()
  const {
    location,
    withCloseButton,
    withSelectButton,
    selectButtonLoading,
    onClose,
    handleSelect,
  } = props

  if (!location) return null

  const { properties } = location

  const name = properties?.name || 'Unknown Location'
  const address = properties?.full_address || ''

  const lat = properties?.coordinates?.latitude
  const lng = properties?.coordinates?.longitude

  return (
    <PopupWrapper
      latitude={lat}
      longitude={lng}
      onClose={onClose}
      offset={15}
      closeButton={withCloseButton}
      closeOnClick={false}
      className="location-popup"
      focusAfterOpen={false}
    >
      <div className="w-[250px] md:w-[350px]">
        <div className="flex items-start gap-3">
          <div className="bg-rose-500/10 p-2 rounded-full shrink-0">
            <LocateIcon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="font-medium text-base truncate">{name}</h3>
              {/*{status && (*/}
              {/*  <Badge*/}
              {/*    variant={status === "active" ? "outline" : "secondary"}*/}
              {/*    className={cn(*/}
              {/*      "text-xs",*/}
              {/*      status === "active" ? "border-green-500 text-green-600" : ""*/}
              {/*    )}*/}
              {/*  >*/}
              {/*    {status === "active" ? "Open" : status}*/}
              {/*  </Badge>*/}
              {/*)}*/}
            </div>
            {/*{brand && brand !== name && (*/}
            {/*  <p className="text-sm font-medium text-muted-foreground">*/}
            {/*    {brand}*/}
            {/*  </p>*/}
            {/*)}*/}
            {address && (
              <p className="text-sm text-muted-foreground truncate mt-1">
                <MapPin className="h-3 w-3 inline mr-1 opacity-70" />
                {address}
              </p>
            )}
          </div>
        </div>

        {/*{categories.length > 0 && (*/}
        {/*  <div className="mt-3 flex flex-wrap gap-1 max-w-full">*/}
        {/*    {categories.slice(0, 3).map((category, index) => (*/}
        {/*      <Badge*/}
        {/*        key={index}*/}
        {/*        variant="secondary"*/}
        {/*        className="text-xs capitalize truncate max-w-[100px]"*/}
        {/*      >*/}
        {/*        {category}*/}
        {/*      </Badge>*/}
        {/*    ))}*/}
        {/*    {categories.length > 3 && (*/}
        {/*      <Badge variant="secondary" className="text-xs">*/}
        {/*        +{categories.length - 3} more*/}
        {/*      </Badge>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*)}*/}

        <Separator className="my-3" />

        <div className={cn('grid gap-2', withSelectButton && 'grid-cols-2')}>
          <CustomButton
            type={ButtonType.BUTTON}
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.SMALL}
            icon={Route}
            iconPlacement={IconPlacementType.LEFT}
            label={'Rute'}
            onClick={() => {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                '_blank'
              )
            }}
          />
          {withSelectButton && (
            <CustomButton
              type={ButtonType.BUTTON}
              variant={ButtonVariant.DEFAULT}
              size={ButtonSize.SMALL}
              icon={
                selectedLocations.some(
                  (each) =>
                    each.properties.mapbox_id === location.properties.mapbox_id
                )
                  ? Check
                  : Pin
              }
              iconPlacement={IconPlacementType.LEFT}
              label={
                selectedLocations.some(
                  (each) =>
                    each.properties.mapbox_id === location.properties.mapbox_id
                )
                  ? 'Terpilih'
                  : 'Pilih Lokasi'
              }
              isLoading={selectButtonLoading}
              disabled={
                selectButtonLoading ||
                selectedLocations.some(
                  (each) =>
                    each.properties.mapbox_id === location.properties.mapbox_id
                )
              }
              onClick={() => {
                handleSelect && handleSelect(location)
              }}
            />
          )}

          {/*<Button*/}
          {/*  variant="outline"*/}
          {/*  size="sm"*/}
          {/*  className="flex items-center justify-center"*/}
          {/*  onClick={() => {*/}
          {/*    console.log("Saved location:", location);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Star className="h-4 w-4 mr-1.5" />*/}
          {/*  Save*/}
          {/*</Button>*/}

          {/*{properties?.external_ids?.website && (*/}
          {/*  <Button*/}
          {/*    variant="outline"*/}
          {/*    size="sm"*/}
          {/*    className="col-span-2 flex items-center justify-center mt-1"*/}
          {/*    onClick={() => {*/}
          {/*      window.open(properties.external_ids?.website, "_blank");*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <ExternalLink className="h-4 w-4 mr-1.5" />*/}
          {/*    Visit Website*/}
          {/*  </Button>*/}
          {/*)}*/}
        </div>

        <div className="mt-3 pt-2 border-t text-xs text-muted-foreground">
          <div className="flex justify-end items-center">
            <span className="text-right">
              {lat.toFixed(4)}, {lng.toFixed(4)}
            </span>
          </div>
        </div>
      </div>
    </PopupWrapper>
  )
}

export default LocationPopup
