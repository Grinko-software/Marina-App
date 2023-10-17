/* eslint-disable camelcase */
import { create } from 'zustand'

const hubScale = create(
    (set) => ({
        connect: null,
        isConnected: null,
        setIsConnected: (value) => set({ isConnected: value })
    }),
    {
        name: 'hub'
    }

)

export default hubScale
