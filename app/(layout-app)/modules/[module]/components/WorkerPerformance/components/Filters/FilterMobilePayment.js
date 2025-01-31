/* eslint-disable no-unused-vars */
'use client';
import React from 'react';
import { BiMoney } from 'react-icons/bi';
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure
} from '@nextui-org/react';
import ContentFilterPayment from './components/ContentFilterPayment';
export default function FilterMobilePayment({ users }) {
	const { isOpen, onClose, onOpen } = useDisclosure();
	return (
		<>
			<Button
				className="bg-emerald-600 dark:bg-emerald-600 font-semibold uppercase"
				color="primary"
				onClick={() => {
					// add section
					onOpen();
				}}
				startContent={<BiMoney size={25} />}
			>
				{'Filtrar'}
			</Button>
			<Modal
				isOpen={isOpen}
				backdrop="opaque"
				placement={'top'}
				onClose={() => onClose}
				scrollBehavior={'inside'}
				closeButton={<></>}
				id="modal-task-evidence"
				className="h-full "
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">
						Filtrar
					</ModalHeader>
					<div className="max-h-[calc(100vh-16rem)] overflow-y-scroll flex flex-col items-center justify-center w-full px-6 gap-10">
						{/* Coomment */}
						<ContentFilterPayment
							users={users}
							isMobile={true}
							onClose={onClose}
						/>
					</div>
				</ModalContent>
			</Modal>
		</>
	);
}
