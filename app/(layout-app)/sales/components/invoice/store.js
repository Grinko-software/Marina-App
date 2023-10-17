/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { GET_DOCUMENT_DTEMITE, SALE_TICKET_CREATE } from '@/settings/constants'
import { fetchGet } from '@/services/sales'

const useInvoiceStore = create(
    (set) => ({
        customers: [],
        setCustomers: (customers) => set({ customers })

    }),
    {
        name: 'invoice'
    }

)

export default useInvoiceStore
