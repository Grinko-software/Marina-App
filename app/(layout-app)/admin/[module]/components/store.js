import { create } from 'zustand'

const useAdminStore = create((set) => ({
    isAuthenticated: undefined
}))

export default useAdminStore
