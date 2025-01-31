/* eslint-disable no-unused-vars */
'use client';
import React, {
	Suspense,
	createRef,
	useEffect,
	useMemo,
	useState
} from 'react';
import {
	Button,
	Divider,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	dropdown,
	useDisclosure
} from '@nextui-org/react';
import useStore from './store';
import { isMobileDevice } from '@/utils/agent';
import { FaTruck } from 'react-icons/fa';
import { notify } from '@/services/notify';

export default function CreateSupplier() {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [isMobile, setIsMobile] = useState(true);
	const {
		name,
		setName,
		nameCompany,
		setNameCompany,
		rut,
		setRut,
		rutCompany,
		setRutCompany,
		error,
		requestCreate,
		clearStore,
		complete
	} = useStore();

	useEffect(() => {
		if (navigator) {
			const view = isMobileDevice();
			setIsMobile(view);
		}
	}, []);

	useEffect(() => {
		if (complete && !error) {
			clearStore();
			onClose();
		}
	}, [complete, error]);
	return (
		<section>
			<header className="flex justify-end">
				<Button
					className="bg-emerald-600 dark:bg-emerald-600 font-semibold"
					color="primary"
					onClick={onOpen}
					startContent={<FaTruck size={25} />}
				>
					{isMobile ? '' : 'CREAR PROVEEDOR'}
				</Button>
			</header>
			<Modal
				size={'4xl'}
				isOpen={isOpen}
				backdrop="opaque"
				onClose={() => onClose}
				scrollBehavior={'inside'}
				closeButton={<></>}
				id="modal-supplier"
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">
						Nuevo proveedor
					</ModalHeader>
					<ModalBody>
						<section className="mt-3 grid grid-cols-2">
							<div className="p-4 flex items-center">
								<Input
									autoFocus={true}
									type="text"
									value={name}
									variant={'underlined'}
									label={'Nombre PROVEEDOR'}
									labelPlacement={'outside'}
									placeholder={'Ingrese el nombre del proveedor'}
									onValueChange={(value) => {
										setName(value);
									}}
								/>
							</div>
							<div className="p-4 flex items-center">
								<Input
									type="text"
									value={rut}
									variant={'underlined'}
									label={'RUT PROVEEDOR'}
									labelPlacement={'outside'}
									placeholder={'Ingrese el RUT del proveedor'}
									onValueChange={(value) => {
										setRut(value);
									}}
								/>
							</div>
							<div className="p-4 flex items-center">
								<Input
									type="text"
									value={nameCompany}
									variant={'underlined'}
									label={'Nombre EMPRESA'}
									labelPlacement={'outside'}
									placeholder={'Ingrese el nombre de la empresa asociada'}
									onValueChange={(value) => {
										setNameCompany(value);
									}}
								/>
							</div>
							<div className="p-4 flex items-center">
								<Input
									type="text"
									value={rutCompany}
									variant={'underlined'}
									label={'RUT EMPRESA'}
									labelPlacement={'outside'}
									placeholder={'Ingrese el RUT de la empresa asociada'}
									onValueChange={(value) => {
										setRutCompany(value);
									}}
								/>
							</div>
						</section>
					</ModalBody>
					<ModalFooter>
						{error ? (
							<div className="flex mx-5 self-center">
								<h1>{error}</h1>
							</div>
						) : null}
						<Button
							className=" bg-green-500 text-primary-50"
							onClick={() => {
								requestCreate(name, rut, nameCompany, rutCompany, notify);
							}}
						>
							Crear
						</Button>
						<Button
							color="danger"
							variant="flat"
							onClick={() => {
								onClose();
								clearStore();
							}}
						>
							Cerrar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</section>
	);
}
