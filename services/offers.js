import { PRODUCT_OFFER } from '@/settings/constants'
import { getToken } from './user'

export const deleteOffer = async ({ id, notify }) => {
    try {
        return await fetch(`${PRODUCT_OFFER}/${id}`,
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
                    notify('✅ Oferta eliminada con exito!')
                } else {
                    notify('❌ La oferta no se pudo eliminar correctamente, intente mas tarde.')
                }
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}
