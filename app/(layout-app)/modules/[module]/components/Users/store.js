import { create } from 'zustand'
import { requestUserList } from './service'

const useUsersStore = create((set) => ({
    data: undefined,
    loading: false,
    requestData: () => {
        set({ loading: true })
        requestUserList()
            .then((data) => {
                set({ data: data?.data })
            })
            .catch((error) => {
                console.debug(error)
            })
        set({ loading: false })
    }
}))

export default useUsersStore
