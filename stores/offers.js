import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useOffersStore = create(
    persist(
        (set) => ({
            offers: [],
            loadingOffers: false,
            error: null,
            getOffers: (result) => {
                if (result?.code === 200 || result?.code === 204) {
                    set({
                        offers: result?.data?.reduce((acc, value) => {
                            return [...acc, { id: value?.ID, quantity: value?.quantity, unitPrice: value?.unit_price, productId: value?.product_id }]
                        }, [])
                    })
                } else {
                    set({ offers: [] })
                }
            }
        }),
        {
            name: 'offers'
        }
    )
)

export default useOffersStore
