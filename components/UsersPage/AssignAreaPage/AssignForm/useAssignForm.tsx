'use client'

import { useEffect, useState } from 'react'
import { LocationAPI, SalesAreaAPI } from '@/constant/APIUrls'
import {
  DistrictProps,
  DisVilListRequest,
  DisVilListResponse,
  LocationFilterRequest,
  LocationLevelType,
  LocationListProps,
  LocationListResponse,
} from '@/type/Location'
import { useFieldArray, useForm } from 'react-hook-form'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { useConfirmationStore } from '@/store'
import { ButtonVariant } from '@/type/FormInputs'
import { zodResolver } from '@hookform/resolvers/zod'
import { assignLocationValidationSchema } from '@/validations/UserValidation'
import { useMapContext } from '@/components/shared/context/MapContext'
import { LocationFeature } from '@/type/Map'
import { CommonApiResponse } from '@/type/Common'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import {
  AssignAreaFormProps,
  AssignLocationFormInputs,
  AssignLocationProps,
  AssignLocationRequest,
  SalesAreaFilterRequest,
  SalesAreaListProps,
} from '@/type/SalesArea'

const useAssignForm = (props: AssignAreaFormProps) => {
  const { userID, handleClose, mutateList } = props
  const { setConfirmation } = useConfirmationStore()
  const { map, setLocationList, resetSelectedLocations } = useMapContext()

  const form = useForm<AssignLocationFormInputs>({
    resolver: zodResolver(assignLocationValidationSchema),
    defaultValues: {
      province_id: '',
      regency_id: '',
      locations: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'locations',
  })

  const [searchLoading, setSearchLoading] = useState({
    province: false,
    regency: false,
    disVil: false,
  })
  const [defaultFilter] = useState({
    province: '',
    regency: '',
  })
  const [provinceList, setProvinceList] = useState<LocationListProps>()
  const [regencyList, setRegencyList] = useState<LocationListProps>()
  const [districtList, setDistrictList] = useState<DistrictProps[]>()
  const [isLoading, setIsLoading] = useState({
    validate: false,
    submit: false,
  })

  const {
    data: salesAreaList,
    isValidating,
    mutate,
  } = useCommonApi<SalesAreaFilterRequest, SalesAreaListProps>(
    SalesAreaAPI.GET_SALES_AREA_LIST,
    { salesman_id: userID },
    { method: 'GET' }
  )

  const mapLocationResult = (
    key: LocationLevelType,
    data: LocationListProps
  ) => {
    switch (key) {
      case LocationLevelType.PROVINCE:
        setProvinceList(data)
        break
      case LocationLevelType.REGENCY:
        setRegencyList(data)
        break
      default:
        return
    }
  }

  const handleSearch = async (
    level: LocationLevelType,
    search = '',
    parentId?: string
  ) => {
    setSearchLoading((prev) => {
      if (level === LocationLevelType.PROVINCE) {
        return {
          ...prev,
          province: true,
        }
      } else {
        return {
          ...prev,
          regency: true,
        }
      }
    })

    try {
      const filter: LocationFilterRequest = {
        page: 1,
        per_page: 10,
        search,
        level,
      }

      if (parentId) {
        filter['parent_id'] = parentId
      }

      const apiRes = await callAPI<LocationFilterRequest, LocationListResponse>(
        LocationAPI.GET_LOCATION_LIST,
        filter,
        { method: 'GET' }
      )

      const { status, data: locationData } = apiRes
      if (apiStatusChecker(status) && locationData) {
        mapLocationResult(level, locationData.data)
      } else {
        toast.error(
          locationData?.message ||
            'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
        )
      }
    } catch {
      toast.error('Terjadi kesalahan. Mohon coba beberapa saat lagi.')
      throw 'Failed to fetch locations'
    } finally {
      setSearchLoading((prev) => {
        if (level === LocationLevelType.PROVINCE) {
          return {
            ...prev,
            province: false,
          }
        } else {
          return {
            ...prev,
            regency: false,
          }
        }
      })
    }
  }

  const fetchLocByRegency = async (regencyId: string) => {
    setSearchLoading((prev) => ({ ...prev, disVil: true }))

    try {
      const selectedReg = regencyList?.locations.find(
        (each) => each.id === regencyId
      )

      const apiRes = await callAPI<DisVilListRequest, DisVilListResponse>(
        LocationAPI.GET_DIS_VIL_LIST,
        { regency_id: regencyId },
        { method: 'GET' }
      )
      const { status, data: locationData } = apiRes

      if (apiStatusChecker(status) && locationData) {
        handleSuccessFetchLoc(locationData)

        if (selectedReg) {
          map?.flyTo({
            center: [selectedReg.longitude, selectedReg?.latitude],
            zoom: 10,
            speed: 4,
            duration: 1000,
            essential: true,
          })
        }
      }
    } catch {
      throw 'Failed to fetch locations'
    } finally {
      setSearchLoading((prev) => ({ ...prev, disVil: false }))
    }
  }

  const handleSuccessFetchLoc = (res: DisVilListResponse) => {
    const { data } = res

    const locations: LocationFeature[] = data.map((each) => ({
      properties: {
        name: each.name,
        mapbox_id: each.id,
        full_address: '',
        feature_type: '',
        coordinates: {
          latitude: each.latitude,
          longitude: each.longitude,
        },
      },
    }))

    setDistrictList(data)
    setLocationList(locations)
  }

  const handleAddLocation = (location: LocationFeature) => {
    const selected = districtList?.find(
      (each) => each.id === location.properties.mapbox_id
    )

    if (selected) {
      const result = {
        location_id: selected.id,
        name: selected.name,
        latitude: selected.latitude,
        longitude: selected.longitude,
        level: selected.level,
        villages: selected.villages,
      }

      append(result)
    }
  }

  const handleRemoveLocation = (location: LocationFeature) => {
    const selectedIdx = fields.findIndex(
      (each) => each.location_id === location.properties.mapbox_id
    )

    if (selectedIdx !== -1) {
      remove(selectedIdx)
    }
  }

  const handleCloseForm = () => {
    if (form?.watch('locations')?.length) {
      setConfirmation({
        isOpen: true,
        title: 'Cancel the assignment?',
        description:
          'There are unsaved data. If you close this, you have to re-insert the data.',
        confirmButtonVariant: ButtonVariant.DESTRUCTIVES,
        confirmButtonText: "Yes, I'm sure",
        onConfirm: () => handleConfirmClose(),
      })
    } else {
      handleConfirmClose()
    }
  }

  const handleConfirmClose = () => {
    handleClose()
    form.reset()
    mutate()
    resetSelectedLocations()
  }

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    handleConfirmClose()
    mutateList()
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.message || 'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
    )
  }

  const onSubmit = async (data: AssignLocationFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      let locations: AssignLocationProps[] = []

      data.locations.forEach((each) => {
        const rows = each.villages.map((eachVillage) => ({
          village_id: eachVillage.id,
          salesman_id: userID,
        }))
        locations = [...locations, ...rows]
      })

      const apiRes = await callAPI<AssignLocationRequest, CommonApiResponse>(
        SalesAreaAPI.POST_BULK_INSERT_SALES_AREA,
        { locations }
      )
      const { status, data: assignLocationData } = apiRes

      if (apiStatusChecker(status) && assignLocationData) {
        handleSuccess(assignLocationData)
      } else {
        handleFailure(assignLocationData)
      }
    } catch {
      handleFailure()
      throw 'Failed to assign location'
    } finally {
      setIsLoading((prev) => ({ ...prev, submit: false }))
    }
  }

  useEffect(() => {
    ;(async () => {
      await handleSearch(LocationLevelType.PROVINCE, defaultFilter.province)
    })()
  }, [])

  return {
    form,
    fields,
    searchLoading,
    isLoading,
    defaultFilter,
    provinceList,
    regencyList,
    salesAreaList,
    isValidating,
    handleSearch,
    handleAddLocation,
    fetchLocByRegency,
    handleRemoveLocation,
    handleCloseForm,
    onSubmit,
  }
}

export default useAssignForm
