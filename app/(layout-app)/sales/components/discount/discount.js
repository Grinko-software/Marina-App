/* eslint-disable camelcase */
/* eslint-disable no-lone-blocks */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
    Slider,
    Divider,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Chip
} from '@nextui-org/react'

import useSalesStore from '../../store'
import AlertMessage from '@/components/ui/AlertMessage'

export const SectionInput = ({ title, children, showDivider, className }) => {
    return (
        <section className={'mt-3 space-y-2' + className}>
            {showDivider ? <Divider /> : null}
            <h3 className="text-medium pt-1">{title}</h3>
            <section className="space-y-3">{children}</section>
        </section>
    )
}

export default function Discount ({ openModal, setOpenModal, handleButton }) {
    const {
        listSalesActives,
        saleIdActive,
        addDiscountSale,
        removeDiscountSale
    } = useSalesStore()
    const [saleActive, setSaleActive] = useState(null)
    const [discount, setDiscount] = useState(null)
    const [messageError, setMessageError] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const discountShortcuts = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]

    const handleInputChange = (value) => {
        if (value >= 0 && value <= 100) {
            setSearchInput(value)
            setMessageError(null)
        } else {
            setMessageError('Ingrese un valor entre 0 a 100')
            setSearchInput('')
        }
    }

    const cleanForm = () => {
        setSearchInput('')
        setMessageError(null)
    }

    const createDiscount = () => {
        addDiscountSale(listSalesActives, saleIdActive, searchInput, cleanForm)
    }

    const removeDiscount = () => {
        removeDiscountSale(listSalesActives, saleIdActive)
    }

    useEffect(() => {
        const saleIndex = listSalesActives?.findIndex(
            (sale) => sale.id === saleIdActive
        )
        const saleActive = listSalesActives[saleIndex]
        setSaleActive(saleActive)
    }, [])

    useEffect(() => {
        setDiscount(saleActive?.discount)
    }, [saleActive])

    return (
        <Modal
            size="lg"
            isOpen={openModal}
            backdrop="opaque"
            scrollBehavior={'inside'}
            closeButton={<></>}
        >
            {saleActive ? (
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col items-center gap-2 pt-6 pb-3">
                                <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
									Agregar Descuento
                                </h5>
                                {discount && (
                                    <Chip color="warning" variant="flat" size="sm">
										Descuento actual: {discount}%
                                    </Chip>
                                )}
                            </ModalHeader>

                            <ModalBody className="gap-5 px-6">
                                <div className="flex items-center justify-center py-2">
                                    <span
                                        className={`text-7xl font-extrabold tracking-tight transition-colors ${
                                            searchInput ? 'text-green-500' : 'text-default-200'
                                        }`}
                                    >
                                        {searchInput ? `${searchInput}%` : '—'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-6 gap-2">
                                    {discountShortcuts.map((e, index) => (
                                        <Button
                                            key={index}
                                            variant={searchInput === e ? 'solid' : 'bordered'}
                                            color={searchInput === e ? 'success' : 'default'}
                                            size="sm"
                                            className="font-bold"
                                            onClick={() => handleInputChange(e)}
                                        >
                                            {e}%
                                        </Button>
                                    ))}
                                </div>

                                <Slider
                                    color="success"
                                    size="md"
                                    step={5}
                                    minValue={0}
                                    maxValue={100}
                                    marks={[
                                        { value: 25, label: '25%' },
                                        { value: 50, label: '50%' },
                                        { value: 75, label: '75%' }
                                    ]}
                                    value={searchInput || 0}
                                    className="w-full"
                                    onChangeEnd={(value) => handleInputChange(value)}
                                />

                                <Input
                                    type="number"
                                    variant="bordered"
                                    label="Valor personalizado"
                                    placeholder="0 – 100"
                                    min={0}
                                    max={100}
                                    value={searchInput === '' ? '' : String(searchInput)}
                                    onValueChange={(v) => handleInputChange(Number(v))}
                                    endContent={
                                        <span className="text-default-400 text-sm">%</span>
                                    }
                                />

                                {messageError && (
                                    <AlertMessage message={messageError} />
                                )}
                            </ModalBody>

                            <ModalFooter className="gap-3 pb-6">
                                <Button
                                    color="danger"
                                    variant="flat"
                                    className="flex-1"
                                    onClick={() => handleButton()}
                                >
									Cerrar
                                </Button>
                                {discount ? (
                                    <Button
                                        className="flex-1 bg-green-500 text-white"
                                        onClick={() => {
                                            handleButton()
                                            removeDiscount()
                                        }}
                                    >
										Quitar Descuento
                                    </Button>
                                ) : (
                                    <Button
                                        className="flex-1 bg-green-500 text-white"
                                        isDisabled={!searchInput || !!messageError}
                                        onClick={() => {
                                            handleButton()
                                            createDiscount()
                                        }}
                                    >
                                        {searchInput
                                            ? `Aplicar ${searchInput}% DSC.`
                                            : 'Seleccionar descuento'}
                                    </Button>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            ) : (
                <></>
            )}
        </Modal>
    )
}
