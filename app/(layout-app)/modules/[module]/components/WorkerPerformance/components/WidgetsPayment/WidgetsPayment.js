/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
'use client';
import React, { useEffect, useState } from 'react';
import { BiMoney, BiPlusCircle } from 'react-icons/bi';

import useFilterStorePayment from '../Filters/storePayment';
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
export default function WidgetsPayment() {
	const [isEditPrice, setIsEditPrice] = useState(false);
	const { isOpen, onClose, onOpen } = useDisclosure();
	const {
		totalPayment,
		totalStar,
		data,
		sendToPay,
		setNewPriceStar,
		newPriceStar,
		updatePriceStar,
		selectionUser,
		fromDate,
		toDate,
		requestData,
		priceStar,
		getPriceForStar
	} = useFilterStorePayment();

	const onChangeValue = (event) => {
		setNewPriceStar(event.target.value);
	};

	const handlePay = async () => {
		const response = await sendToPay({ listPayments: data });
		console.log(response);
		requestData({ userId: selectionUser, fromDate, toDate });
		onClose();
	};
	const handleEditPrice = async () => {
		const response = await updatePriceStar(newPriceStar);
		console.log(response);
		getPriceForStar();
		if (selectionUser && fromDate && toDate) {
			requestData({ userId: selectionUser, fromDate, toDate });
		}
		onClose();
	};
	useEffect(() => {
		getPriceForStar();
	}, []);
	return (
		<div className="flex flex-col gap-2">
			<Button
				className="bg-yellow-600 dark:bg-yellow-600 font-semibold uppercase"
				color="primary"
				onClick={() => {
					// add section
					onOpen();
					setIsEditPrice(true);
				}}
				startContent={<BiPlusCircle size={25} />}
			>
				{priceStar + ' Editar precio por estrella'}
			</Button>
			{totalPayment && totalStar && (
				<>
					<Button
						className="bg-blue-600 dark:bg-blue-600 font-semibold uppercase"
						color="primary"
						onClick={() => {
							// add section
							onOpen();
							setIsEditPrice(false);
						}}
						startContent={<BiMoney size={25} />}
					>
						{totalPayment + ' a pagar'}
					</Button>
				</>
			)}
			<Modal
				isOpen={isOpen}
				backdrop="opaque"
				placement={'top'}
				onClose={() => onClose}
				scrollBehavior={'inside'}
				closeButton={<></>}
				className="h-full md:h-auto "
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">
						{isEditPrice ? 'Editar precio actual' : 'Pago de tareas'}
					</ModalHeader>
					<div className="max-h-[calc(100vh-16rem)] overflow-y-scroll flex flex-col items-center justify-center w-full p-6 gap-10">
						{isEditPrice ? (
							<>
								<Input
									label="Busqueda"
									autoFocus
									isClearable
									radius="lg"
									type="number"
									onChange={onChangeValue}
									classNames={{
										label: 'text-black/50 dark:text-white/90',
										input: [
											'bg-transparent',
											'text-black/90 dark:text-white/90',
											'placeholder:text-default-700/50 dark:placeholder:text-white/60'
										],
										innerWrapper: 'bg-transparent'
									}}
									className="w-full"
									placeholder="Ingresar precio por estrella"
								/>
								<div className="flex flex-row gap-2 w-full">
									<Button
										className="bg-red-600 dark:bg-red-600 font-semibold uppercase w-full"
										color="danger"
										onClick={() => {
											onClose();
										}}
									>
										cancelar
									</Button>
									<Button
										className="bg-green-600 dark:bg-green-600 font-semibold uppercase w-full"
										color="primary"
										onClick={() => {
											// add section
											handleEditPrice();
										}}
									>
										{'Editar precio '}
									</Button>
								</div>
							</>
						) : (
							<>
								<p>
									{' '}
									{'Estás seguro de pagar ' +
										totalPayment +
										' por un total de ' +
										totalStar +
										' estrellas' +
										'?'}
								</p>
								<div className="flex flex-row gap-2 w-full">
									<Button
										className="bg-red-600 dark:bg-red-600 font-semibold uppercase w-full"
										color="danger"
										onClick={() => {
											onClose();
										}}
									>
										cancelar
									</Button>
									<Button
										className="bg-green-600 dark:bg-green-600 font-semibold uppercase w-full"
										color="primary"
										onClick={() => {
											// add section
											handlePay();
										}}
									>
										{' Acepto pagar ' + totalPayment}
									</Button>
								</div>
							</>
						)}
					</div>
				</ModalContent>
			</Modal>
		</div>
	);
}
