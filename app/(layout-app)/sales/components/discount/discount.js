/* eslint-disable camelcase */
/* eslint-disable no-lone-blocks */
/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Text, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import { SearchIcon } from '@/components/ui/SearchIcon'
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

    const notify = (text) => toast(text)

    const onClose = () => {
        setOpenModal(false)
    }

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
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                className={' bg-primary-50 text-primary-500 dark:bg-primary-200 dark:text-primary-500'}
                toastOptions={{
                    className: '',
                    duration: 10000,
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black'
                        }
                    }
                }} />
            <div className="flex flex-wrap gap-3">
            </div>
            <Modal
                size='5xl'
                className='h-[35rem] w-6/12'
                isOpen={openModal}
                backdrop='opaque'
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent>
                    {(onClose) => (
                        <section>
                            {/* <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200 ml-[3.5rem]">Agregar Descuento</ModalHeader> */}

                            <ModalBody >

                                <section className='flex flex-col items-center py-[6rem]'>
                                    <h5 className="text-4xl font-bold leading-none text-gray-900 dark:text-white">Agregar Descuento (%)</h5>
                                </section>
                                <section className='flex flex-col items-center h-full space-y-10'>
                                    <section className='flex flex-col items-center space-y-3'>
                                        <section className='flex flex-row space-x-3'>

                                            <Input type="number" variant={'underlined'} defaultValue={ ''} onValueChange={(value) => { handleInputChange(value) }} />
                                            <h5 className="text-xl font-bold leading-none pt-[1rem] text-gray-900 dark:text-white">%</h5>

                                        </section>
                                        {messageError
                                            ? <div className='w-full'>
                                                <AlertMessage message={messageError}/>
                                            </div>
                                            : null
                                        }
                                    </section>
                                    <ModalFooter>
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
                                    </ModalFooter>
                                </section>
                            </ModalBody>

                        </section>
                    )}
                </ModalContent>

            </Modal>
        </>
    )
}
/*
<ModalBody className='flex flex-col items-center'>
                                <Input type="text" variant={'underlined'} defaultValue={ ''} className='w-[80%]'
                                    onValueChange={(value) => { handleInputChange(value) }} />
                            </ModalBody>
                            <ModalFooter>
                                <Button className =" bg-green-500 text-primary-50" onClick={() => {
                                    onClose()
                                    createDiscount()
                                }
                                }>
                            Guardar
                                </Button>
                                <Button color="danger" variant="light"
                                    onClick={() => {
                                        onClose()
                                        setCreateCustomer(false)
                                    }}
                                >
                            Cerrar
                                </Button>
                            </ModalFooter>
*/
