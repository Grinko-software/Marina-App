'use client';
import { useDisclosure } from '@nextui-org/react';
// import { useRouter } from 'next/navigation'
import { CiBarcode } from 'react-icons/ci';
import ScanProductModal from '@/components/ui/ScanProductModal';

export function ScanProduct() {
	// const router = useRouter()
	const { onOpen, isOpen, onClose } = useDisclosure();
	return (
		<button
			aria-label="Toggle Dark Mode"
			type="button"
			className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700 animation-fade-in"
			onClick={onOpen}
		>
			<CiBarcode className="w-6 h-6 sm:w-10 sm:h-10 cursor-pointer fill-primary-500 dark:fill-primary-300" />
			<ScanProductModal isOpen={isOpen} onClose={onClose} />
		</button>
	);
}
