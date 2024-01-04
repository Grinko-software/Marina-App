'use client'
import React, { useEffect } from 'react'
import { Modal, Checkbox, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import useSettingsStore, { DEFAULT_SELECTED } from './../../../stores/settings'
/* import Barcode from "../barcode";
import BarcodeImg from "../barcodeImg";
import { generateProductCode } from "@/utils/barcode"; */

export default function SettingModal ({ isOpen, onClose }) {
    const [postMachinesData, setPostMachinesData] = React.useState(null)
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

    useEffect(() => {
        if (postMachines) {
            setPostMachinesData([DEFAULT_SELECTED, ...postMachines])
        }
    }, [postMachines])
    /* Handle unique request */
    useEffect(() => {
        getPostMachines()
    }, [])
    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Atajos</ModalHeader>
                            <ModalBody>
                                <p className="text-primary-500 dark:text-primary-200">Seleccionar TUU principal</p>
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
