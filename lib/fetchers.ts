'use client'

import axios, {
  AxiosError,
  AxiosProgressEvent,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios'
import { getCookie } from '@/lib/cookies'

export interface CallAPIOptions {
  checkToken: boolean
  method: Method
  withToken: boolean
  isMultipart: boolean
  isBlob: boolean
  timeout: number
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}

interface CallAPI {
  <Req, Res>(
    url: string,
    requestData: Req,
    options?: Partial<CallAPIOptions>
  ): Promise<Partial<AxiosResponse<Res>>>
}

export const callAPI: CallAPI = async (url, requestData, options) => {
  const {
    isMultipart = false,
    method = 'post',
    withToken = true,
    isBlob = false,
    timeout = 15000,
    onUploadProgress,
  } = options || {}

  const headers: {
    'Content-Type': string
    Authorization?: string
  } = {
    'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
  }

  // CHECK is token expired
  // if (checkToken) {
  //   await checkTokenHandler();
  // }

  if (withToken) {
    const tokenCookie = getCookie('access_token')
    if (tokenCookie) {
      headers['Authorization'] = `Bearer ${tokenCookie}`
    }
  }

  const axiosProps: AxiosRequestConfig = {
    headers,
    method,
    timeout,
    url,
    onUploadProgress,
    paramsSerializer: {
      indexes: null,
      serialize: (params: Record<string, any>) => {
        return Object.keys(params)
          .map(
            (key) =>
              key +
              '=' +
              (params[key] === 'null' || params[key] === 'undefined'
                ? ''
                : params[key] || '')
          )
          .join('&')
      },
    },
  }

  if (isBlob) {
    axiosProps.responseType = 'blob'
  }

  if (
    method.toLowerCase() === 'post' ||
    method.toLowerCase() === 'put' ||
    method.toLowerCase() === 'delete'
  ) {
    axiosProps.data = requestData
  } else if (method.toLowerCase() === 'get') {
    axiosProps.params = requestData
  }

  return axios(axiosProps)
    .then((response) => {
      return response || {}
    })
    .catch((err: AxiosError) => {
      const { response } = err
      return response || {}
    })
}

export const callAPIParallel = (promises: (() => Promise<any>)[]) => {
  return Promise.all(promises.map((promise) => promise()))
}
