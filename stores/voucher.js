import { fetchGet } from '@/services/sales'
import { TYPE_VOUCHER_API_URL } from '@/settings/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useVocuherStore = create(
    persist(
        (set) => ({
            voucher: [],
            loadingVoucher: false,
            getVoucherType: () => {
                set({ loadingVoucher: true, error: null })
                try {
                    fetchGet(TYPE_VOUCHER_API_URL).then(result => {
                        if (result?.code === 200) {
                            set({
                                voucher: result?.data?.reduce((acc, { ID, name }) => {
                                    return [...acc,
                                        {
                                            id: ID,
                                            name
                                        }
                                    ]
                                }, []),
                                loadingVoucher: false
                            })
                        } else {
                            return null
                        }
                    })
                } catch {
                    set({ loadingVoucher: false })
                }
            }
        }),
        {
            name: 'voucher'
        }
    )
)

export default useVocuherStore
