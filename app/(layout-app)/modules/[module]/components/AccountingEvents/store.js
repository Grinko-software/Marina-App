import { create } from 'zustand'
import { getData } from '@/services/http'
import { INDICATORS_ACCOUNTING_EVENT } from '@/settings/constants'
const useAccountingEventsStore = create((set) => ({
    data: null,
    loading: false,
    setLoading: (value) => set({ loading: value }),
    requestData: () => {
        try {
            set({ loading: true })
            setTimeout(() => {
                getData(`${INDICATORS_ACCOUNTING_EVENT}`).then((data) => {
                    set({ data: data?.data })
                }).catch((error) => {
                    console.debug(error)
                })
                set({ loading: false })
            }, [2000])
        } catch (e) {
            set({ loading: false })
        }
    }
}))

export default useAccountingEventsStore
