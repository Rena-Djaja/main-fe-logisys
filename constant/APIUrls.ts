const privateBaseURL = process.env.API_BASE_URL
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const AuthAPI = {
  POST_LOGIN: baseURL + '/auth/login',
  POST_AUTH_INFO: privateBaseURL + '/auth/info',
  GET_PERMISSION_LIST: privateBaseURL + '/auth/permission/list',
}

export const LocationAPI = {
  GET_LOCATION_LIST: baseURL + '/location/list',
  GET_LOCATION_DETAILS: baseURL + '/location/details',
  GET_ASSIGNED_LOCATION: baseURL + '/location/sales/list',
  GET_VALIDATE_LOCATION: baseURL + '/location/sales/check',
  POST_LOCATION: baseURL + '/location',
  POST_ASSIGN_LOCATION: baseURL + '/location/sales',
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

export const ProductAPI = {
  GET_PRODUCT_LIST: baseURL + '/product/list',
  GET_PRODUCT_DETAILS: baseURL + '/product/details',
  GET_PRODUCT_VARIANTS: baseURL + '/product/variant/list',
  GET_PRODUCT_VARIANT_DETAILS: baseURL + '/product/variant/details',
  POST_PRODUCT: baseURL + '/product',
  POST_PRODUCT_VARIANT: baseURL + '/product/variant',
  POST_PRODUCT_VARIANT_STATUS: baseURL + '/product/variant/status',
}

export const InventoryAPI = {
  GET_WAREHOUSE_LIST: baseURL + '/inventory/warehouse/list',
  GET_TRUCK_LIST: baseURL + '/inventory/truck/list',
  POST_WAREHOUSE: baseURL + '/inventory/warehouse',
}

export const RoleAPI = {
  GET_ROLE_LIST: baseURL + '/role/list',
}
