/* eslint-disable no-unused-vars */
import { getData, POST } from '@/services/http';
import { toPng } from 'html-to-image';
import { PRINTER_BARCODE_API_URL } from '@/settings/constants';

export const printBarCode = (inputRef, onSuccessful, notify) => {
	BarcodeImg({ elementRef: inputRef, onSuccessful, notify });
};

export default function BarcodeImg({ elementRef, onSuccessful, notify }) {
	const htmlToImageConvert = () => {
		toPng(elementRef.current, { cacheBust: false })
			.then((dataUrl) => {
				sendPrintToPrinter(dataUrl, onSuccessful, notify);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return htmlToImageConvert();
}
export const sendPrintToPrinter = (imgBase64, onSuccessful, notify) => {
	try {
		getData(PRINTER_BARCODE_API_URL, POST, { barcode: imgBase64 }, true).then(
			(response) => {
				if (response?.code === 200) {
					notify('✅ Código impreso con éxito!');
				} else {
					notify('❌ Error al imprimir!');
				}
				onSuccessful();
			}
		);
	} catch (err) {
		notify('❌ Error al imprimir!');
		onSuccessful();
	}
};

export const productCreated = ({ listInventory, code }) => {
	const result = listInventory.find((item) => item?.code === code);
	return result;
};
