import { fetchGet } from '@/services/sales'
import { TYPE_PAYMENT_API_URL } from '@/settings/constants'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const usePaymentStore = create(
    persist(
        (set) => ({
            payment: [],
            loadingPayment: false,
            error: null,
            getPaymentType: () => {
                set({ loadingPayment: true, error: null })
                try {
                    fetchGet(TYPE_PAYMENT_API_URL).then(result => {
                        if (result?.code === 200) {
                            set({
                                payment: result?.data?.reduce((acc, { ID, name }) => {
                                    return [...acc,
                                        {
                                            id: ID,
                                            name
                                        }
                                    ]
                                }, []),
                                loadingPayment: false
                            })
                        } else {
                            return null
                        }
                    })
                } catch {
                    set({ loadingPayment: false })
                }
            }
        }),
        {
            name: 'payment'
        }
    )
)

export default usePaymentStore
