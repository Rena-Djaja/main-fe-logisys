'use client'

import React from 'react'
import useSearchbox from '@/components/shared/Map/Tools/Searchbox/useSearchbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shared/ui/command'
import { cn } from '@/lib/utils'
import { Loader2, MapPin, X } from 'lucide-react'
import LocationPopup from '@/components/shared/Map/Tools/Popup/LocationPopup'

const Searchbox = () => {
  const {
    isOpen,
    isLoading,
    displayValue,
    results,
    // selectedLocations,
    selectedLocation,
    handleSearch,
    clearSearch,
    handleSelect,
    setSelectedLocation,
  } = useSearchbox()

  return (
    <>
      <section className="absolute top-4 left-1/2 sm:left-4 z-10 w-[90vw] sm:w-[350px] -translate-x-1/2 sm:translate-x-0 rounded-lg shadow-lg">
        <Command className="rounded-lg">
          <div
            className={cn(
              '!w-full flex items-center justify-between px-3 gap-1',
              isOpen && 'border-b'
            )}
          >
            <CommandInput
              placeholder="Search locations..."
              onValueChange={(e) => handleSearch(e)}
              value={displayValue}
              className="flex-1"
            />
            {displayValue && !isLoading && (
              <X
                className="size-4 shrink-0 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={clearSearch}
              />
            )}
            {isLoading && (
              <Loader2 className="size-4 shrink-0 text-primary animate-spin" />
            )}
          </div>

          {isOpen && (
            <CommandList className="max-h-60 overflow-y-auto">
              {!results.length ? (
                <CommandEmpty className="py-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <p className="text-sm font-medium">No locations found</p>
                    <p className="text-xs text-muted-foreground">
                      Try a different search term
                    </p>
                  </div>
                </CommandEmpty>
              ) : (
                <CommandGroup>
                  {results?.map((each) => (
                    <CommandItem
                      key={each.mapbox_id}
                      onSelect={() => handleSelect(each.mapbox_id)}
                      value={each.name}
                      className="flex items-center py-3 px-2 cursor-pointer hover:bg-accent rounded-md"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium truncate max-w-[270px]">
                            {each.name}
                          </span>
                          <span className="text-xs text-muted-foreground truncate max-w-[270px]">
                            {each.full_address}
                          </span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          )}
        </Command>
      </section>

      {/*{selectedLocations.map((location) => (*/}
      {/*  <LocationMarker*/}
      {/*    key={location.properties.mapbox_id}*/}
      {/*    location={location}*/}
      {/*    onHover={(data) => setSelectedLocation(data)}*/}
      {/*  />*/}
      {/*))}*/}

      {selectedLocation && (
        <LocationPopup
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </>
  )
}

export default Searchbox
