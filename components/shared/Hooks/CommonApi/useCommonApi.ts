'use client'

import { Method } from 'axios'
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { callAPI, CallAPIOptions } from '@/lib/fetchers'
import {toast} from "sonner";

export type DataType<T> = T | null
type ResType<T> = {
  data: T
  status: any
}

/**
 * Use skipCall to prevent avoid API call
 * Use revalidateOnMount to ensure API called every time the component re-mount, SWR use URL as cache-key
 *
 * @param apiUrl
 * @param apiReq
 * @param options
 * @param swrOptions
 * @returns
 */
export default function useCommonApi<TReq, TReturn>(
  apiUrl: string,
  apiReq: TReq,
  options?: Partial<CallAPIOptions>,
  swrOptions?: Partial<{
    skipCall: boolean
    revalidateOnMount: boolean
  }>
): SWRResponse<DataType<TReturn>, string> {
  const fetcher = (url: [string, TReq, Method]) =>
    callAPI<TReq, ResType<TReturn>>(url[0], apiReq, options).then((res) => {
      if (res.status === 200 && res.data !== undefined) {
        return res.data.data
      } else if (!res?.status || res.status >= 500) {
          toast.error('Internal server error. Please try again.')
      }
      return null
    })

  // COMPOSE SWR Options
  const useSwrOptions: SWRConfiguration = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
  }
  if (swrOptions?.revalidateOnMount) {
    useSwrOptions.revalidateOnMount = swrOptions?.revalidateOnMount
    useSwrOptions.dedupingInterval = 0
  }

  return useSWR<
    DataType<TReturn>,
    string,
    [string, typeof apiReq, Method] | null
  >(
    swrOptions?.skipCall ? null : [apiUrl, apiReq, options?.method || 'post'],
    fetcher,
    useSwrOptions
  )
}
