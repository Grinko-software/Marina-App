import { DELETE, POST, getData } from '@/services/http';
import {
	CREATE_CATEGORIES_API_URL,
	DELETE_CATEGORIES
} from '@/settings/constants';
import { create } from 'zustand';

const useProductFormStore = create((set) => ({
	name: null,
	setName: (value) => set({ name: value }),
	error: null,
	loading: false,
	complete: false,
	setLoading: (value) => set({ loading: value }),
	setError: (value) => set({ error: value }),
	requestCreateCategory: (data, notify) => {
		set({ loading: true, error: null, complete: false });
		// has requered values
		const missingRequeredValues = !data;
		if (missingRequeredValues) {
			set({ loading: false, error: 'Rellena todos los campos necesarios' });
		}
		try {
			getData(CREATE_CATEGORIES_API_URL, POST, {
				name: data?.toString()
			}).then((response) => {
				set({ loading: false, complete: true });
				if (response?.code === 200) {
					notify('✅ Categoría creado con éxito!');
				} else {
					notify('❌ La categoría no fue creado con éxito, intenta otra vez!');
				}
			});
		} catch (err) {
			set({ loading: false, error: err, complete: true });
		}
	},
	deleteCategory: ({ id, notify, deleteAction }) => {
		set({ loading: true, error: null, complete: false });
		// has requered values
		try {
			getData(DELETE_CATEGORIES.replace(':id', id), DELETE).then((response) => {
				set({ loading: false, complete: true });
				if (response?.code === 200) {
					notify('✅ Categoría eliminada con éxito!');
					deleteAction();
				} else {
					notify(
						'❌ La categoría no fue eliminada con éxito, intenta otra vez!'
					);
				}
			});
		} catch (err) {
			set({ loading: false, error: err, complete: true });
		}
	},
	clearStore: () =>
		set({
			data: null,
			loading: false,
			error: false,
			complete: false
		})
}));

export default useProductFormStore;
