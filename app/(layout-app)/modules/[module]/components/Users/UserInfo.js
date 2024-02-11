/* eslint-disable no-unused-vars */
'use client'
import { useEffect, useState } from 'react'
import { Button, Chip, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react'
import { DeleteIcon } from '@/components/ui/DeleteIcon'
import toast from 'react-hot-toast'
import { deleteUser } from '@/services/users'
import { QRCode } from 'antd'
import { requestUpdateUser, requestResetPassword } from './service'
import UserPassword from './UserPassword'
import useCredentialStore from './Credentials/store'
import UserCredential, { DEFAULT_OPTION } from './Credentials/Credential'
import { createUserAssociationCredential, deleteUserAssociationCredential } from '@/services/credential'
import { EyeSlashFilledIcon } from '@/components/ui/EyeSlashFilledIcon'
import { EyeFilledIcon } from '@/components/ui/EyeFilledIcon'

const notify = (text) => toast(text)

export default function UserInfo (params) {
    const { target, setTarget, handleRefresh } = params
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [edit, setEdit] = useState(false)
    const [saveDisabled, setSaveDisabled] = useState(true)
    const [userDataUpdated, setUserDataUpdated] = useState(null)
    const [userPasswordUpdated, setUserPasswordUpdated] = useState(null)
    const [loadingEdit, setLoadingEdit] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    useEffect(() => {
        if (target) {
            onOpen()
        } else {
            closeModal()
        }
    }, [target])

    useEffect(() => {
        if (target?.id != null) {
            requestResetPassword({ id: target?.id, notify, onSuccess: closeModalWithRefresh })
            setUserPasswordUpdated(null)
            handleRefresh()
        }
    }, [userPasswordUpdated])

    useEffect(() => {
        console.log(userDataUpdated)
        if (userDataUpdated) {
            setSaveDisabled(false)
        } else {
            setSaveDisabled(true)
        }
    }, [userDataUpdated])

    const closeModal = () => {
        setTarget(null)
        setUserDataUpdated(null)
        setSaveDisabled(true)
        setEdit(false)
        setLoadingEdit(false)
        if (isOpen) {
            onClose()
        }
    }

    const closeModalWithRefresh = () => {
        handleRefresh()
        closeModal()
    }

    const handleUpdateUserValues = (data) => {
        setUserDataUpdated({ ...userDataUpdated, ...data })
    }

    const onChangeCredentialCode = (value) => {
        setUserDataUpdated({ ...userDataUpdated, ...{ code: value } })
    }

    const handleUpdateUser = async () => {
        setLoadingUpdate(true)
        const { code: credentialCodeUpdated, ...restDataUpdated } = userDataUpdated

        if (credentialCodeUpdated !== undefined && credentialCodeUpdated !== target?.credential?.code) {
            if (userDataUpdated.code) {
                await createUserAssociationCredential({ userId: target?.id, keyCredential: credentialCodeUpdated, notify })
            } else {
                await deleteUserAssociationCredential({ userId: target?.id, notify })
            }
        }

        if (Object.keys(restDataUpdated).length) {
            await requestUpdateUser({ id: target?.id, name: restDataUpdated?.name, email: restDataUpdated?.email, lastName: restDataUpdated?.lastName, password: restDataUpdated?.password, notify, onSuccess: closeModalWithRefresh })
        } else {
            closeModalWithRefresh()
        }

        setLoadingUpdate(false)
    }

    const handleDeleteUser = () => {
        setLoadingDelete(true)
        deleteUser({ id: target.id, notify }).then(
            (response) => {
                setLoadingDelete(false)
                if (handleRefresh) {
                    handleRefresh()
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
                    <section className='items-start gap-2 grid grid-cols-1'>
                        <section className='items-center gap-2 grid grid-cols-1 md:grid-cols-2 mb-5'>
                            <div className="px-4 flex items-center">
                                <Input
                                    disabled={!edit}
                                    type="text"
                                    defaultValue={target?.name}
                                    value={edit ? userDataUpdated?.name : target?.name}
                                    variant={'underlined'}
                                    label={'Nombre'}
                                    labelPlacement={'outside'}
                                    placeholder={ 'Ingrese el nombre del usuario'}
                                    onValueChange={(value) => { handleUpdateUserValues({ name: value }) }}
                                />
                            </div>
                            <div className="px-4 pt-4 flex items-center">
                                <Input
                                    type="text"
                                    disabled={!edit}
                                    defaultValue={target?.lastName}
                                    value={edit ? userDataUpdated?.lastName : target?.lastName}
                                    variant={'underlined'}
                                    label={'Apellido'}
                                    labelPlacement={'outside'}
                                    placeholder={ 'Ingrese el Apellido del usuario'}
                                    onValueChange={(value) => { handleUpdateUserValues({ lastName: value }) }}
                                />
                            </div>
                            <div className="px-4 pt-4  flex items-center">
                                <Input
                                    type="text"
                                    disabled={!edit}
                                    defaultValue={target?.email}
                                    value={edit ? userDataUpdated?.email : target?.email}
                                    variant={'underlined'}
                                    label={'Correo del usuario'}
                                    labelPlacement={'outside'}
                                    placeholder={ 'Ingrese el correo del usuario'}
                                    onValueChange={(value) => { handleUpdateUserValues({ email: value }) }}
                                />
                            </div>
                            <div className="px-4 pt-4  flex items-center">
                                <Input
                                    type="text"
                                    disabled={!edit}
                                    defaultValue={target?.type}
                                    value={edit ? userDataUpdated?.type : target?.type}
                                    variant={'underlined'}
                                    label={'Tipo usuario'}
                                    labelPlacement={'outside'}
                                    placeholder={ 'Seleccione el tipo de usuario'}
                                    onValueChange={(value) => { handleUpdateUserValues({ type: value }) }}
                                />
                            </div>
                            <div className="px-4 pt-4  flex items-center">
                                <Input
                                    disabled={!edit}
                                    defaultValue={target?.password}
                                    value={edit ? userDataUpdated?.password : target?.password}
                                    variant={'underlined'}
                                    label={'Contraseña'}
                                    labelPlacement={'outside'}
                                    placeholder={ 'Contraseña'}
                                    onValueChange={(value) => { handleUpdateUserValues({ password: value }) }}
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                            {isVisible
                                                ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )
                                                : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                        </button>
                                    }
                                    type={isVisible ? 'text' : 'password'}
                                />
                            </div>
                        </section>

                        <section className='mx-[1rem] gap-4 flex flex-col'>
                            <div className="flex flex-row gap-2">
                                <p className='text-sm'>Credencial:</p>
                                <p className="text-bold text-sm capitalize dark:text-white flex justify-center">
                                    <Chip
                                        color={target?.credential ? 'success' : 'warning'}
                                        size="sm"
                                        variant="solid"
                                        classNames={{
                                            content: 'text-white'
                                        }}
                                    >
                                        {target?.credential ? 'ASIGNADA' : 'NO ASIGNADA'}
                                    </Chip>
                                </p>
                            </div>
                            <UserCredential isEdit={edit} target={target} credential={target?.credential} onValueChage={onChangeCredentialCode}/>
                        </section>

                    </section>

                </ModalBody>
                <ModalFooter>
                    {
                        edit
                            ? <section className='flex flex-row gap-2'>
                                <Button className =" bg-green-500 text-primary-50"
                                    onClick={() => {
                                        setUserPasswordUpdated(true)
                                    }}
                                >
                                    {'Resetear contraseña'}
                                </Button>
                                <Button className =" bg-green-500 text-primary-50"
                                    onClick={() => {
                                        handleUpdateUser()
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
                                <Button className =" bg-blue-500 text-primary-50"
                                    isLoading={loadingUpdate}
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
