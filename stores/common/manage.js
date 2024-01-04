export const manageStoreConfig = (requestData, reMapData) => (set, get) => {
    const defaultState = {
        error: null,
        loading: false,
        data: null
    }

    return {
        ...defaultState,
        cleanup: () => {
            set({
                error: null,
                loading: false,
                data: null
            })
        },
        getData: () => {
            set({ loading: true })
            try {
                requestData().then((results) => {
                    set({ data: reMapData(results), loading: false })
                }
                )
            } catch (error) {
                set({ error, loading: false })
            }
        },
        set: (params) => {
            set(params)
        },
        setLoading: (loading) => {
            set({ loading })
        },
        triggerAction: () => {
            set({ loading: true })
            try {
                requestData().then((results) => {
                    set({ data: reMapData(results), loading: false })
                }
                )
            } catch (error) {
                set({ error, loading: false })
            }
        }
    }
}
