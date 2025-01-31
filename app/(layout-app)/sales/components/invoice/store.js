/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { create } from 'zustand';
import { CUSTOMER_API_URL, CREATE_CUSTOMER } from '@/settings/constants';
import { getData, GET, POST } from '@/services/http';
const useInvoiceStore = create(
	(set) => ({
		defaultForm: {
			businessName: { value: null, error: null },
			businessLine: { value: null, error: null },
			rut: { value: null, error: null },
			code: { value: null, error: null },
			phone: { value: null, error: null },
			region: { value: null, error: null },
			commune: { value: null, error: null },
			province: { value: null, error: null },
			legalRepresentative: { value: null, error: null },
			email: { value: null, error: null },
			address: { value: null, error: null }
		},
		targetCustomer: null,
		loadingCustomer: false,
		error: null,
		complete: false,
		setTargetCustomer: (value) => set({ targetCustomer: value }),
		setFormData: (newData) => {
			// console.log(newData)
			set({ defaultForm: { ...newData } });
		},
		setLoadingCustomer: (value) => set({ loadingCustomer: value }),
		setError: (value) => set({ error: value }),
		customers: [],
		setCustomers: (customers) => set({ customers }),
		create: (customer, notify, setTargetCustomer, getCustomers) => {
			set({ loadingCustomer: true });
			const dataBody = {
				business_name: customer?.businessName?.value ?? '-',
				business_line: customer?.businessLine?.value ?? '-',
				rut: customer?.rut?.value ?? '-',
				code: customer?.rut?.value ?? '-',
				phone: customer?.phone?.value ?? '-',
				region: customer?.region?.value ?? 'Elqui',
				commune: customer?.commune?.value ?? 'Coquimbo',
				province: customer?.commune?.value ?? 'Coquimbo',
				legal_representative: customer?.legalRepresentative?.value ?? '-',
				email: customer?.email?.value ?? '-',
				address: customer?.address?.value ?? '-'
			};

			try {
				getData(CREATE_CUSTOMER, POST, dataBody)
					.then((result) => {
						// Get result from DTEMITE
						if (result?.data === 'registry created successfully') {
							notify('✅ Cliente creado exitosamente');
							setTargetCustomer(dataBody);
							getCustomers();
						} else if (result?.error || result?.data === null) {
							notify(
								'❌ El cliente no fue creado con éxito, intenta otra vez!'
							);
						}
						set({ loadingCustomer: false });
					})
					.catch((error) => {
						console.debug(error);
						set({ loadingCustomer: false });
					});
			} catch (error) {
				console.error(error);
			}
		},
		triggetgetCustomers: () => {
			set({ loading: true, error: null });
			try {
				getData(CUSTOMER_API_URL, GET)
					.then((result) => {
						set({ loadingCustomer: true });
						if (result?.data) {
							set({
								customers: result?.data?.map((e) => {
									return {
										meta: e?.business_name + ' ' + e?.rut,
										...e
									};
								})
							});
						}
						set({ loadingCustomer: false });
					})
					.catch((error) => {
						console.debug(error);
						set({ loadingCustomer: false });
					});
			} catch (error) {
				console.error(error);
			}
		},
		getCustomers: (result) => {
			set({ loadingCustomer: true });
			if (result?.data) {
				set({
					customers: result?.data?.map((e) => {
						return {
							meta: e?.business_name + ' ' + e?.rut,
							...e
						};
					})
				});
			}
			set({ loadingCustomer: false });
		}
	}),
	{
		name: 'invoice'
	}
);

export default useInvoiceStore;
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
