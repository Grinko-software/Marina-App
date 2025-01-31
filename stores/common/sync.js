import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { today } from '@/utils/date';
const useSyncStore = create(
	persist(
		(set) => ({
			lastUpdate: today().format('DD-MM-YYYY HH:mm:ss'),
			setLastUpdate: (lastUpdate) => set({ lastUpdate }),
			withImage: false,
			setWithImage: (withImage) => set({ withImage })
		}),
		{ name: 'sync' }
	)
);

export default useSyncStore;
