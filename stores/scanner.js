import { create } from 'zustand'

const useScannerStore = create(
    (set) => ({
        datetimeLastScan: null,
        scanFromInputUnits: null,
        msRangeScan: 800,
        enabledSetUnits: true,
        setScanFromInputUnits: () => set((state) => ({ scanFromInputUnits: state })),
        disableSetUnits: () => set({ enabledSetUnits: false }),
        enableSetUnits: () => set({ enabledSetUnits: true }),
        setDatetimeLastScan: () => {
            const now = Date.now()
            set({ datetimeLastScan: now })
        },
        getMillisecondsSinceLastScan: (datetimeLastScan) => {
            if (datetimeLastScan) {
                const millis = Date.now() - datetimeLastScan
                return millis
            } else {
                return undefined
            }
        }
    }),
    {
        name: 'scanner'
    }

)

export default useScannerStore
