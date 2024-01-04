import { create } from 'zustand'
import { requestCreateSupplier } from '../service'

const useSupplierFormStore = create((set) => ({
    name: null,
    rut: null,
    nameCompany: null,
    rutCompany: null,
    setName: (value) => set({ name: value }),
    setRut: (value) => set({ rut: value }),
    setNameCompany: (value) => set({ nameCompany: value }),
    setRutCompany: (value) => set({ rutCompany: value }),
    error: null,
    loading: false,
    complete: false,
    setLoading: (value) => set({ loading: value }),
    setError: (value) => set({ error: value }),
    requestCreate: async (name, rut, nameCompany, rutCompany, notify) => {
        set({ loading: true, error: null, complete: false })
        // has requered values
        const missingRequeredValues = !name || !rut || !nameCompany || !rutCompany
        if (missingRequeredValues) {
            set({ loading: false, error: 'Rellena todos los campos necesarios' })
            return
        }
        try {
            const [data] = await Promise.all([requestCreateSupplier({ name, rut, companyName: nameCompany, companyRut: rutCompany })])
            set({ loading: false, error: null, complete: true })
            if (data?.code === 200) {
                notify('✅ Proveedor creado con éxito!')
            } else {
                notify('❌ El proveedor no fue creado con éxito, intenta otra vez!')
            }
        } catch (err) {
            set({ loading: false, error: err, complete: true })
        }
    },
    clearStore: () => set({
        name: null,
        rut: null,
        nameCompany: null,
        rutCompany: null,
        loading: false,
        error: false,
        complete: false
    })
}))

export default useSupplierFormStore
