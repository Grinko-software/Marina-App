'use client'
import React, { useState, useEffect } from 'react'
import { Modal, Checkbox, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from '@nextui-org/react'
import useSettingsStore, { DEFAULT_SELECTED } from './../../../stores/settings'
import useBoxStore from '@/stores/box'
// import { GetCashRegister, GetPostMachines } from './../../../services/settings'
/* import Barcode from "../barcode";
import BarcodeImg from "../barcodeImg";
import { generateProductCode } from "@/utils/barcode"; */

export default function SettingModal ({ isOpen, onClose }) {
    const [postMachinesData, setPostMachinesData] = useState(null)
    const [cashRegisterData, setCashRegisterData] = useState(null)
    const {
        selectedPostMachine,
        postMachines,
        setSelectedPostMachine,
        getPostMachines
    } = useSettingsStore(({
        selectedPostMachine,
        postMachines,
        setSelectedPostMachine,
        getPostMachines
    }) => ({
        selectedPostMachine,
        postMachines,
        setSelectedPostMachine,
        getPostMachines
    }))

    const {
        CashRegister,
        SelectedCashRegister,
        setSelectedCashRegister,
        getCashRegister
    } = useBoxStore(({
        CashRegister,
        SelectedCashRegister,
        setSelectedCashRegister,
        getCashRegister
    }) => ({
        CashRegister,
        SelectedCashRegister,
        setSelectedCashRegister,
        getCashRegister
    }))

    useEffect(() => {
        if (postMachines) {
            setPostMachinesData([DEFAULT_SELECTED, ...postMachines])
        }
    }, [postMachines])
    /* Handle unique request */
    useEffect(() => {
        if (CashRegister) {
            setCashRegisterData([DEFAULT_SELECTED, ...CashRegister])
        }
    }, [CashRegister])

    useEffect(() => {
        // TODO: Add multi data fetch
        getPostMachines()
        getCashRegister()
    }, [])
    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200 font-extrabold">CONFIGURACIÓN</ModalHeader>
                            <ModalBody>
                                <p className="text-primary-500 dark:text-primary-200 font-bold">Seleccionar TUU principal</p>
                                {postMachinesData?.map((item, index) => {
                                    const isSelected = selectedPostMachine?.ID === item.ID
                                    return (
                                        <Checkbox
                                            key={index}
                                            isSelected={isSelected}
                                            onClick={() => { setSelectedPostMachine(item) }}
                                            color="danger">
                                            {item?.serial_number || item?.label}
                                        </Checkbox>
                                    )
                                }
                                )

                                }
                                <Divider />
                                <div className="flex flex-col gap-2">
                                    <p className="text-primary-500 dark:text-primary-200 font-bold">
                                        Seleccionar Caja principal
                                    </p>
                                    {cashRegisterData?.map((cashRegister, index2) => {
                                        const isCashRegistrySelected = SelectedCashRegister?.ID === cashRegister.ID
                                        return (
                                            <Checkbox
                                                key={index2}
                                                isSelected={isCashRegistrySelected}
                                                onClick={() => { setSelectedCashRegister(cashRegister) }}
                                                color="danger">
                                                {cashRegister?.name || cashRegister?.label}
                                            </Checkbox>
                                        )
                                    })}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button className ="dark" onClick={onClose}>
                                    Aceptar
                                </Button>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Cerrar
                                </Button>
                                {/*  <div>
              <BarcodeImg elementRef = { elementRef }></BarcodeImg>
              </div> */}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
