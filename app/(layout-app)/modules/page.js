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
		<section className="h-full max-h-full flex">
			<Auth />
			<section className="flex-1 h-full">
				<Modules />
			</section>
		</section>
	);
}
