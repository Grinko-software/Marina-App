/* eslint-disable no-unused-vars */
import useInventoryStore from '@/app/(layout-app)/inventory/store';
import useSalesStore from '@/app/(layout-app)/sales/store';
import useOffersStore from '@/stores/offers';
import useScannerStore from '@/stores/scanner';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ScannerDetection() {
	const [detected, setDetected] = useState(true);
	const [scanner, setScanner] = useState(null);
	const router = useRouter();
	const { addFromNewSales, units, setUnits } = useSalesStore();
	const {
		scannerEnabled,
		enabledRedirect,
		authModeEnabled,
		authModeFunction,
		msRangeScan,
		setDatetimeLastScan,
		getMillisecondsSinceLastScan
	} = useScannerStore();

	useEffect(() => {}, [units]);

	const addProduct = ({ code }) => {
		const currentListSales = useSalesStore.getState().listSales;
		const enabledRedirectSales = useScannerStore.getState().enabledRedirect;
		const units = useSalesStore.getState().units;
		const offers = useOffersStore.getState().offers;
		const listSalesActives = useSalesStore.getState().listSalesActives;
		const saleIdActive = useSalesStore.getState().saleIdActive;

		const product = useInventoryStore
			.getState()
			.getProductByCode(useInventoryStore.getState().listInventory, code);

		if (product) {
			if (enabledRedirectSales) {
				router.push('/sales');
			}
			addFromNewSales(listSalesActives, saleIdActive, product, units, offers);
		} else {
			alert(`El producto ${code} no ha sido encontrado.`);
		}
	};

	const onCompleteScanMode = (barcode) => {
		// check avaible scan
		const ms = getMillisecondsSinceLastScan(
			useScannerStore.getState().datetimeLastScan
		);
		useScannerStore.getState().disableSetUnits();

		if (!ms || ms > msRangeScan) {
			// for units input

			if (useScannerStore.getState().scanFromInputUnits) {
				addProduct({ code: barcode });
				// waiting real units value
			} else {
				addProduct({ code: barcode });
			}

			// get current status from store
			setDatetimeLastScan();
		}
		setTimeout(() => {
			setUnits(1);
			useScannerStore.getState().enableSetUnits();
		}, 100);
	};

	const onCompleteAuthMode = (barcode) => {
		const ms = getMillisecondsSinceLastScan(
			useScannerStore.getState().datetimeLastScan
		);
		if (!ms || ms > msRangeScan) {
			setDatetimeLastScan();
			console.log(`Auth code: ${barcode}`);
			if (useScannerStore.getState().authModeFunction)
				useScannerStore.getState().authModeFunction(barcode);
		}
	};

	const onCompleteScanner = (barcode) => {
		const authMode = useScannerStore.getState().authModeEnabled;
		if (authMode) {
			onCompleteAuthMode(barcode);
		} else {
			onCompleteScanMode(barcode);
		}
	};

	const onError = (value) => console.log(value); // Devolución de llamada después de la detección de un escaneo fallido
	const stopPropagation = (value) => console.log(value); // Detiene la propagación inmediata en el evento de pulsación de tecla

	async function startScanning(options) {
		if (typeof window !== 'undefined') {
			import('js-scanner-detection').then(({ default: ScannerDetector }) => {
				const scannerDetector = new ScannerDetector(options);
				setScanner(scannerDetector);
			});
		}
	}

	useEffect(() => {
		console.log(
			'redirect: ',
			enabledRedirect,
			' scanner: ',
			scannerEnabled,
			' authMode: ',
			authModeEnabled
		);

		// disabled scanner
		if (scanner !== null) {
			scanner?.stopScanning();
			setScanner(null);
			console.log('Stop scanner');
		}

		if (scannerEnabled || enabledRedirect || authModeEnabled) {
			console.log('New scanner');

			const options = {
				onComplete: onCompleteScanner,
				onError
				// timeBeforeScanTest: 3000,
				// avgTimeByChar: 3000
				// preventDefault: true,
				// stopPropagation: true
			};

			startScanning(options);
		} else {
			/*       if (scanner) {
                scanner?.stopScanning()
                setScanner(null)
            } */
		}
	}, [detected, scannerEnabled, enabledRedirect, authModeEnabled]);

	return (
		<section>
			{/*             <Button onClick={() => { detected ? setDetected(false) : setDetected(true) }} >{'Detectar scanner: ' + (detected ? 'ACTIVADO' : 'DESACTIVADO')}</Button>
			 */}{' '}
		</section>
	);
}
