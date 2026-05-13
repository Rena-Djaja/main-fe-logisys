'use client'

import React from 'react'
import { LocationFeature } from '@/type/Map'
import PopupWrapper from '@/components/shared/Map/Tools/Popup/PopupWrapper'
import { LocateIcon, MapPin, Navigation, Pin } from 'lucide-react'
import { Separator } from '@/components/shared/ui/separator'
import CustomButton from '@/components/shared/FormInputs/CustomButton'
import { ButtonSize, ButtonVariant, IconPlacementType } from '@/type/FormInputs'

type LocationPopupProps = {
  location: LocationFeature
  onClose?: () => void
}

const LocationPopup = (props: LocationPopupProps) => {
  const { location, onClose } = props

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
      closeButton={true}
      closeOnClick={false}
      className="location-popup"
      focusAfterOpen={false}
    >
      <div className="w-[300px] sm:w-[350px]">
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

        <div className="grid grid-cols-2 gap-2">
          <CustomButton
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.SMALL}
            icon={Navigation}
            iconPlacement={IconPlacementType.LEFT}
            label={'Directions'}
            onClick={() => {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                '_blank'
              )
            }}
          />
          <CustomButton
            variant={ButtonVariant.DEFAULT}
            size={ButtonSize.SMALL}
            icon={Pin}
            iconPlacement={IconPlacementType.LEFT}
            label={properties.mapbox_id ? 'Choose Location' : 'Save Location'}
            onClick={() => {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                '_blank'
              )
            }}
          />

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
