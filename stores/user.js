import { authenticate } from '@/utils/authSettings'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
const useAuthStore = create(
    persist(
        (set) => ({
            name: null,
            lastName: null,
            fullName: null,
            isAdmin: false,
            token: null,
            email: null,
            loading: false,
            error: null,
            idUser: null,
            setToken: () => set((state) => ({ token: state })),
            setEmail: () => set((state) => ({ email: state })),
            setError: () => set((state) => ({ error: state })),
            signIn: ({ email, password }) => {
                set({ loading: true, error: null })
                try {
                    authenticate(
                        {
                            email,
                            password
                        }
                    ).then(({ user, statusCode, statusText, error, message }) => {
                        if (user.token) {
                            const { name, lastName, userType, token, idUser } = user
                            set({
                                name,
                                lastName,
                                fullName: name + ' ' + lastName,
                                email,
                                token,
                                isAdmin: userType === 'admin',
                                idUser,
                                error: null
                            })
                            if (userType === 'admin') set({ isAdmin: true })
                        } else {
                            set({ error: statusCode + ' ' + (error || message || statusText) })
                        }
                        set({ loading: false })
                    })
                } catch {
                    set({ loading: false })
                }
            },
            signOut: () => {
                set({
                    name: null,
                    lastName: null,
                    fullName: null,
                    isAdmin: false,
                    token: null,
                    email: null,
                    loading: false,
                    error: null,
                    idUser: null
                })
            }
        }),
        {
            name: 'user'
        }
    )
)

export default useAuthStore
