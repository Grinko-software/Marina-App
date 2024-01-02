'use client'
import React, { useEffect } from 'react'
import { Modal, Checkbox, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from '@nextui-org/react'
import useSettingsStore, { DEFAULT_SELECTED } from './../../../stores/settings'
import { GetCashRegister, GetPostMachines } from './../../../services/settings'
/* import Barcode from "../barcode";
import BarcodeImg from "../barcodeImg";
import { generateProductCode } from "@/utils/barcode"; */

export default function SettingModal ({ isOpen, onClose }) {
    const [postMachinesData, setPostMachinesData] = React.useState(null)
    const [cashRegisterData, setCashRegisterData] = React.useState(null)
    const {
        SelectedPostMachine,
        PostMachines,
        setPostMachines,
        setSelectedPostMachine,

        SelectedCashRegister,
        CashRegister,
        setCashRegister,
        setSelectedCashRegister
    } = useSettingsStore()

    const requestData = async () => {
        const [data, cashRegister] = await Promise.all([GetPostMachines(), GetCashRegister()])
        setPostMachines(data?.data)
        setCashRegister(cashRegister?.data)
    }

    useEffect(() => {
        requestData()
    }, [])

    useEffect(() => {
        if (PostMachines) {
            setPostMachinesData(PostMachines)
        }
    }, [PostMachines])

    useEffect(() => {
        if (CashRegister) {
            setCashRegisterData(CashRegister)
        }
    }, [cashRegisterData])

    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200 font-extrabold">CONFIGURACION</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-primary-500 dark:text-primary-200 font-bold">Seleccionar TUU principal</p>
                                        {[DEFAULT_SELECTED, ...postMachinesData]?.map((item, index) => {
                                            const isSelected = SelectedPostMachine?.ID === item.ID
                                            return (
                                                <Checkbox
                                                    key={index}
                                                    isSelected={isSelected}
                                                    onClick={() => { setSelectedPostMachine(item) }}
                                                    color="danger">
                                                    {item?.serial_number || item?.label}
                                                </Checkbox>
                                            )
                                        })}
                                    </div>
                                    <Divider />
                                    <div className="flex flex-col gap-2">
                                        <p className="text-primary-500 dark:text-primary-200 font-bold">
                                        Seleccionar Caja principal
                                        </p>
                                        {[...cashRegisterData]?.map((cashRegister, index2) => {
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
