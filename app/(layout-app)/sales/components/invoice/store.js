/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { CUSTOMER_API_URL, CREATE_CUSTOMER } from '@/settings/constants'
import { fetchPost } from '@/services/sales'
import { fetchGet } from '@/services/products'

const useInvoiceStore = create(
    (set) => ({
        defaultForm: {
            businessName: null,
            businessLine: null,
            rut: null,
            code: null,
            phone: null,
            region: null,
            commune: null,
            province: null,
            legalRepresentative: null,
            email: null,
            address: null
        },
        targetCustomer: null,
        loading: false,
        error: null,
        complete: false,
        setTargetCustomer: (value) => set({ targetCustomer: value }),
        setFormData: (newData) => set({ defaultForm: { ...newData } }),
        setLoading: (value) => set({ loading: value }),
        setError: (value) => set({ error: value }),
        customers: [],
        setCustomers: (customers) => set({ customers }),
        create: (customer, notify, setTargetCustomer) => {
            const dataBody = {
                business_name: customer?.businessName ?? '-',
                business_line: customer?.businessLine ?? '-',
                rut: customer?.rut ?? '-',
                code: customer?.rut ?? '-',
                phone: customer?.phone ?? '-',
                region: customer?.region ?? 'Elqui',
                commune: customer?.commune ?? 'Coquimbo',
                province: customer?.commune ?? 'Coquimbo',
                legal_representative: customer?.legalRepresentative ?? '-',
                email: customer?.email ?? '-',
                address: customer?.address ?? '-'
            }
            try {
                fetchPost(CREATE_CUSTOMER, dataBody).then(result => {
                    // Get result from DTEMITE
                    if (result?.data === 'registry created successfully') {
                        notify('✅ Cliente creado exitosamente')
                        setTargetCustomer(dataBody)
                    } else if (result?.error || result?.data === null) {
                        notify('❌ El cliente no fue creado con éxito, intenta otra vez!')
                    }
                    set({ loadingSale: false })
                })
            } catch {
                set({ loadingSale: false })
            }
        },
        getCustomers: () => {
            try {
                fetchGet({ url: CUSTOMER_API_URL }).then(result => {
                    // Get result from DTEMITE
                    if (result?.data) {
                        console.log(result)
                        set({
                            customers: result?.data?.map((e) => {
                                return {
                                    meta: e?.business_name + ' ' + e?.rut, ...e
                                }
                            })
                        })
                    }
                    set({ loadingSale: false })
                })
            } catch {
                set({ loadingSale: false })
            }
        }

    }),
    {
        name: 'invoice'
    }

)

export default useInvoiceStore
