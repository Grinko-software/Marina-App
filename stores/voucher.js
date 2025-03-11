import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useVocuherStore = create(
    persist(
        (set) => ({
            voucher: [],
            loadingVoucher: false,
            getVoucherType: (result) => {
                set({ loadingVoucher: true, error: null })
                if (result?.code === 200) {
                    set({
                        voucher: result?.data?.reduce((acc, { ID, name }) => {
                            return [
                                ...acc,
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
            }
        }),
        {
            name: 'voucher'
        }
    )
)

export default useVocuherStore
