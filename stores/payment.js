import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const usePaymentStore = create(
    persist(
        (set) => ({
            payment: [],
            loadingPayment: false,
            error: null,
            getPaymentType: (result) => {
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
            }
        }),
        {
            name: 'payment'
        }
    )
)

export default usePaymentStore
