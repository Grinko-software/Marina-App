import { authenticate, authenticateByAuthCode } from '@/utils/authSettings'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { setToken } from '@/services/account'
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
            errorAuthCode: null,
            setToken: (value) => {
                set({ token: value })
            },
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
                            const { name, lastName, userType, token, idUser, password } = user
                            // set global ls
                            setToken(token)
                            set({
                                name,
                                lastName,
                                fullName: name + ' ' + lastName,
                                email,
                                isAdmin: userType === 'admin',
                                idUser,
                                error: null,
                                password
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
            signInWithCode: async ({ authCode }) => {
                let ok = false
                set({ loading: true, error: null, errorAuthCode: null })
                try {
                    await authenticateByAuthCode(
                        {
                            authCode
                        }
                    ).then(({ user, statusCode, statusText, error, message }) => {
                        if (user.token) {
                            const { name, lastName, token, userType, idUser, email } = user
                            setToken(token)
                            set({
                                name,
                                lastName,
                                fullName: name + ' ' + lastName,
                                email,

                                isAdmin: userType === 'admin',
                                idUser,
                                error: null
                            })
                            if (userType === 'admin') set({ isAdmin: true })
                            ok = true
                        } else {
                            set({ error: statusCode + ' ' + (error || message || statusText) })
                            if (statusCode === 401) {
                                set({ errorAuthCode: 'Credencial no autorizada' })
                            }
                        }
                        set({ loading: false })
                    })
                } catch {
                    set({ loading: false })
                }

                return ok
            },
            getUserDataWithCode: async ({ authCode, requireAdmin }) => {
                let resultData = null
                try {
                    await authenticateByAuthCode(
                        {
                            authCode
                        }
                    ).then(({ user, statusCode, statusText, error, message }) => {
                        if (user.token) {
                            const { name, lastName, userType, idUser } = user
                            const isAdmin = userType === 'admin'
                            if (!requireAdmin || (requireAdmin && isAdmin)) {
                                resultData = {
                                    name,
                                    lastName,
                                    fullName: name + ' ' + lastName,
                                    isAdmin,
                                    id: idUser
                                }
                            }
                        }
                    })
                } catch (error) {
                    console.error(error)
                }

                return resultData
            },
            signOut: () => {
                localStorage.clear()
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
