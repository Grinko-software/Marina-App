/* eslint-disable camelcase */
import { PRINTER_HEALTH_URL } from '@/settings/constants'
import { create } from 'zustand'
import { getData, GET } from '@/services/http'
const hubPrint = create(
    (set) => ({
        connect: null,
        isConnectedPrint: false,
        setIsConnectedPrint: (value) => set({ isConnectedPrint: value }),
        handleHealthCheck: () => {
            try {
                return getData(`${PRINTER_HEALTH_URL}`, GET, null, true).then(
                    (response) => {
                        try {
                            if (response?.code === 200) {
                                set({ isConnectedPrint: true })
                            } else {
                                set({ isConnectedPrint: false })
                            }
                        } catch {
                            set({ isConnectedPrint: false })
                        }
                    }
                )
            } catch {
                return null
            }
        }
    }),
    {
        name: 'hub printer'
    }
)

export default hubPrint
