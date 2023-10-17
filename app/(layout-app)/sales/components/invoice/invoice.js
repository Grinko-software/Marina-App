/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Text, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
export default function InvoiceDetailed ({ openModal, setOpenModal, setVoucherTargetValue }) {
    const [createCustomer, setCreateCustomer] = useState(false)
    const onClose = () => {
        setOpenModal(false)
    }
    const classNames = useMemo(
        () => ({
            wrapper: ['max-h-[902px]', 'max-w-4xl'],
            th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
            td: [
                // changing the rows border radius
                // first
                'group-data-[first=true]:first:before:rounded-none',
                'group-data-[first=true]:last:before:rounded-none',
                // middle
                'group-data-[middle=true]:before:rounded-none',
                // last
                'group-data-[last=true]:first:before:rounded-none',
                'group-data-[last=true]:last:before:rounded-none'
            ]
        }),
        []
    )

    return (
        <>
            <div className="flex flex-wrap gap-3">
            </div>
            <Modal size={'2xl'}
                isOpen={openModal}
                backdrop='opaque'
                onClose={onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
            >
                {createCustomer
                    ? <ModalContent>
                        {(onClose) => (
                            <section>
                                <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Selecciona un cliente</ModalHeader>
                                <ModalBody>
                                    <Table className={classNames} hideHeader aria-label="Example table with custom cells">
                                        <TableHeader>
                                            <TableColumn>Producto</TableColumn>
                                            <TableColumn>Acciones</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow key="1">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold mt-[1rem]">{ 'Nombre'}</p></TableCell>
                                                <TableCell><Input type="email" variant={'underlined'} defaultValue={ 'title'} /></TableCell>
                                            </TableRow>
                                            <TableRow key="2">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold  mt-[1rem]"> { 'Stock'}</p></TableCell>
                                                <TableCell><Input type="email" variant={'underlined'} defaultValue={ 'dato'} /></TableCell>
                                            </TableRow>
                                            <TableRow key="3">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold  mt-[1rem]"> { 'Precio'}</p></TableCell>
                                                <TableCell><Input type="email" variant={'underlined'} defaultValue={ 'precio'} /></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className =" bg-green-500 text-primary-50" onClick={() => {
                                    // setEdit(false)
                                    // setTargetProduct(null)
                                        onClose()
                                    }
                                    }>
                            Guardar
                                    </Button>
                                    <Button color="danger" variant="light"
                                        onClick={() => {
                                            onClose()
                                        }}
                                    >
                            Cerrar
                                    </Button>
                                </ModalFooter>
                            </section>
                        )}
                    </ModalContent>
                    : <ModalContent>
                        {(onClose) => (
                            <section>
                                <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Selecciona un cliente</ModalHeader>
                                <ModalBody>
                                    <Table className={classNames} hideHeader aria-label="Example table with custom cells">
                                        <TableHeader>
                                            <TableColumn>Producto</TableColumn>
                                            <TableColumn>Acciones</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow key="1">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold mt-[1rem]">{ 'Nombre'}</p></TableCell>
                                                <TableCell><Input type="email" variant={'underlined'} defaultValue={ 'title'} /></TableCell>
                                            </TableRow>
                                            <TableRow key="2">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold  mt-[1rem]"> { 'Stock'}</p></TableCell>
                                                <TableCell><Input type="email" variant={'underlined'} defaultValue={ 'dato'} /></TableCell>
                                            </TableRow>
                                            <TableRow key="3">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold  mt-[1rem]"> { 'Precio'}</p></TableCell>
                                                <TableCell><Input type="email" variant={'underlined'} defaultValue={ 'precio'} /></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className =" bg-green-500 text-primary-50" onClick={() => {
                                    // setEdit(false)
                                    // setTargetProduct(null)
                                        onClose()
                                    }
                                    }>
                            Guardar
                                    </Button>
                                    <Button color="danger" variant="light"
                                        onClick={() => {
                                            onClose()
                                        }}
                                    >
                            Cerrar
                                    </Button>
                                </ModalFooter>
                            </section>
                        )}
                    </ModalContent>}

            </Modal>
        </>
    )
}
