import { SUPPLIER_API_URL, SUPPLIER_ASSOCIATION_API_URL } from '@/settings/constants'
import { getToken } from './account'

export const fetchGetSupplier = async () => {
    try {
        return await fetch(`${SUPPLIER_API_URL}`,
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-store',
                mode: 'cors'
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

export const fetchCreateSupplier = async ({ name, rut, companyName, companyRut }) => {
    try {
        return await fetch(`${SUPPLIER_API_URL}`,
            {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-store',
                mode: 'cors',
                body: JSON.stringify({
                    name,
                    rut,
                    company_name: companyName,
                    company_rut: companyRut
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

export const fetchGetAssociationSupplier = async ({ id }) => {
    try {
        return await fetch(`${SUPPLIER_ASSOCIATION_API_URL.replace(':id', id)}`,
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-store',
                mode: 'cors'
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

export const fetchUpdatedAssociationSupplier = async ({ supplierId, ids }) => {
    try {
        return await fetch(`${SUPPLIER_ASSOCIATION_API_URL.replace(':id', supplierId)}`,
            {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'Bearer ' + getToken()
                }),
                cache: 'no-store',
                mode: 'cors',
                body: JSON.stringify({
                    ids
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
