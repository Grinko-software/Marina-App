import { getToken } from '@/services/user'
import { CREATE_CATEGORIES_API_URL } from '@/settings/constants'
import { create } from 'zustand'

const useProductFormStore = create((set) => ({
    name: null,
    setName: (value) => set({ name: value }),
    error: null,
    loading: false,
    complete: false,
    setLoading: (value) => set({ loading: value }),
    setError: (value) => set({ error: value }),
    requestCreateCategory: async (data, notify) => {
        set({ loading: true, error: null, complete: false })
        // has requered values
        const missingRequeredValues = !data
        if (missingRequeredValues) {
            set({ loading: false, error: 'Rellena todos los campos necesarios' })
            return
        }
        try {
            await fetch(CREATE_CATEGORIES_API_URL,
                {
                    method: 'POST',
                    cache: 'no-store',
                    body: JSON.stringify({
                        name: data?.toString()
                    }),
                    headers: { Authorization: 'Bearer ' + getToken() }
                })
                .then(response => {
                    try {
                        return response.json()
                    } catch {
                        set({ error: response?.statusText })
                        return undefined
                    }
                }).then(response => {
                    set({ loading: false, complete: true })
                    if (response?.code === 200) {
                        notify('✅ Categoría creado con éxito!')
                    } else {
                        notify('❌ La categoría no fue creado con éxito, intenta otra vez!')
                    }
                })
        } catch (err) {
            set({ loading: false, error: err, complete: true })
        }
    },
    clearStore: () => set({
        data: null,
        loading: false,
        error: false,
        complete: false
    })
}))

export default useProductFormStore
