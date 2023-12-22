/* eslint-disable camelcase */
/* eslint-disable no-lone-blocks */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Slider, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Text, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'

import useSalesStore from '../../store'
import AlertMessage from '@/components/ui/AlertMessage'
export const SectionInput = ({ title, children, showDivider, className }) => {
    return (
        <section className={'mt-3 space-y-2' + className}>
            { showDivider ? <Divider/> : null}
            <h3 className="text-medium pt-1">{title}</h3>
            <section className="space-y-3">
                {children}
            </section>
        </section>
    )
}
export default function Discount ({ openModal, setOpenModal, handleButton }) {
    const {
        listSalesActives,
        saleIdActive, addDiscountSale
    } = useSalesStore()
    const [createCustomer, setCreateCustomer] = useState(false)
    const [messageError, setMessageError] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const discountShortcuts = [10, 20, 30, 40, 50]
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
    const onClose = () => {
        setOpenModal(false)
    }
    return (
        <Modal
            size='5xl'
            className='h-8/12 w-8/12'
            isOpen={openModal}
            backdrop='opaque'
            scrollBehavior={'inside'}
            closeButton={<></>}
        >
            <ModalContent>
                {(onClose) => (
                    <section>
                        <ModalHeader className="flex flex-col items-center  text-primary-500 dark:text-primary-200 ml-[3.5rem]">
                            <section className='flex flex-col items-center py-[2rem]'> <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">Agregar Descuento (%)</h5> </section>
                        </ModalHeader>
                        <ModalBody className='flex flex-col items-center h-full space-y-[4rem]' >
                            <section className='flex flex-row space-x-3'>
                                {discountShortcuts?.map((e, index) => <Button key={index} variant="shadow" className=' w-[10rem] h-[8rem] bg-green-700  text-white font-extrabold text-3xl'
                                    onClick={() => handleInputChange(e) }>
                                    {e + ' %' }
                                </Button>)}
                            </section>
                            <section className='w-full flex flex-col items-center'>
                                <Slider
                                    label=""
                                    color="success"
                                    size="lg"
                                    step={10}
                                    marks={[

                                        {
                                            value: 20,
                                            label: '20%'
                                        },
                                        {
                                            value: 50,
                                            label: '50%'
                                        },
                                        {
                                            value: 80,
                                            label: '80%'
                                        }
                                    ]}
                                    defaultValue={10}
                                    className="w-full px-[4rem]"
                                    onChangeEnd={(value) => { handleInputChange(value) }}
                                />

                            </section>
                            {messageError
                                ? <div className='w-full'>
                                    <AlertMessage message={messageError}/>
                                </div>
                                : null
                            }
                        </ModalBody>
                        <ModalFooter className='flex flex-col items-center h-full mt-[2rem]'>
                            <section className='flex flex-row'>
                                <Button color="danger" variant="light"
                                    className="text-2xl h-[5rem] w-[15rem]"

                                    onClick={() => {
                                        handleButton()
                                        setCreateCustomer(false)
                                    }}
                                >
                            Cerrar
                                </Button>
                                <Button
                                    className=" bg-green-500 text-primary-50 text-2xl h-[5rem] w-[15rem]"
                                    isDisabled={messageError}
                                    onClick={() => {
                                        handleButton()
                                        createDiscount()
                                    }
                                    }>
                            Guardar
                                </Button>
                            </section>
                        </ModalFooter>

                    </section>
                )}
            </ModalContent>

        </Modal>

    )
}
