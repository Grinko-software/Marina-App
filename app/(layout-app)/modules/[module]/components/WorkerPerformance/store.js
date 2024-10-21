import { create } from 'zustand'
import { requestTaskList } from './service'

const useFilterStore = create((set) => ({
    data: null,
    loading: false,
    totalpage: undefined,
    setLoading: (value) => set({ loading: value }),
    requestData: ({ taskTypeId, taskStateId, userId }) => {
        try {
            set({ loading: true })
            setTimeout(() => {
                requestTaskList({ taskTypeId: null, taskStateId: null, userId: null }).then((data) => {
                    set({
                        data: data?.data
                    })
                }).catch((error) => {
                    console.debug(error)
                })
                set({ loading: false })
            }, [2000])
        } catch (e) {
            set({ loading: false })
        }
    }
}))

export default useFilterStore
