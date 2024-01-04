import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GET_POST_MACHINE } from '@/settings/constants'
import { GET } from '@/services/http'
export const DEFAULT_SELECTED = { ID: 'no-select', label: 'NINGUNA' }

const useSettingsStore = create(
    persist(
        (set) => ({
            selectedPostMachine: DEFAULT_SELECTED,
            postMachines: null,
            error: null,
            loading: false,
            setPostMachines: (value) => set({ postMachines: value }),
            setSelectedPostMachine: (value) => set({ selectedPostMachine: value }),
            getPostMachines: (fetchData) => {
                set({ loading: true, error: null })
                try {
                    fetchData(GET_POST_MACHINE, GET).then((result) =>
                        console.log(result)
                    ).catch((error) => {
                        console.debug(error)
                        set({ loading: false })
                    })
                } catch (error) { console.error(error) }
            }
        }), {
            name: 'settings'
        }
    )
)
export default useSettingsStore
