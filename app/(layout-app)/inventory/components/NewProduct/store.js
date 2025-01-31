import { CREATE_PRODUCT_API_URL } from '@/settings/constants';
import { create } from 'zustand';
import { getData, POST } from '@/services/http';
const useProductFormStore = create((set) => ({
	data: {
		name: null,
		barcode: null,
		image: null,
		cost_price: null,
		net_price: null,
		sale_price: null,
		category_id: null,
		stock_type_id: null,
		stock: null,
		stock_min: null,
		tax_free: null
	},
	error: null,
	loading: false,
	complete: false,
	setFormData: (newData) => set({ data: { ...newData } }),
	setLoading: (value) => set({ loading: value }),
	setError: (value) => set({ error: value }),
	requestCreateProduct: async (
		data,
		notify,
		handleProductRequest,
		withImage,
		listInventory
	) => {
		set({ loading: true, error: null, complete: false });

		// has requered values
		const missingRequeredValues =
			!data ||
			!data.name ||
			!data.barcode ||
			!data.category_id ||
			!data.stock_type_id ||
			!data.stock ||
			!data.net_price ||
			!data.cost_price;
		if (missingRequeredValues) {
			set({ loading: false, error: 'Rellena todos los campos necesarios' });
			return;
		}

		try {
			getData(CREATE_PRODUCT_API_URL, POST, {
				name: data.name?.toString(),
				cost_price: Math.trunc(data.cost_price),
				net_price: Math.trunc(data.net_price),
				sale_price: Math.trunc(data.sale_price),
				code: data.barcode?.toString(),
				image: data.image,
				product_categories_id: data.category_id,
				stock_types_id: data.stock_type_id,
				tax_free: data.tax_free,
				product_stock: {
					stock: data.stock,
					stock_min: data.stock_min
				}
			}).then((response) => {
				set({ loading: false, complete: true });
				if (response?.code === 200) {
					notify('✅ Producto creado con exito!');
					handleProductRequest(withImage, listInventory);
				} else {
					notify('❌ El producto no fue creado con exito, intenta otra vez!');
				}
			});
		} catch (err) {
			set({ loading: false, error: err, complete: true });
		}
	},
	clearStore: () =>
		set({
			data: {
				name: null,
				barcode: null,
				image: null,
				cost_price: null,
				net_price: null,
				category_id: null,
				stock_type_id: null,
				stock: null,
				stock_min: null,
				tax_free: null
			},
			loading: false,
			error: false,
			complete: false
		})
}));

export default useProductFormStore;
