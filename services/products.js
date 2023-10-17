/* eslint-disable camelcase */
import { PRODUCT_API_URL, CATEGORIES_API_URL, TYPE_STOCK_API_URL, PRODUCT_OFFER } from '@/settings/constants'
import { getToken } from '@/services/user'
/* GET GENERAL */
export const fetchGet = async ({ url }) => {
    try {
        return await fetch(url,
            {
                method: 'get',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                if (response?.status === 204) {
                    return response
                }
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}
export const fetchGetproducts = async () => {
    try {
        return await fetch(PRODUCT_API_URL,
            {
                method: 'get',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                if (response?.status === 204) {
                    return response
                }
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}
/*  next: { revalidate: 60 }, cache: 'no-store' }) */
export const fetchGetCategories = async () => {
    try {
        return await fetch(CATEGORIES_API_URL,
            {
                method: 'get',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const fetchGetOffers = async () => {
    try {
        return await fetch(PRODUCT_OFFER,
            {
                method: 'get',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}
export const fetchGetOfferById = async (id) => {
    try {
        return await fetch(PRODUCT_OFFER + '/' + id,
            {
                method: 'get',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const fetchGetTypeStocks = async () => {
    try {
        return await fetch(TYPE_STOCK_API_URL,
            {
                method: 'get',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
            try {
                return response.json()
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const updateProduct = async (
    {
        id,
        name,
        cost_price,
        sale_price,
        net_price,
        image,
        code,
        category_id,
        stock_type_id,
        stock,
        stock_min,
        notify
    }) => {
    try {
        const queryParams = new URLSearchParams(
            {
                id: id || '',
                name: name || '',
                cost_price: cost_price || '',
                sale_price: sale_price || '',
                net_price: net_price || '',
                image: image || '',
                code: code || '',
                product_category_id: category_id || '',
                stock_type_id: stock_type_id || '',
                stock: stock || '',
                stock_min: stock_min || ''
            })
        return await fetch(`${PRODUCT_API_URL}?${queryParams}`,
            {
                method: 'PUT',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                })
            }).then(response => {
            try {
                if (response?.status === 200) {
                    notify('✅ Producto actualizado con exito!')
                } else {
                    notify('❌ El producto no se actualizo correctamente, intenta otra vez!')
                }
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const updateProductStock = async ({ stock_min, stock, notify }) => {
    try {
        const queryParams = new URLSearchParams({ stock, stock_min })
        return await fetch(`${PRODUCT_API_URL}/stock?${queryParams}`,
            {
                method: 'PUT',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                })
            }).then(response => {
            try {
                if (response?.status === 200) {
                    notify('✅ Stock de producto actualizado con exito!')
                } else {
                    notify('❌ El stock de producto no se actualizo correctamente, intenta más tarde.')
                }
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}

export const deleteProduct = async ({ id, notify }) => {
    try {
        const queryParams = new URLSearchParams({ id })
        return await fetch(`${PRODUCT_API_URL}?${queryParams}`,
            {
                method: 'DELETE',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-store',
                mode: 'cors'
            }).then(response => {
            try {
                if (response?.status === 200) {
                    notify('🗑️ Producto eliminado con exito!')
                } else {
                    notify('❌ El producto no se elimino correctamente, intenta más tarde')
                }
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}
