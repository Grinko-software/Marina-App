import { GET, getData } from '@/services/http'
import { GET_STATUS_CASH_REGISTER } from '@/settings/constants'

export const getStatus = async (id) => {
    return getData(GET_STATUS_CASH_REGISTER.replace(':id', id), GET).then(
        (data) => {
            if (data?.code === 200) {
                return data?.data?.cash_balance_beginning
            } else {
                return null
            }
        }
    )
}
