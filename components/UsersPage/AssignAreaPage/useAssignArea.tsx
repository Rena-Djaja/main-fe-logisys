'use client'

import { useEffect, useState } from 'react'
import {
  CommonApiResponse,
  CommonFilterRequest,
  CommonFormProps,
} from '@/type/Common'
import { callAPI } from '@/lib/fetchers'
import {
  DeleteAssignedLocationRequest,
  UserDetailsRequest,
  UserDetailsResponse,
  UserProps,
} from '@/type/User'
import { LocationAPI, SalesAreaAPI, UserAPI } from '@/constant/APIUrls'
import { apiStatusChecker } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import useCommonApi from '@/components/shared/Hooks/CommonApi/useCommonApi'
import { ButtonVariant } from '@/type/FormInputs'
import { useConfirmationStore } from '@/store'
import {
  ListTabStyle,
  SalesAreaFilterRequest,
  SalesAreaListProps,
} from '@/type/SalesArea'
import { TAB_STYLES } from '@/components/UsersPage/AssignAreaPage/Resource'

const useAssignArea = ({ id }: CommonFormProps) => {
  const { push } = useRouter()
  const { setConfirmation, setLoading, closeConfirmation } =
    useConfirmationStore()

  const [activeTab, setActiveTab] = useState(TAB_STYLES[0].id)
  const [userDetails, setUserDetails] = useState<UserProps | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<SalesAreaFilterRequest>({
    search: '',
    salesman_id: id,
  })

  const {
    data: salesAreaList,
    isValidating,
    mutate,
  } = useCommonApi<SalesAreaFilterRequest, SalesAreaListProps>(
    SalesAreaAPI.GET_SALES_AREA_LIST,
    filter,
    { method: 'GET' }
  )

  const handleTabChange = (id: ListTabStyle) => {
    setActiveTab(id)
  }

  const search = (key: keyof CommonFilterRequest, value: number | string) => {
    const newState = { ...filter, [key]: value }

    setFilter(newState)
  }

  const handleFormState = () => {
    setIsFormOpen((prev) => !prev)
  }

  const handleFailureFetchUserDetails = (response?: UserDetailsResponse) => {
    toast.error(
      response?.error || 'Something went wrong. Please try again later'
    )
    push('/dashboard/users')
  }

  const fetchUserDetails = async () => {
    setIsLoading(true)

    try {
      const apiRes = await callAPI<UserDetailsRequest, UserDetailsResponse>(
        UserAPI.GET_USER_DETAILS,
        { id: String(id) },
        { method: 'GET' }
      )

      const { data: userDetailsData, status } = apiRes

      if (apiStatusChecker(status) && userDetailsData) {
        const { data } = userDetailsData

        setUserDetails(data)
      } else {
        handleFailureFetchUserDetails(userDetailsData)
      }
    } catch {
      handleFailureFetchUserDetails()
      throw 'Failed to fetch user details'
    } finally {
      setIsLoading(true)
    }
  }

  const onDelete = (id: number) => {
    setConfirmation({
      isOpen: true,
      title: 'Are you absolutely sure?',
      description:
        'This action cannot be undone. This will permanently delete the data.',
      confirmButtonVariant: ButtonVariant.DESTRUCTIVES,
      confirmButtonText: "Yes, I'm sure",
      onConfirm: () => onConfirmDelete(id),
    })
  }

  const handleSuccessDelete = (response: CommonApiResponse) => {
    toast.success(response.message)
    mutate()
  }

  const handleFailureDelete = (response?: CommonApiResponse) => {
    toast.error(
      response?.error || 'Terjadi kesalahan. Mohon coba beberapa saat lagi.'
    )
  }

  const onConfirmDelete = async (salesLocationID: number) => {
    setLoading(true)

    try {
      const apiRes = await callAPI<
        DeleteAssignedLocationRequest,
        CommonApiResponse
      >(
        LocationAPI.POST_ASSIGN_LOCATION,
        { id: salesLocationID, sales_id: Number(id) },
        { method: 'DELETE' }
      )

      const { status, data: deleteSupplierRes } = apiRes

      if (apiStatusChecker(status) && deleteSupplierRes) {
        handleSuccessDelete(deleteSupplierRes)
      } else {
        handleFailureDelete(deleteSupplierRes)
      }
    } catch (err) {
      handleFailureDelete()
      throw err
    } finally {
      setLoading(false)
      closeConfirmation()
    }
  }

  useEffect(() => {
    if (id) {
      fetchUserDetails()
    }
  }, [id])

  return {
    isLoading,
    userDetails,
    salesAreaList,
    isValidating,
    isFormOpen,
    filter,
    activeTab,
    handleFormState,
    handleTabChange,
    mutate,
    search,
    onDelete,
  }
}

export default useAssignArea
