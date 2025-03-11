// import { PRODUCT_OFFER } from '@/settings/constants'
import { getData, POST } from '@/services/http'
export const cancelSale = async ({ detail, notify }) => {
    try {
        return getData('/sale', POST).then((response) => {
            try {
                if (response?.code === 200) {
                    notify('✅ Venta cancelada notificada con exito!')
                } else {
                    notify(
                        '❌ No se pudo notificar correctamente su cancelación, intentelo mas tarde.'
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
