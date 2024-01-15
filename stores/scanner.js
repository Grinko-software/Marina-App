import { create } from 'zustand'

const useScannerStore = create(
    (set) => ({
        datetimeLastScan: null,
        datetimeLastUpdate: null,
        scanFromInputUnits: null,
        msRangeScan: 800,
        enabledSetUnits: true,
        scannerEnabled: false,
        authModeEnabled: false,
        enabledRedirect: false,
        authModeFunction: null,
        enabledScanner: () => set({ scannerEnabled: true, enabledRedirect: false, authModeEnabled: false }),
        disabledScanner: () => set({ scannerEnabled: false, enabledRedirect: false, authModeEnabled: false, datetimeLastUpdate: Date.now() }),
        enabledRedirectSales: () => set({ enabledRedirect: true, datetimeLastUpdate: Date.now() }),
        disabledRedirectSales: () => set({ enabledRedirect: false, datetimeLastUpdate: Date.now() }),
        enabledAuthMode: (funcValue) => {
            set({ /* enabledRedirect: false,  */ authModeEnabled: true, authModeFunction: funcValue })
        },
        disabledAuthMode: () => set({ /* enabledRedirect: false,  */authModeEnabled: false, authModeFunction: null, datetimeLastUpdate: Date.now() }),

        setScanFromInputUnits: () => set((state) => ({ scanFromInputUnits: state })),
        disableSetUnits: () => set({ enabledSetUnits: false, datetimeLastUpdate: Date.now() }),
        enableSetUnits: () => set({ enabledSetUnits: true, datetimeLastUpdate: Date.now() }),
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
