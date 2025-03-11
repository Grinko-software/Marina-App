import { PRODUCT_OFFER } from '@/settings/constants'
import { getData, DELETE } from '@/services/http'
export const deleteOffer = async ({ id, notify }) => {
    try {
        return getData(`${PRODUCT_OFFER}/${id}`, DELETE).then((response) => {
            try {
                if (response?.code === 200) {
                    notify('✅ Oferta eliminada con exito!')
                } else {
                    notify(
                        '❌ La oferta no se pudo eliminar correctamente, intente mas tarde.'
                    )
                }
            } catch {
                return null
            }
        })
    } catch {
        return null
    }
}
