/* eslint-disable camelcase */
import { create } from 'zustand'

const MachineStore = create(
    (set) => ({
        status: null,
        setStatus: (value) => set({ status: value })
    }),
    {
        name: 'hub'
    }

)

export default MachineStore
