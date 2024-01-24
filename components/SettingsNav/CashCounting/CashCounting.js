/* eslint-disable no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox } from '@nextui-org/react'
import credit from '@/assets/images/credit.jpeg'
import cash from '@/assets/images/cash.jpeg'
import PaymentOfMoney from '@/assets/images/paymentOfMoney.jpeg'
import CashReconciliationCard from '../../ui/CashReconciliationCard'
import QR from '@/assets/gifs/QR.json'
import Lottie from 'lottie-react'
import useCashBalanceStore from '../store'
import { getCashRegister } from '@/services/cashRegister'
const CashCounting = ({ isOpen, onClose, setStatusCashRegister }) => {
    const [isSelected, setIsSelected] = useState()
    const [readQR, setReadQR] = useState(false)
    const [indicatorsBalanceEnding, setIndicatorsBalanceEnding] = useState(null)
    const [moneyOnCash, setMoneyOnCash] = useState(0)
    const [diffMoney, setDiffMoney] = useState(0)

    const { getIndicatorsBalanceEnding } = useCashBalanceStore(({ getIndicatorsBalanceEnding }) => ({ getIndicatorsBalanceEnding }))
    useEffect(() => {
        setReadQR(false)
    }, [])
    useEffect(() => {
        const idCashRegister = getCashRegister()?.ID
        getIndicatorsBalanceEnding(idCashRegister, setIndicatorsBalanceEnding)
    }, [])
    useEffect(() => {
        if (moneyOnCash) {
            const diff = moneyOnCash - (indicatorsBalanceEnding?.total_beginning ?? 0)
            setDiffMoney(diff)
        }
    }, [moneyOnCash])
    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'4xl'} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">CIERRE DE CAJA</ModalHeader>
                            <ModalBody>
                                {!readQR
                                    ? <div className=" space-y-12">
                                        <div className='flex flex-row w-full space-x-4'>
                                            <CashReconciliationCard
                                                title={'Ventas en Debito/Credito'}
                                                total={indicatorsBalanceEnding?.total_sales_card ?? '-'}
                                                bgTitle={'bg-black/40'}
                                                img={credit}
                                                detail={'Total de ingresos en tarjetas de debito/credito del dia'}
                                            />
                                            <CashReconciliationCard
                                                title={'Ventas en Efectivo'}
                                                total={indicatorsBalanceEnding?.total_sales_cash ?? '-'}
                                                bgTitle={'bg-green-500/80'}
                                                img={cash}
                                                detail={'Total de ingresos en efectivo del dia'}
                                            />
                                            <CashReconciliationCard
                                                title={'Egresos/pagos'}
                                                total={indicatorsBalanceEnding?.total_drawals ?? '-'}
                                                bgTitle={'bg-green-500/20'}
                                                img={PaymentOfMoney}
                                                detail={'Total de egresos de caja diarios (pagos)'}
                                            />
                                        </div>
                                        <Input
                                            size='lg'
                                            isRequired={true}
                                            type="number"

                                            label={
                                                <span className=" uppercase font-bold text-lg text-black dark:text-white ">Cantidad de dinero en caja</span>
                                            }
                                            placeholder="0"
                                            labelPlacement="outside"
                                            startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">$</span>
                                                </div>
                                            }
                                            onValueChange={(value) => { setMoneyOnCash(value) }}
                                        />
                                        <Input
                                            size='lg'
                                            isDisabled
                                            isRequired={false}
                                            type="number"
                                            label={
                                                <span className=" uppercase font-bold text-lg text-black dark:text-white ">Saldo pendiente</span>
                                            }
                                            placeholder="0"
                                            labelPlacement="outside"
                                            startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">$</span>
                                                </div>
                                            }
                                            value={diffMoney}

                                        />
                                        <div className="flex flex-col">
                                            <Checkbox
                                                isSelected={isSelected}
                                                color="danger"
                                                onValueChange={setIsSelected}>
                                                Aceptar
                                            </Checkbox>
                                            <p className="text-default-500 italic">
                                            Al hacer clic en Aceptar, confirmo que revisé y aprobé los cálculos de cierre de caja.
                                            Esta acción representa mi conformidad con la precisión de las transacciones y la cantidad de efectivo en la caja.
                                            </p>
                                        </div>
                                    </div>
                                    : <Lottie animationData={QR} loop={true} />
                                }
                            </ModalBody>
                            <ModalFooter className='justify-center'>
                                <Button variant="shadow" className =" bg-green-500 text-primary-50 w-[12rem] h-[4rem] text-2xl font-extrabold "
                                    onClick={() => {
                                        // setIsInit(false)
                                        console.log('Llamar el cierre de caja')
                                    }}>
                                    ACEPTAR
                                </Button>
                                <Button color="danger" variant="shadow" className="w-[12rem] h-[4rem] text-2xl font-extrabold" onClick={() => {
                                    setReadQR(false)
                                    onClose()
                                }}>
                                    CANCELAR
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
export default CashCounting
