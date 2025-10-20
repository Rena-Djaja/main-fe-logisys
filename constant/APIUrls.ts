const privateBaseURL = process.env.API_BASE_URL
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const AuthAPI = {
  POST_LOGIN: baseURL + '/auth/login',
  POST_AUTH_INFO: privateBaseURL + '/auth/info',
  GET_PERMISSION_LIST: privateBaseURL + '/auth/permission/list',
}

export const UserAPI = {
  GET_USER_LIST: baseURL + '/user/list',
  GET_USER_DETAILS: baseURL + '/user/details',
  POST_USER: baseURL + '/user',
}

export const SupplierAPI = {
  GET_SUPPLIER_LIST: baseURL + '/supplier/list',
  GET_SUPPLIER_DETAILS: baseURL + '/supplier/details',
  POST_SUPPLIER: baseURL + '/supplier',
}

export const RoleAPI = {
  GET_ROLE_LIST: baseURL + '/role/list',
}
