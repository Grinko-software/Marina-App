'use client';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import ScannerDetection from '@/components/ScannerDetection/ScannerDetection';
import Toast from '@/components/Toast/Toast';
export function Providers({ children }) {
	return (
		<ThemeProvider attribute="class">
			<NextUIProvider>
				<ScannerDetection />
				<Toast />
				{children}
			</NextUIProvider>
		</ThemeProvider>
	);
}
