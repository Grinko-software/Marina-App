import { getData, POST } from '@/services/http';
import {
	PRINTER_SUPPLIER_TICKET_API_URL,
	PRINTER_TICKET_API_URL
} from '@/settings/constants';
import { today } from '@/utils/date';
import { formatNumberWithPoints } from '@/utils/number';
import { notify } from './notify';
import { getFullNameUser } from './account';
import { getCashRegisterName } from './cashRegister';
import salePrintStore from '@/app/(layout-app)/sales/components/printerModal/store';

export const VOUCHER_TYPE = {
	VOUCHER: 'voucher',
	INVOICE: 'invoice',
	TICKET: 'ticket'
};

export const generateDataToPrinterSaleTicket = ({
	saleType,
	datetime,
	folioNumber,
	total,
	discountOffers,
	discountExtra,
	stamp,
	totalTaxFree,
	totalNet,
	iva,
	cardDetail,
	customerDetail,
	products,
	userName,
	cashRegisterName,
	openCashRegister = false
}) => {
	const discountTotal = (discountOffers || 0) + (discountExtra || 0);
	const seller = (userName || getFullNameUser() || '').toUpperCase();
	const cashRegister = (
		cashRegisterName ||
		getCashRegisterName() ||
		''
	).toUpperCase();
	const data = {
		datetime: (datetime || today()).format('DD-MM-YYYY HH:mm:ss'),
		paymentType: saleType || VOUCHER_TYPE.TICKET,
		voucherNumber: formatNumberWithPoints(folioNumber || null) || null,
		stamp: stamp || null,
		total: formatNumberWithPoints(total, ''),
		discountOffers: formatNumberWithPoints(discountOffers || null, null),
		totalTaxFree: formatNumberWithPoints(totalTaxFree || null, null),
		totalNet: formatNumberWithPoints(totalNet, ''),
		iva: formatNumberWithPoints(iva, ''),
		cardDetail: cardDetail || null,
		discountExtra: formatNumberWithPoints(discountExtra || null, null),
		discountTotal: formatNumberWithPoints(discountTotal || null, null),
		customerDetail: customerDetail || null,
		productList: products?.map((item) => {
			return {
				name: item?.product?.name || item?.name,
				quantity: item?.quantity?.toString(),
				discount: formatNumberWithPoints(item?.discount || null, null),
				total: formatNumberWithPoints(item?.total, '')
			};
		}),
		userName: seller,
		cashRegisterName: cashRegister,
		openCashRegister
	};

	try {
		return data;
	} catch {
		return null;
	}
};
export const saveDataToPrinterSaleTicket = async ({
	saleType,
	datetime,
	folioNumber,
	total,
	discountOffers,
	discountExtra,
	stamp,
	totalTaxFree,
	totalNet,
	iva,
	cardDetail,
	customerDetail,
	products,
	userName,
	cashRegisterName,
	openCashRegister = false
}) => {
	const data = generateDataToPrinterSaleTicket({
		saleType,
		datetime,
		folioNumber,
		total,
		discountOffers,
		discountExtra,
		stamp,
		totalTaxFree,
		totalNet,
		iva,
		cardDetail,
		customerDetail,
		products,
		userName,
		cashRegisterName,
		openCashRegister
	});

	const setPrintBodyLastSale = salePrintStore.getState().setPrintBodyLastSale;

	try {
		setPrintBodyLastSale(data);
	} catch {
		return null;
	}
};

export const fetchPrinterSaleTicket = async ({ data }) => {
	try {
		return getData(`${PRINTER_TICKET_API_URL}`, POST, data, true).then(
			(response) => {
				try {
					if (response?.code !== 200) {
						notify('❌ Ocurrió un error al imprimir la boleta.');
					}
				} catch {
					notify('❌ Ocurrió un error al imprimir la boleta.');
					return null;
				}
			}
		);
	} catch {
		return null;
	}
};

export const fetchPrinterSupplierTicket = async ({
	datetime,
	products,
	providerName,
	providerRut,
	companyName,
	companyRut
}) => {
	const data = {
		datetime: (datetime || today()).format('DD-MM-YYYY HH:mm:ss'),
		provider: {
			name: providerName || '',
			rut: providerRut || '',
			company_name: companyName || '',
			company_rut: companyRut || ''
		},
		products: products?.map((item) => {
			return {
				name: item?.product?.name || item?.name,
				request: item?.request
			};
		})
	};

	try {
		return getData(`${PRINTER_SUPPLIER_TICKET_API_URL}`, POST, data, true).then(
			(response) => {
				try {
					if (response?.code !== 200) {
						notify('❌ Ocurrió un error al imprimir el ticket de proveedor.');
					}
				} catch {
					notify('❌ Ocurrió un error al imprimir el ticket de proveedor.');
					return null;
				}
			}
		);
	} catch {
		return null;
	}
};
