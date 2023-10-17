const BASE_AUTH_API_URL = 'https://marina-auth-api.up.railway.app'
const BASE_MARKET_API_URL = 'https://marina-market-api.up.railway.app'

// AUTH
export const AUTH_LOGIN_API_URL = BASE_AUTH_API_URL + '/auth/login'

// MARKET
export const CREATE_PRODUCT_API_URL = BASE_MARKET_API_URL + '/product/create'
export const CREATE_OFFER_API_URL = BASE_MARKET_API_URL + '/product/create/offer'

// Get product information
export const PRODUCT_API_URL = BASE_MARKET_API_URL + '/product'
// Get categories
export const CATEGORIES_API_URL = BASE_MARKET_API_URL + '/product/categories'
export const CREATE_CATEGORIES_API_URL = BASE_MARKET_API_URL + '/product/create/category'

// Get type of stock
export const TYPE_STOCK_API_URL = BASE_MARKET_API_URL + '/product/type-stock'
// Get type of payment
export const TYPE_PAYMENT_API_URL = BASE_MARKET_API_URL + '/payment'
// Get type of voucher
export const TYPE_VOUCHER_API_URL = BASE_MARKET_API_URL + '/voucher'

// Get offer
export const PRODUCT_OFFER = BASE_MARKET_API_URL + '/product/offer'

// Creat list
export const SALE_TICKET_CREATE = BASE_MARKET_API_URL + '/sale-ticket/create'
