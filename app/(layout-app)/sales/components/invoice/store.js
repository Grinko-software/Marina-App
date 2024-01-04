/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand'
import { CUSTOMER_API_URL, CREATE_CUSTOMER } from '@/settings/constants'
import { getData, GET, POST } from '@/services/http'
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
        loadingCustomer: false,
        error: null,
        complete: false,
        setTargetCustomer: (value) => set({ targetCustomer: value }),
        setFormData: (newData) => set({ defaultForm: { ...newData } }),
        setLoadingCustomer: (value) => set({ loadingCustomer: value }),
        setError: (value) => set({ error: value }),
        customers: [],
        setCustomers: (customers) => set({ customers }),
        create: (customer, notify, setTargetCustomer, getCustomers) => {
            set({ loadingCustomer: true })
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
                getData(CREATE_CUSTOMER, POST, dataBody).then((result) => {
                    // Get result from DTEMITE
                    if (result?.data === 'registry created successfully') {
                        notify('✅ Cliente creado exitosamente')
                        setTargetCustomer(dataBody)
                        getCustomers()
                    } else if (result?.error || result?.data === null) {
                        notify('❌ El cliente no fue creado con éxito, intenta otra vez!')
                    }
                    set({ loadingCustomer: false })
                }
                ).catch((error) => {
                    console.debug(error)
                    set({ loadingCustomer: false })
                })
            } catch (error) { console.error(error) }
        },
        triggetgetCustomers: () => {
            set({ loading: true, error: null })
            try {
                getData(CUSTOMER_API_URL, GET).then((result) => {
                    set({ loadingCustomer: true })
                    if (result?.data) {
                        set({
                            customers: result?.data?.map((e) => {
                                return {
                                    meta: e?.business_name + ' ' + e?.rut, ...e
                                }
                            })
                        })
                    }
                    set({ loadingCustomer: false })
                }
                ).catch((error) => {
                    console.debug(error)
                    set({ loadingCustomer: false })
                })
            } catch (error) { console.error(error) }
        },
        getCustomers: (result) => {
            set({ loadingCustomer: true })
            if (result?.data) {
                set({
                    customers: result?.data?.map((e) => {
                        return {
                            meta: e?.business_name + ' ' + e?.rut, ...e
                        }
                    })
                })
            }
            set({ loadingCustomer: false })
        }

    }),
    {
        name: 'invoice'
    }

)

export default useInvoiceStore
/*
 try {
                fetchPost(CREATE_CUSTOMER, dataBody).then(result => {
                    // Get result from DTEMITE
                    if (result?.data === 'registry created successfully') {
                        notify('✅ Cliente creado exitosamente')
                        setTargetCustomer(dataBody)
                        getCustomers()
                    } else if (result?.error || result?.data === null) {
                        notify('❌ El cliente no fue creado con éxito, intenta otra vez!')
                    }
                    set({ loadingCustomer: false })
                })
            } catch {
                set({ loadingCustomer: false })
            }
*/
