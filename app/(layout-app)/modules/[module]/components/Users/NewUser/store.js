import { create } from 'zustand'
import { requestCreateUser } from '../service'

const useSupplierFormStore = create((set) => ({
    name: null,
    lastName: null,
    email: null,
    password: null,
    setName: (value) => set({ name: value }),
    setLastName: (value) => set({ lastName: value }),
    setEmail: (value) => set({ email: value }),
    setPassword: (value) => set({ password: value }),
    error: null,
    loading: false,
    complete: false,
    setLoading: (value) => set({ loading: value }),
    setError: (value) => set({ error: value }),
    requestCreate: async (name, lastName, email, password, notify) => {
        set({ loading: true, error: null, complete: false })
        // has requered values
        const missingRequeredValues = !name || !lastName || !email || !password
        if (missingRequeredValues) {
            set({ loading: false, error: 'Rellena todos los campos necesarios' })
            return
        }
        try {
            const [data] = await Promise.all([
                requestCreateUser({ name, lastName, email, password })
            ])
            set({ loading: false, error: null, complete: true })
            if (data?.code === 200) {
                notify('✅ Usuario creado con éxito!')
            } else {
                notify('❌ El usuario no fue creado con éxito, intenta otra vez!')
            }
        } catch (err) {
            set({ loading: false, error: err, complete: true })
        }
    },
    clearStore: () =>
        set({
            name: null,
            lastName: null,
            email: null,
            password: null,
            loading: false,
            error: false,
            complete: false
        })
}))

export default useSupplierFormStore
