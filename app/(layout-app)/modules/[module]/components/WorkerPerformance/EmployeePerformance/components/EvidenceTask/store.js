import { create } from 'zustand';
/* import { requestCreateTaskType } from '../service' */

const useStoreEvidenceStore = create((set) => ({
	data: {
		comment: null,
		image: null
	},
	error: null,
	loading: false,
	complete: false,
	setFormData: (newData) => set({ data: { ...newData } }),
	setComment: (newComment) => set({ comment: newComment }),
	setLoading: (value) => set({ loading: value }),
	setError: (value) => set({ error: value }),
	/*   requestCreate: async (name, notify) => {
        set({ loading: true, error: null, complete: false })
        // has requered values
        const missingRequeredValues = !name
        if (missingRequeredValues) {
            set({ loading: false, error: 'Rellena todos los campos necesarios' })
            return
        }
        try {
            const [data] = await Promise.all([requestCreateTaskType({ name })])
            set({ loading: false, error: null, complete: true })
            if (data?.code === 200) {
                notify('✅ Tipo de tarea creada con éxito!')
            } else {
                notify('❌ El tipo de tarea no fue creado con éxito, intenta otra vez!')
            }
        } catch (err) {
            set({ loading: false, error: err, complete: true })
        }
    }, */
	clearStore: () =>
		set({
			name: null,
			loading: false,
			error: false,
			complete: false
		})
}));

export default useStoreEvidenceStore;
