import React, { useState } from 'react'
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'

export default function DetailedProduct ({ targeProduct, isOpen, onClose, setTargetProduct }) {
    const [edit, setEdit] = useState(false)

    return (
        <>
            <div className="flex flex-wrap ">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                {edit
                    ? <ModalContent>
                        {(onClose) => (
                            <section>
                                <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Detalles del producto</ModalHeader>
                                <ModalBody>
                                    <Table hideHeader aria-label="Example table with custom cells">
                                        <TableHeader>
                                            <TableColumn>Producto</TableColumn>
                                            <TableColumn>Acciones</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow key="1">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold mt-[1rem]">{ 'Nombre'}</p></TableCell>
                                                <TableCell><Input type="email" variant={'underlined'} label={ targeProduct?.title} /></TableCell>
                                            </TableRow>
                                            <TableRow key="1">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold  mt-[1rem]"> { 'Stock'}</p></TableCell>
                                                <TableCell><Input type="email" variant={'underlined'} label={ targeProduct?.stock} /></TableCell>
                                            </TableRow>
                                            <TableRow key="1">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold  mt-[1rem]"> { 'Precio'}</p></TableCell>
                                                <TableCell><Input type="email" variant={'underlined'} label={ targeProduct?.price} /></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className =" bg-green-500 text-primary-50" onClick={() => {
                                        setEdit(false)
                                        setTargetProduct(null)
                                        onClose()
                                    }
                                    }>
                            Guardar
                                    </Button>
                                    <Button color="danger" variant="light"
                                        onClick={() => {
                                            setEdit(false)
                                            setTargetProduct(null)
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
                                <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">Detalles del producto</ModalHeader>
                                <ModalBody>
                                    <Table hideHeader aria-label="Example table with custom cells">
                                        <TableHeader>
                                            <TableColumn>Producto</TableColumn>
                                            <TableColumn>Acciones</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow key="1">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold">{ 'Nombre'}</p></TableCell>
                                                <TableCell><p className="text-primary-500 dark:text-primary-200"> { targeProduct?.title}</p></TableCell>
                                            </TableRow>
                                            <TableRow key="1">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold"> { 'Stock'}</p></TableCell>
                                                <TableCell><p className="text-primary-500 dark:text-primary-200"> { targeProduct?.stock}</p></TableCell>
                                            </TableRow>
                                            <TableRow key="1">
                                                <TableCell><p className="text-primary-500 dark:text-primary-200 font-bold"> { 'Precio'}</p></TableCell>
                                                <TableCell><p className="text-primary-500 dark:text-primary-200"> { targeProduct?.price}</p></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className =" bg-blue-500 text-primary-50" onClick={() => { setEdit(!edit) }}>
                            Editar
                                    </Button>
                                    <Button color="danger" variant="light"
                                        onClick={() => {
                                            setEdit(false)
                                            setTargetProduct(null)
                                            onClose()
                                        }}
                                    >
                            Cerrar
                                    </Button>
                                </ModalFooter>
                            </section>
                        )}
                    </ModalContent>
                }
            </Modal>
        </>
    )
}
