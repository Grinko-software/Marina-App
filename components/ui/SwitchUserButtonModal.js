'use client';
import React, { useState } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Tabs,
	Tab
} from '@nextui-org/react';
import ScannerCredential from '../ScannerCredential/ScannerCredential';
import LoginForm from '@/app/login/components/FormLogin';
import useScannerStore from '@/stores/scanner';

export default function SwitchUserModal({ isOpen, onClose }) {
	const { disabledAuthMode } = useScannerStore();

	const closeModal = () => {
		if (isOpen) {
			onClose();
			disabledAuthMode();
		}
	};
	const [selected, setSelected] = useState('qr');

	return (
		<>
			<div className="flex flex-wrap gap-3 w-max h-max"></div>
			<Modal backdrop="blur" isOpen={isOpen} onClose={closeModal} size={'4xl'}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 font-extrabold">
								CAMBIAR SESIÓN
							</ModalHeader>
							<ModalBody>
								<Tabs
									aria-label="Options"
									size="md"
									className="mx-auto"
									selectedKey={selected}
									onSelectionChange={setSelected}
								>
									<Tab key="qr" title="Credencial">
										<ScannerCredential
											changeSession={true}
											onSuccess={closeModal}
										/>
									</Tab>
									<Tab key="email" title="Correo">
										<LoginForm onSuccess={closeModal} />
									</Tab>
								</Tabs>
							</ModalBody>
							<ModalFooter className="justify-center">
								<Button
									color="danger"
									variant="shadow"
									className="w-[12rem] h-[4rem] text-2xl font-extrabold"
									onClick={() => {
										closeModal();
									}}
								>
									Cerrar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
