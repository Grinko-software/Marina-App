import { create } from 'zustand';
import {
	requestCredentialAssociationList,
	requestCredentialList
} from './service';

const useCredentialStore = create((set) => ({
	data: undefined,
	associationData: undefined,
	loading: false,
	requestData: async () => {
		set({ loading: true });
		await requestCredentialList()
			.then((data) => {
				set({ data: data?.data });
			})
			.catch((error) => {
				console.debug(error);
			});

		await requestCredentialAssociationList()
			.then((data) => {
				set({ associationData: data?.data });
			})
			.catch((error) => {
				console.debug(error);
			});
		set({ loading: false });
	}
}));

export default useCredentialStore;
