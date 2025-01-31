import { create } from 'zustand';
import {
	requestGetAssociationSupplier,
	requestSupplierList,
	requestUpdateAssociationSupplier
} from './service';

const useSupplierStore = create((set) => ({
	data: undefined,
	loading: false,
	requestData: async () => {
		set({ loading: true });
		const [data] = await Promise.all([requestSupplierList()]);
		if (data) {
			set({ data: data?.data });
		}
		set({ loading: false });
	},
	requestSupplierDetail: async ({ supplierId }) => {
		const [data] = await Promise.all([
			requestGetAssociationSupplier({ supplierId })
		]);
		return undefined || data;
	},
	requestUpdateSupplierAssociation: async ({ supplierId, productsId }) => {
		const [data] = await Promise.all([
			requestUpdateAssociationSupplier({ supplierId, ids: productsId })
		]);
		return undefined || data;
	}
}));

export default useSupplierStore;
