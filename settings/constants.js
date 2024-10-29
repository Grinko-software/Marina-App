// export const BASE_MARKET_API_URL = 'https://marina-market-api-prod-rlfvoxmasq-uc.a.run.app'
export const BASE_MARKET_API_URL = 'https://marina-market-api-dev-llhboxpn4q-uc.a.run.app'

// AUTH
export const AUTH_LOGIN_API_URL = BASE_MARKET_API_URL + '/auth/login'
export const AUTH_CODE_API_URL = BASE_MARKET_API_URL + '/auth'
export const AUTH_RENEW = BASE_MARKET_API_URL + '/auth/renew'

// MARKET
export const CREATE_PRODUCT_API_URL = '/product/create'
export const CREATE_OFFER_API_URL = '/product/create/offer'

// Get product information
export const PRODUCT_API_URL = '/product'
// Get categories
export const CATEGORIES_API_URL = '/product/categories'
export const CREATE_CATEGORIES_API_URL = '/product/create/category'
export const DELETE_CATEGORIES = '/product/categories/:id'
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
export const GET_CASH_REGISTER = '/settings/cash-register'
// REPORTS
export const REPORTS_API_URL = BASE_MARKET_API_URL + '/report/period-voucher-type-sales'
export const REPORTS_CATEGORY_API_URL = BASE_MARKET_API_URL + '/report/period-category-sales'
export const REPORTS_INDICATORS_API_URL = BASE_MARKET_API_URL + '/report/period'
export const REPORTS_SALES_TYPES_API_URL = BASE_MARKET_API_URL + '/report/period-sales-types'
export const REPORTS_CRITICAL_STOCK_API_URL = BASE_MARKET_API_URL + '/report/product-stock'
export const REPORTS_LAST_SALES_API_URL = '/report/last-sales'
export const REPORTS_SALE_DETAIL_URL = BASE_MARKET_API_URL + '/sale-ticket'

// USERS
export const USERS_API_URL = BASE_MARKET_API_URL + '/user'
export const CREATE_USER_API_URL = BASE_MARKET_API_URL + '/user/create'
export const USER_RESET_PASSWORD = BASE_MARKET_API_URL + '/user/password/reset'

// KEY
export const KEY_API_URL = BASE_MARKET_API_URL + '/key'
export const CREATE_KEY_API_URL = BASE_MARKET_API_URL + '/key/create'

// ASSOCIATION
export const ASSOCIATION_KEY_API_URL = BASE_MARKET_API_URL + '/association'

// SUPPLIER
export const SUPPLIER_API_URL = BASE_MARKET_API_URL + '/supplier'
export const SUPPLIER_ASSOCIATION_API_URL = BASE_MARKET_API_URL + '/supplier/:id/association/products'
// GET STATUS CASH REGISTER
export const GET_STATUS_CASH_REGISTER = '/accounting-event/status/cash-register/:id'
// GET INDICATORS INIT CASH
export const GET_INDICATORS_LAST_BALANCE = '/accounting-event/last-balance-ending/:id'
export const GET_INDICATORS_BALANCE_ENDING = '/accounting-event/indicators-balance-ending/:id'

export const CREATE_BALANCE_BEGINNINGS = '/accounting-event/create/balance-beginnings'
export const CREATE_BALANCE_ENDINGS = '/accounting-event/create/balance-endings'
export const CREATE_BALANCE_WITH_DRAWALS = '/accounting-event/create/withdrawals'
export const INDICATORS_ACCOUNTING_EVENT = '/accounting-event'

// PRINTER
export const PRINTER_TICKET_API_URL = 'http://localhost:8090/escpos/receipt/sale'
export const OPEN_DRAWER_API_URL = 'http://localhost:8090/escpos/receipt/event'
export const EVENT_API_URL = 'http://localhost:8090/escpos/receipt/event'
export const PRINTER_BARCODE_API_URL = 'http://localhost:8090/escpos/receipt/barcode'
export const PRINTER_SUPPLIER_TICKET_API_URL = 'http://localhost:8090/escpos/receipt/provider'
export const PRINTER_HEALTH_URL = 'http://localhost:8090/escpos/health'

// TASK
export const TASKS_API_URL_URL = BASE_MARKET_API_URL + '/task'
export const TASKS_RATE_API_URL_URL = BASE_MARKET_API_URL + '/task/rate'
export const TASK_TYPE_API_URL = BASE_MARKET_API_URL + '/task-type'
export const TASK_STATE_API_URL = BASE_MARKET_API_URL + '/task-state'
export const TASK_DIFFUCULT_API_URL = BASE_MARKET_API_URL + '/task-difficulties'
export const CREATE_TASK_TYPE_API_URL_URL = BASE_MARKET_API_URL + '/task-type/create'
export const CREATE_TASK_API_URL_URL = BASE_MARKET_API_URL + '/task/create'
