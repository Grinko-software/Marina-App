/* eslint-disable no-unused-vars */
'use client'
import { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react'
import { DeleteIcon } from '@/components/ui/DeleteIcon'
import toast from 'react-hot-toast'
import { deleteUser } from '@/services/users'

const notify = (text) => toast(text)

export default function UserInfo (params) {
    // eslint-disable-next-line no-unused-vars
    const { target, setTarget, deleteAction } = params
    const [isLoading, setIsLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [saveDisabled, setSaveDisabled] = useState(true)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [dataModel, setDataModel] = useState(null)
    // const [loadingEdit, setLoadingEdit] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    useEffect(() => {
        if (target) {
            onOpen()
            // fetchData()
        } else {
            setDataModel(null)
            setSaveDisabled(true)
            closeModal()
        }
    }, [target])

    const closeModal = () => {
        setTarget(null)
        if (isOpen) {
            onClose()
        }
    }

    const updatedUser = async () => {
        setIsLoading(true)
        // await fetchData()
        setIsLoading(false)
    }

    const handleDeleteUser = () => {
        setLoadingDelete(true)

        deleteUser({ id: target.id, notify }).then(
            (response) => {
                setLoadingDelete(false)
                if (deleteAction) {
                    deleteAction()
                }
                closeModal()
            }
        )
    }

    return <section>
        <Modal
            isOpen={isOpen}
            size={'5xl'}
            backdrop='opaque'
            onClose={null}
            hideCloseButton
        >
            <ModalContent>

                <ModalHeader>
                    <p>Usuario: {target?.fullName?.toUpperCase()}</p>
                </ModalHeader>
                <ModalBody>
                    {}
                </ModalBody>
                <ModalFooter>
                    {
                        edit
                            ? <section className='flex flex-row gap-2'>
                                <Button className =" bg-green-500 text-primary-50"
                                    isDisabled={saveDisabled}
                                    onClick={() => {
                                        updatedUser()
                                    }}
                                >
                                    {'Guardar cambios'}
                                </Button>
                                <Button color="danger" variant="flat"
                                    onClick={() => {
                                        setEdit(false)
                                    }}
                                >
                                    {'Cancelar'}
                                </Button>
                            </section>
                            : <section className='flex flex-row gap-2'>
                                <Button color="danger" variant="bordered"
                                    startContent={<DeleteIcon/>}
                                    onClick={handleDeleteUser}
                                    isLoading={loadingDelete}>
                                    {loadingDelete ? 'Eliminando' : 'Eliminar'}
                                </Button>
                                <Button className =" bg-green-500 text-primary-50"
                                    onClick={() => {
                                        setEdit(true)
                                    }}
                                >
                                    {'Editar'}
                                </Button>
                                <Button color="danger" variant="flat"
                                    onClick={() => {
                                        closeModal()
                                    }}
                                >
                                    {'Cerrar'}
                                </Button>
                            </section>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    </section>
}
