'use client'

import { useEffect, useRef, useState } from 'react'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { LocationAPI } from '@/constant/APIUrls'
import { CommonApiResponse, CommonFilterRequest } from '@/type/Common'
import {
  LocationListResponse,
  ValidateLocationRequest,
  ValidateLocationResponse,
} from '@/type/Location'
import { useFieldArray, useForm } from 'react-hook-form'
import { callAPI } from '@/lib/fetchers'
import { apiStatusChecker } from '@/lib/utils'
import { toast } from 'sonner'
import {
  AssignAreaFormProps,
  AssignLocationFormInputs,
  AssignLocationRequest,
} from '@/type/User'
import { useConfirmationStore } from '@/store'
import { ButtonVariant } from '@/type/FormInputs'
import { zodResolver } from '@hookform/resolvers/zod'
import { assignLocationValidationSchema } from '@/validations/UserValidation'

const useAssignForm = (props: AssignAreaFormProps) => {
  const { userID, handleClose, mutate } = props
  const { setConfirmation } = useConfirmationStore()

  const form = useForm<AssignLocationFormInputs>({
    resolver: zodResolver(assignLocationValidationSchema),
    defaultValues: {
      location_id: undefined,
      locations: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'locations',
  })

  const debounce = useRef(0)
  const [filter] = useState<CommonFilterRequest>({
    page: 1,
    per_page: 100,
    search: '',
  })

  const [isLoading, setIsLoading] = useState({
    validate: false,
    submit: false,
  })

  const { data: locationList, isValidating: isLocationLoading } = useCommonApi<
    CommonFilterRequest,
    LocationListResponse
  >(LocationAPI.GET_LOCATION_LIST, filter, { method: 'GET' })

  const fetchValidateLocation = async () => {
    try {
      const locationID = form.watch('location_id')?.split('|')?.[0]
      const apiRes = await callAPI<
        ValidateLocationRequest,
        ValidateLocationResponse
      >(
        LocationAPI.GET_VALIDATE_LOCATION,
        { location_id: String(locationID) },
        { method: 'GET' }
      )

      const { data: validateLocationRes, status } = apiRes

      if (apiStatusChecker(status) && validateLocationRes) {
        const {
          data: { is_available },
        } = validateLocationRes

        if (!is_available) {
          form.setError('location_id', {
            message: 'Location is already assigned',
          })
        }
      } else {
        toast.error('Something went wrong. Please try again later.')
        form.setValue('location_id', undefined)
      }
    } catch (err) {
      toast.error('Something went wrong')
      form.setValue('location_id', undefined)
      throw err
    } finally {
      setIsLoading((prev) => ({ ...prev, validate: false }))
    }
  }

  const handleValidateLocation = () => {
    form.clearErrors()
    setIsLoading((prev) => ({ ...prev, validate: true }))
    if (debounce.current) {
      clearTimeout(debounce.current)
    }
    debounce.current = window.setTimeout(() => {
      fetchValidateLocation()
    }, 500)
  }

  const handleAddLocation = () => {
    const locationID = {
      location_id: String(form.watch('location_id')),
    }
    append(locationID)
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

  const handleSuccess = (response: CommonApiResponse) => {
    toast.success(response.message)
    handleConfirmClose()
    mutate()
  }

  const handleFailure = (response?: CommonApiResponse) => {
    toast.error(
      response?.message || 'Something went wrong. Please try again later.'
    )
  }

  const onSubmit = async (data: AssignLocationFormInputs) => {
    setIsLoading((prev) => ({ ...prev, submit: true }))

    try {
      const req: AssignLocationRequest = {
        sales_id: Number(userID),
        locations: data.locations.map((loc) => ({
          location_id: Number(loc.location_id.split('|')?.[0]),
        })),
      }

      const apiRes = await callAPI<AssignLocationRequest, CommonApiResponse>(
        LocationAPI.POST_ASSIGN_LOCATION,
        req,
        { method: 'POST' }
      )

      const { data: assignLocationRes, status } = apiRes

      if (apiStatusChecker(status) && assignLocationRes) {
        handleSuccess(assignLocationRes)
      } else {
        handleFailure(assignLocationRes)
      }
    } catch {
      handleFailure()
      throw 'Failed to assign location to this user'
    }
  }

  useEffect(() => {
    if (form.watch('location_id')) {
      handleValidateLocation()
    }
  }, [form.watch('location_id')])

  return {
    form,
    fields,
    locationList,
    isLocationLoading,
    isLoading,
    handleAddLocation,
    handleRemoveLocation,
    handleCloseForm,
    onSubmit,
  }
}

export default useAssignForm
