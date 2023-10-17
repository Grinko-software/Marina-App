import { fetchGetOffers } from '@/services/products'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useOffersStore = create(
    persist(
        (set) => ({
            offers: [],
            loadingOffers: false,
            error: null,
            getOffers: () => {
                set({ loadingOffers: true, error: null })
                try {
                    fetchGetOffers().then(result => {
                        if (result?.code === 200) {
                            set({
                                offers: result?.data?.reduce((acc, value) => {
                                    return [...acc, { id: value?.ID, quantity: value?.quantity, unitPrice: value?.unit_price, productId: value?.product_id }]
                                }, [])
                            })
                        } else {
                            return null
                        }
                    })
                } catch (err) {
                    set({ loadingOffers: false, error: err })
                }
            }
        }),
        {
            name: 'offers'
        }
    )
)

export default useOffersStore
