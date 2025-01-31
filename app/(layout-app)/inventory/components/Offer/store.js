import { CREATE_OFFER_API_URL } from '@/settings/constants'
import { create } from 'zustand'
import { getData, POST } from '@/services/http'
const useOfferFormStore = create((set) => ({
    data: {
        product_id: null,
        quantity: null,
        unit_price: null
    },
    error: null,
    loading: false,
    complete: false,
    setFormData: (newData) => set({ data: { ...newData } }),
    setLoading: (value) => set({ loading: value }),
    setError: (value) => set({ error: value }),
    requestCreateOffer: async (data, notify) => {
        set({ loading: true, error: null, complete: false })

        // has requered values
        const missingRequeredValues =
			!data || !data.product_id || !data.quantity || !data.unit_price
        if (missingRequeredValues) {
            set({ loading: false, error: 'Rellena todos los campos necesarios' })
            return
        }

        try {
            getData(CREATE_OFFER_API_URL, POST, {
                product_id: data.product_id,
                quantity: data.quantity,
                unit_price: data.unit_price
            }).then((response) => {
                set({ loading: false, complete: true })
                if (response?.code === 200) {
                    notify('🔥 Oferta creada con exito!')
                } else {
                    notify(' La oferta no fue creada intenta otra vez!')
                }
            })
        } catch (err) {
            set({ loading: false, error: err, complete: true })
        }
    },
    clearStore: () =>
        set({
            data: {
                product_id: null,
                quantity: null,
                unit_price: null
            },
            loading: false,
            error: false,
            complete: false
        })
}))

export default useOfferFormStore
