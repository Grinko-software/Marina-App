import { create } from 'zustand'
import { manageStoreConfig } from '@/stores/common/manage'
import { getMultiDataRequest, reMapData } from '../services'

const useStore = create(manageStoreConfig(getMultiDataRequest, reMapData))

export default useStore
