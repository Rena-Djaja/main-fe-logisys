'use client'

import { useEffect, useState } from 'react'
import { LocationAPI } from '@/constant/APIUrls'
import {
  LocationFilterRequest,
  LocationLevelType,
  LocationListProps,
  LocationListResponse,
} from '@/type/Location'
import { useFieldArray, useForm } from 'react-hook-form'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import { AssignAreaFormProps, AssignLocationFormInputs } from '@/type/User'
import { useConfirmationStore } from '@/store'
import { ButtonVariant } from '@/type/FormInputs'
import { zodResolver } from '@hookform/resolvers/zod'
import { assignLocationValidationSchema } from '@/validations/UserValidation'

const useAssignForm = (props: AssignAreaFormProps) => {
  const {
    // userID,
    handleClose,
    // mutate
  } = props
  const { setConfirmation } = useConfirmationStore()
  // const { map } = useMapContext()

  const form = useForm<AssignLocationFormInputs>({
    resolver: zodResolver(assignLocationValidationSchema),
    defaultValues: {
      province_id: '',
      regency_id: '',
      locations: [],
    },
  })

  const { fields, remove } = useFieldArray({
    control: form.control,
    name: 'locations',
  })

  const [searchLoading, setSearchLoading] = useState({
    province: false,
    regency: false,
  })
  const [defaultFilter] = useState({
    province: '',
    regency: '',
  })
  const [provinceList, setProvinceList] = useState<LocationListProps>()
  const [regencyList, setRegencyList] = useState<LocationListProps>()
  const [isLoading, setIsLoading] = useState({
    validate: false,
    submit: false,
  })

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

  const fetchLocByRegency = (regencyId: string) => {
    const selectedReg = regencyList?.locations.find(
      (each) => each.id === regencyId
    )

    console.log(selectedReg)
  }

  const handleRemoveLocation = (idx: number) => {
    remove(idx)
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
  }

  // const handleSuccess = (response: CommonApiResponse) => {
  //   toast.success(response.message)
  //   handleConfirmClose()
  //   mutate()
  // }
  //
  // const handleFailure = (response?: CommonApiResponse) => {
  //   toast.error(
  //     response?.message || 'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
  //   )
  // }

  const onSubmit = async (data: AssignLocationFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    console.log(data)
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
    handleSearch,
    fetchLocByRegency,
    // handleAddLocation,
    handleRemoveLocation,
    handleCloseForm,
    onSubmit,
  }
}

export default useAssignForm
