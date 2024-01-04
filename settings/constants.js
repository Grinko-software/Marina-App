// export const BASE_AUTH_API_URL = 'https://marina-auth-api.up.railway.app'
export const BASE_AUTH_API_URL = 'https://marina-auth-api-dev-rlfvoxmasq-uc.a.run.app'
export const BASE_MARKET_API_URL = 'https://marina-market-api-rlfvoxmasq-uc.a.run.app'
// const BASE_MARKET_API_URL = 'https://marina-market-api-prod-rlfvoxmasq-uc.a.run.app'

// AUTH
export const AUTH_LOGIN_API_URL = BASE_AUTH_API_URL + '/auth/login'
export const AUTH_CODE_API_URL = BASE_AUTH_API_URL + '/auth'
export const AUTH_RENEW = BASE_AUTH_API_URL + '/auth/renew'

// MARKET
export const CREATE_PRODUCT_API_URL = '/product/create'
export const CREATE_OFFER_API_URL = '/product/create/offer'

// Get product information
export const PRODUCT_API_URL = '/product'
// Get categories
export const CATEGORIES_API_URL = '/product/categories'
export const CREATE_CATEGORIES_API_URL = '/product/create/category'

// Get type of stock
export const TYPE_STOCK_API_URL = '/product/type-stock'
// Get type of payment
export const TYPE_PAYMENT_API_URL = '/payment'
// Get type of voucher
export const TYPE_VOUCHER_API_URL = '/voucher'

// Get offer
export const PRODUCT_OFFER = '/product/offer'

// Creat list
export const SALE_TICKET_CREATE = '/sale-ticket/create'
// DTEMITE ENDPOINTS
export const GET_DOCUMENT_HAULMER = '/dte'
// Get customers
export const CUSTOMER_API_URL = '/customer'
export const CREATE_CUSTOMER = '/customer/create'
// Create  Sale Machine Tuu
export const CREATE_PAYMENT_POSMACHINE = '/machine/create-sale'
// Get State Sale Machine Tuu
export const GET_STATE_SALE_POSMACHINE = '/machine/payment-request/:id'
// GET CONFIG
export const GET_POST_MACHINE = '/settings/post-machine'

// REPORTS
export const REPORTS_API_URL = BASE_MARKET_API_URL + '/report/period-voucher-type-sales'
export const REPORTS_CATEGORY_API_URL = BASE_MARKET_API_URL + '/report/period-category-sales'
export const REPORTS_INDICATORS_API_URL = BASE_MARKET_API_URL + '/report/period'
export const REPORTS_SALES_TYPES_API_URL = BASE_MARKET_API_URL + '/report/period-sales-types'
export const REPORTS_CRITICAL_STOCK_API_URL = BASE_MARKET_API_URL + '/report/product-stock'
export const REPORTS_LAST_SALES_API_URL = '/report/last-sales'
export const REPORTS_SALE_DETAIL_URL = BASE_MARKET_API_URL + '/sale-ticket'

// SUPPLIER
export const SUPPLIER_API_URL = BASE_MARKET_API_URL + '/supplier'
export const SUPPLIER_ASSOCIATION_API_URL = BASE_MARKET_API_URL + '/supplier/:id/association/products'
