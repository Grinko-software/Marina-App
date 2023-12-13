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
export default function Discount ({ openModal, setOpenModal }) {
    const {
        listSalesActives,
        saleIdActive, addDiscountSale
    } = useSalesStore()
    const [createCustomer, setCreateCustomer] = useState(false)
    const [messageSearch, setMessageSearch] = useState(null)
    const [searchInput, setSearchInput] = useState('')

    const notify = (text) => toast(text)

    const onClose = () => {
        setOpenModal(false)
    }
    const handleInputChange = (value) => {
        setSearchInput(value)
    }
    const createDiscount = () => {
        addDiscountSale(listSalesActives, saleIdActive, searchInput)
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
            <Modal size={'2xl'}
                isOpen={openModal}
                backdrop='opaque'
                onClose={onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                <ModalContent>
                    {(onClose) => (
                        <section>
                            <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200 ml-[3.5rem]">Agregar Descuento</ModalHeader>
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
                        </section>
                    )}
                </ModalContent>

            </Modal>
        </>
    )
}
