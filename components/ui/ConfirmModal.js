import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input
} from '@nextui-org/react'
import {
    deleteProduct,
    /* deleteProduct, */ updateProduct
} from '@/services/products'
import { notify } from '@/services/notify'

export default function ConfirmModal (props) {
    const {
        product,
        type,
        setLoadingDelete,
        setTargetProduct,
        handleProductRequest,
        listInventory,
        targeProduct,
        onCloseTargetModal,
        setConfirm,
        setLoadingEdit,
        setEdit,
        newProductData
    } = props
    const [productData, setProductData] = useState(product)
    const [openModal, setOpenModal] = useState(false)
    const { onClose } = useDisclosure()
    const [value, setValue] = React.useState('')
    const [invalid, setInvalid] = React.useState(false)

    const target = () => {
        const newValue = value
        if (
            (newValue === productData?.name && productData !== undefined) ||
			type === 'Editar'
        ) {
            setInvalid(true)
            if (type === 'Eliminar') {
                const productId = targeProduct?.id
                setLoadingDelete(false)
                deleteProduct({ id: productId, notify }).then((response) => {
                    setTargetProduct(null)
                    handleProductRequest(false, listInventory)
                    onClose()
                    onCloseTargetModal()
                })
            } else {
                if (type === 'Editar') {
                    const productId = targeProduct?.id
                    try {
                        updateProduct({ id: productId, ...newProductData, notify }).then(
                            (response) => {
                                setLoadingEdit(false)
                                setEdit(false)
                                setTargetProduct(null)
                                onClose()
                                handleProductRequest(false, listInventory)
                            }
                        )
                    } catch (err) {
                        setConfirm(false)
                        setLoadingEdit(false)
                        setEdit(false)
                        setTargetProduct(null)
                        onClose()
                    }
                }
            }
        } else {
            setInvalid(true)
        }
    }

    const close = () => {
        target()
        setOpenModal(false)
        setLoadingDelete(false)
        setLoadingEdit(false)
        setConfirm(false)
        onClose(true)
        onCloseTargetModal(true)
    }

    const handleDelete = () => {
        // Para tipo "Editar", solo ejecutar la acción
        if (type === 'Editar') {
            setInvalid(false)
            close()
            return
        }

        // Para tipo "Eliminar", validar el nombre del producto
        if (type === 'Eliminar') {
            const isValid = value === productData?.name

            if (!isValid) {
                // Nombre no coincide - marcar como inválido y no continuar
                setInvalid(true)
                return
            }

            // Nombre válido - proceder con la eliminación
            setInvalid(false)
            close()
        }
    }

    useEffect(() => {
        setOpenModal(true)
        setProductData(product)
    }, [])

    // Reset invalid state when user types
    useEffect(() => {
        if (value && invalid) {
            setInvalid(false)
        }
    }, [value])

    return (
        <Modal
            backdrop="opaque"
            isOpen={openModal}
            radius="2xl"
            classNames={{
                body: 'py-6',
                backdrop: 'backdrop-opacity-75',
                base: `${
                    type === 'Eliminar'
                        ? 'border-[#C70039] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]'
                        : 'border-[#ffd700] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]'
                }`,
                header: `${
                    type === 'Eliminar'
                        ? 'border-b-[1px] border-[#C70039]'
                        : ' border-b-[1px] border-[#ffd700]'
                }`,
                footer: `${
                    type === 'Eliminar'
                        ? 'border-t-[1px] border-[#C70039]'
                        : 'border-t-[1px] border-[#ffd700]'
                }`,
                closeButton: 'hover:bg-white/5 active:bg-white/10'
            }}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 font-bold items-center">
                    {type} producto
                </ModalHeader>
                <ModalBody>
                    {type === 'Eliminar'
                        ? (
                            <div className="flex flex-col justify-between mx-10 gap-4">
                                <p>
								Se eliminara el producto:
                                    <p className="font-bold">{product?.name}</p>
                                </p>
                                <p>Para confirmar, debes ingresar el nombre del producto</p>
                                <Input
                                    classNames={'max-w-xs'}
                                    isInvalid={invalid}
                                    color={invalid ? 'danger' : ''}
                                    errorMessage={invalid && 'Respuesta invalida'}
                                    isRequired
                                    type="text"
                                    label="Producto"
                                    placeholder={product?.name}
                                    onValueChange={setValue}
                                />
                            </div>
                        )
                        : (
                            <div className="flex flex-col justify-between mx-10 gap-4">
                                <p>
								Se modificara el producto:
                                    <p className="font-bold">{product?.name}</p>
                                </p>
                                <p>¿Esta seguro que desea modificar el producto?</p>
                            </div>
                        )}
                </ModalBody>
                <ModalFooter className="justify-center">
                    <Button color="foreground" variant="light" onPress={close}>
						Cancelar
                    </Button>
                    <Button
                        color={`${type === 'Eliminar' ? 'danger' : 'warning'}`}
                        className="shadow-lg shadow-indigo-500/20"
                        onPress={handleDelete}
                    >
						Aceptar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
