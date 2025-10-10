/* eslint-disable no-unused-vars */
'use client'
import { Scanner } from '@yudiel/react-qr-scanner'
import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from '@nextui-org/react'
import React, {
    useEffect
} from 'react'
import { FaCamera } from 'react-icons/fa'
import { productCreated } from '../services'
import useStore from '../../store'
import { notify } from '@/services/notify'

export const Camera = ({
    setOpenModal,
    setTargetProduct,
    resultCamera,
    setResultCamera
}) => {
    const { listInventory } = useStore()
    const { isOpen, onClose, onOpen } = useDisclosure()

    useEffect(() => {
        if (resultCamera) {
            console.log('Resultado Camara: ', resultCamera)
        }
    }, [resultCamera])
    return (
        <section>
            <header className="flex justify-end space-x-3">
                <Button
                    className="bg-amber-400 dark:bg-amber-400 font-semibold"
                    color="danger"
                    variant="bordered"
                    onPress={() => {
                        // setResultCamera(null)
                        onOpen()
                    }}
                    startContent={<FaCamera size={25} />}
                ></Button>
            </header>

            <Modal
                size={'3xl'}
                isOpen={isOpen}
                backdrop="blur"
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent className=" overflow-y-scroll">
                    <ModalHeader className="flex flex-col gap-1 text-center text-primary-500 dark:text-primary-200">
                        {'Escanear código'}
                    </ModalHeader>
                    <div className="flex flex-col items-center justify-center h-[20rem] w-full">
                        <div className="flex flex-col items-center justify-center h-[20rem] w-[20rem]">
                            <Scanner
                                enabled={true}
                                onScan={(text, result) => {
                                    if (text.length > 0) {
                                        const scannedCode = text[0].rawValue
                                        console.log(scannedCode)

                                        const findCode = productCreated({ listInventory, code: scannedCode })
                                        if (findCode) {
                                            notify('✅  Producto encontrado !')
                                            setTargetProduct(findCode)
                                            setOpenModal(false)
                                        } else {
                                            notify('❌ Este producto no se encuentra registrado!')
                                            setOpenModal(true)
                                        }
                                        onClose()
                                    }
                                }}
                                onError={(e) => console.log(e)}
                                formats={['aztec', 'code_128', 'code_39', 'code_93', 'codabar', 'databar', 'databar_expanded', 'databar_limited', 'data_matrix', 'dx_film_edge', 'ean_13', 'ean_8', 'itf', 'maxi_code', 'micro_qr_code', 'pdf417', 'upc_a', 'upc_e']}
                            />
                        </div>
                    </div>
                    <ModalFooter className="flex justify-between">
                        <Button
                            color="danger"
                            className="w-full"
                            onPress={() => {
                                setResultCamera(null)
                                setTargetProduct(null)
                                setTargetProduct(null)
                                onClose()
                            }}
                        >
                            {'Cerrar'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    )
}
export default Camera
