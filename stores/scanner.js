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
        authModeFunction: null,
        enabledScanner: () => set({ scannerEnabled: true, enabledRedirect: false, authModeEnabled: false }),
        disabledScanner: () => set({ scannerEnabled: false, enabledRedirect: false, authModeEnabled: false }),
        enabledRedirectSales: () => set({ enabledRedirect: true }),
        disabledRedirectSales: () => set({ enabledRedirect: false }),
        enabledAuthMode: (funcValue) => {
            set({ enabledRedirect: false, authModeEnabled: true, authModeFunction: funcValue })
        },
        disabledAuthMode: () => set({ enabledRedirect: false, authModeEnabled: false, authModeFunction: null }),

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
