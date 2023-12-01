'use client'
import React, { useEffect } from 'react'
import { Modal, Checkbox, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import useSettingsStore from './../../../stores/settings'
import { GetPostMachines } from './../../../services/settings'
/* import Barcode from "../barcode";
import BarcodeImg from "../barcodeImg";
import { generateProductCode } from "@/utils/barcode"; */

export default function SettingModal ({ isOpen, onClose }) {
    const [postMachinesData, setPostMachinesData] = React.useState(null)
    const {
        SelectedPostMachine,
        PostMachines,
        setPostMachines,
        setSelectedPostMachine
    } = useSettingsStore()

    const requestData = async () => {
        const [data] = await Promise.all([GetPostMachines()])
        console.log(data)
        setPostMachines(data?.data)
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
        console.log(SelectedPostMachine)
    }, [SelectedPostMachine])

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
                                    const isSelected = SelectedPostMachine?.ID === item.ID
                                    return (
                                        <Checkbox
                                            key={index}
                                            isSelected={isSelected}
                                            onClick={() => { setSelectedPostMachine(item) }}
                                            color="danger">
                                            {item.serial_number}
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
                                    Close
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
