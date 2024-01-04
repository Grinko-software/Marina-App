import { create } from 'zustand'

const useScannerStore = create(
    (set) => ({
        datetimeLastScan: null,
        scanFromInputUnits: null,
        msRangeScan: 800,
        enabledSetUnits: true,
        scannerEnabled: false,
        authModeEnabled: false,
        enabledRedirect: false,
        enabledScanner: (value) => set({ scannerEnabled: true, enabledRedirect: false }),
        disabledScanner: (value) => set({ scannerEnabled: false }),
        enabledRedirectSales: (value) => set({ enabledRedirect: true }),
        disabledRedirectSales: (value) => set({ enabledRedirect: false }),
        enabledAuthMode: (value) => set({ scannerEnabled: false, enabledRedirect: false, authModeEnabled: true }),
        disabledAuthMode: (value) => set({ scannerEnabled: true, enabledRedirect: false, authModeEnabled: false }),

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
