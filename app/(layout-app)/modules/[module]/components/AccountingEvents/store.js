import { create } from 'zustand'
import { getData } from '@/services/http'
import { INDICATORS_ACCOUNTING_EVENT } from '@/settings/constants'
const useAccountingEventsStore = create((set) => ({
    data: null,
    loading: false,
    totalpage: undefined,
    setLoading: (value) => set({ loading: value }),
    requestData: (limitPage, currentPage) => {
        try {
            set({ loading: true })
            setTimeout(() => {
                getData(`${INDICATORS_ACCOUNTING_EVENT}` + '?limit=' + limitPage + '&offset=' + currentPage).then((data) => {
                    set({
                        data: data?.data?.response_events,
                        totalpage: data?.data?.total_page
                    })
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
