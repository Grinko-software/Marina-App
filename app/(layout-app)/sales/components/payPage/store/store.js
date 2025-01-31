import { create } from 'zustand';
import { manageStoreConfig } from '@/stores/common/manage';
import { getMultiDataRequest, reMapData } from '../service';

const useStore = create(manageStoreConfig(getMultiDataRequest, reMapData));

export default useStore;
