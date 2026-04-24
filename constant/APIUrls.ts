const privateBaseURL = process.env.API_BASE_URL
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const AuthAPI = {
  POST_LOGIN: baseURL + '/auth/login',
  POST_AUTH_INFO: privateBaseURL + '/auth/info',
  POST_CHANGE_PASSWORD: baseURL + '/auth/change-password',
  GET_PERMISSION_LIST: privateBaseURL + '/permission/list',
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
  POST_BULK_PRODUCT_DETAILS: baseURL + '/product/details/bulk',
  POST_PRODUCT: baseURL + '/product',
  POST_PRODUCT_VARIANT: baseURL + '/product/variant',
  POST_PRODUCT_VARIANT_STATUS: baseURL + '/product/variant/status',
}

export const DiscountAPI = {
  GET_DISCOUNT_RULE_LIST: baseURL + '/discount/list',
  GET_DISCOUNT_RULE_DETAILS: baseURL + '/discount/details',
  GET_DISCOUNT_ITEM_LIST: baseURL + '/discount/items',
  POST_DISCOUNT: baseURL + '/discount',
}

export const InventoryAPI = {
  GET_WAREHOUSE_LIST: baseURL + '/inventory/warehouse/list',
  GET_TRUCK_LIST: baseURL + '/inventory/truck/list',
  GET_WAREHOUSE_DETAILS: baseURL + '/inventory/warehouse/details',
  GET_WAREHOUSE_INVENTORY: baseURL + '/inventory/warehouse/stock',
  GET_TRUCK_INVENTORY: baseURL + '/inventory/truck/stock',
  GET_TRUCK_DETAILS: baseURL + '/inventory/truck/details',
  GET_INVENTORY_LOCATION_LIST: baseURL + '/inventory/location/list',
  POST_WAREHOUSE: baseURL + '/inventory/warehouse',
  POST_TRUCK: baseURL + '/inventory/truck',
}

export const RoleAPI = {
  GET_ROLE_LIST: baseURL + '/role/list',
}

export const InOutAPI = {
  GET_IN_OUT_LIST: baseURL + '/movement/list',
  GET_IN_OUT_DETAILS: baseURL + '/movement/details',
  GET_IN_OUT_ITEMS: baseURL + '/movement/items',
  POST_IN_OUT: baseURL + '/movement',
  PUT_UPDATE_STATUS: baseURL + '/movement/status',
}

export const LogAPI = {
  GET_TRANSACTION_LOG: baseURL + '/logs/transaction',
}
