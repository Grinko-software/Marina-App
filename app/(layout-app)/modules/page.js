'use client';
import Auth from '@/app/auth';
import { Modules } from './components/modules';
import useScannerStore from '@/stores/scanner';
import { useEffect } from 'react';

export default function Administration() {
	useEffect(() => {
		useScannerStore.getState()?.disabledScanner();
	}, []);

	return (
		<>
			<Auth />
			<Modules />
		</>
	);
}
