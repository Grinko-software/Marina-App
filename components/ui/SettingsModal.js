'use client'
import React from 'react'
import { Modal, Checkbox, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
/* import Barcode from "../barcode";
import BarcodeImg from "../barcodeImg";
import { generateProductCode } from "@/utils/barcode"; */

export default function SettingModal ({ isOpen, onClose }) {
    const [isSelected, setIsSelected] = React.useState(false)
    const [isSelected2, setIsSelected2] = React.useState(false)
    /*  const elementRef = createRef(null); */
    /*   const productName="COCA-COLA" */
    /*   const productCode = generateProductCode(productName); */

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
                                {/* <div ref= { elementRef }>
                <Barcode showDetail={true} productName = {productName} productCode ={ productCode } productCost={"1790"}></Barcode>
              </div> */}
                                <p className="text-primary-500 dark:text-primary-200">Al escanear un producto</p>
                                <Checkbox isSelected={isSelected} onClick={() => { setIsSelected(true); setIsSelected2(false) }} color="danger">
                se genera automaticamente una venta
                                </Checkbox>
                                <Checkbox isSelected={isSelected2} onClick={() => { setIsSelected(false); setIsSelected2(true) }} color="danger">
                se obtiene la informacion del producto
                                </Checkbox>
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
