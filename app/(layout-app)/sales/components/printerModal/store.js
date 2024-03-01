/* eslint-disable camelcase */
import { fetchPrinterSaleTicket } from '@/services/printer'
import { create } from 'zustand'

const salePrintStore = create(
    (set) => ({
        printBodyLastSale: null,
        setPrintBodyLastSale: (value) => set({ printBodyLastSale: value }),
        requestPrintSale: ({ printBodyLastSale = null }) => {
            try {
                if (printBodyLastSale) fetchPrinterSaleTicket({ data: printBodyLastSale })
                set({ printBodyLastSale: null })
            } catch {
                return null
            }
        },
        cancelPrintSale: () => set({ printBodyLastSale: null })
    }),
    {
        name: 'salePrint'
    }

)

export default salePrintStore
