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
import useSettingsStore from '@/stores/settings'
import { getCashRegister } from '@/services/cashRegister'
import { getIdUser } from '@/services/account'
import { toast } from 'react-hot-toast'
import { formatterNumber } from '@/utils/number'
import useAuthStore from '@/stores/user'
import { today } from '@/utils/date'
import ScannerCredential from '@/components/ScannerCredential/ScannerCredential'
import useScannerStore from '@/stores/scanner'
const CashCounting = ({ isOpen, onClose, setStatusCashRegister }) => {
    const notify = (text) => toast(text)
    const [isSelected, setIsSelected] = useState()
    const [readQR, setReadQR] = useState(false)
    const [userAuthData, setUserAuthData] = useState(null)
    const [indicatorsBalanceEnding, setIndicatorsBalanceEnding] = useState(null)
    const [moneyOnCash, setMoneyOnCash] = useState(0)
    const [moneyNominalOnCash, setMoneyNominalOnCash] = useState(0)
    const [diffMoney, setDiffMoney] = useState(0)
    const [totalEndingCard, setTotalEndingCard] = useState(null)
    const [detail, setDetail] = useState(null)
    const { setDisabled } = useSettingsStore(({ setDisabled }) => ({ setDisabled }))
    const { getIndicatorsBalanceEnding, createBalanceEndings, openDrawer } = useCashBalanceStore(({ getIndicatorsBalanceEnding, createBalanceEndings, openDrawer }) => ({ getIndicatorsBalanceEnding, createBalanceEndings, openDrawer }))
    const { /* enabledScanner, disabledScanner, */ disabledAuthMode } = useScannerStore()
    const onhandlerAcctions = () => {
        // Disable to go to modules
        setDisabled(true)
        setReadQR(false)
        onClose()
    }
    /* handler permission with qr */
    const onHandlerAuth = () => {
        setReadQR(true)
    }
    const handlerOpenDrawer = () => {
        const { fullName } = useAuthStore.getState()
        const body = {
            event_type: 'Cierre de caja', date: today().format('DD-MM-YYYY HH:mm:ss'), cash_registry_name: getCashRegister()?.name, user_name: fullName
        }
        openDrawer(getCashRegister()?.ID, notify, body)
    }

    useEffect(() => {
        setReadQR(false)
    }, [])
    const onSuccess = (data) => {
        setUserAuthData(data)
        createBalanceEndings(getCashRegister()?.ID, getIdUser(), detail, moneyOnCash, moneyNominalOnCash, totalEndingCard, setStatusCashRegister, onhandlerAcctions, notify)
    }
    const closeModal = () => {
        disabledAuthMode()
        setReadQR(false)
        onClose()
        setMoneyOnCash(0)
    }

    useEffect(() => {
        const idCashRegister = getCashRegister()?.ID
        getIndicatorsBalanceEnding(idCashRegister, setIndicatorsBalanceEnding, handlerOpenDrawer)
    }, [])
    useEffect(() => {
        if (moneyOnCash) {
            // TODO falta agregar el indicators balance ending de ingreso a caja
            const diff = moneyOnCash - (indicatorsBalanceEnding?.total_beginning ?? 0) - (indicatorsBalanceEnding?.total_sales_cash ?? 0) - (indicatorsBalanceEnding?.total_drawals ?? 0)
            setDiffMoney(diff)
            setDiffMoney(diff)
        }
    }, [moneyOnCash])
    useEffect(() => {
        if (indicatorsBalanceEnding) {
            setTotalEndingCard(indicatorsBalanceEnding?.total_sales_card)
        }
    }, [indicatorsBalanceEnding])
    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'4xl'} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">CIERRE DE CAJA</ModalHeader>
                            {!readQR
                                ? <section>
                                    <ModalBody>
                                        <div className=" space-y-12">
                                            <div className='flex flex-row w-full space-x-4'>
                                                <CashReconciliationCard
                                                    title={'Ventas en Debito/Credito'}
                                                    total={indicatorsBalanceEnding?.total_sales_card ? formatterNumber(indicatorsBalanceEnding?.total_sales_card) : '-'}
                                                    bgTitle={'bg-black/40'}
                                                    img={credit}
                                                    detail={'Total de ingresos en tarjetas de debito/credito del dia'}
                                                />
                                                <CashReconciliationCard
                                                    title={'Ventas en Efectivo'}
                                                    total={indicatorsBalanceEnding?.total_sales_cash ? formatterNumber(indicatorsBalanceEnding?.total_sales_cash) : '-'}
                                                    bgTitle={'bg-green-500/80'}
                                                    img={cash}
                                                    detail={'Total de ingresos en efectivo del dia'}
                                                />
                                                <CashReconciliationCard
                                                    title={'Retiros de caja'}
                                                    total={indicatorsBalanceEnding?.total_drawals ? formatterNumber(indicatorsBalanceEnding?.total_drawals) : '-'}
                                                    bgTitle={'bg-green-500/20'}
                                                    img={PaymentOfMoney}
                                                    detail={'Total de egresos de caja diarios (pagos)'}
                                                />
                                            </div>
                                            <Input
                                                size="lg"
                                                min={0}
                                                type="number"
                                                label={
                                                    <span className=" uppercase font-bold text-lg text-black dark:text-white ">Cantidad de dinero real en caja</span>
                                                }
                                                labelPlacement="outside"
                                                placeholder={'0'}
                                                startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <span className="text-default-400 text-small">$</span>
                                                    </div>
                                                }
                                                onValueChange={(value) => { if (value) { setMoneyOnCash(parseFloat(value)) } }}
                                            />
                                            <Input
                                                size="lg"
                                                min={0}
                                                type="number"
                                                label={
                                                    <span className=" uppercase font-bold text-lg text-black dark:text-white ">Cantidad de dinero nominal en caja</span>
                                                }
                                                labelPlacement="outside"
                                                placeholder={'0'}
                                                startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <span className="text-default-400 text-small">$</span>
                                                    </div>
                                                }
                                                onValueChange={(value) => { if (value) { setMoneyNominalOnCash(parseFloat(value)) } }}
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
                                    </ModalBody>
                                    <ModalFooter className='justify-center'>
                                        <Button variant="shadow" className =" bg-green-500 text-primary-50 w-[12rem] h-[4rem] text-2xl font-extrabold "
                                            onClick={() => {
                                                // onHandlerCreateBalanceEnding()
                                                onHandlerAuth()
                                            }}>
                                    ACEPTAR
                                        </Button>
                                        <Button isDisabled={!isSelected} color="danger" variant="shadow" className="w-[12rem] h-[4rem] text-2xl font-extrabold" onClick={() => {
                                            setReadQR(false)
                                            onClose()
                                        }}>
                                    CANCELAR
                                        </Button>
                                    </ModalFooter>
                                </section>
                                : (<section>
                                    <ModalBody>

                                        <ScannerCredential onSuccess={onSuccess} changeSession={false} requireAdmin={true} withoutDelay={true}/>
                                        {userAuthData?.fullName}
                                    </ModalBody>
                                    <ModalFooter className='justify-center'>
                                        <Button variant="shadow" className =" bg-gray-500 text-primary-50 w-[12rem] h-[4rem] text-2xl font-extrabold "
                                            onClick={() => {
                                                setReadQR(false)
                                            }}>
                                    Volver
                                        </Button>
                                        <Button color="danger" variant="shadow" className="w-[12rem] h-[4rem] text-2xl font-extrabold" onClick={() => {
                                            closeModal()
                                        }}>
                                    CANCELAR
                                        </Button>
                                    </ModalFooter>
                                </section>)}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
export default CashCounting
