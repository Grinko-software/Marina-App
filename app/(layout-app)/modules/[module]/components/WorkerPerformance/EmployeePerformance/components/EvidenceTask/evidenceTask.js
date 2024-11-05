/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { BiCheckCircle } from 'react-icons/bi'
import { notify } from '@/services/notify'
import EvidenceImageTask from './evidenceImageTask'
import { completeTask, startTask } from '../../service'
import { uploadImageTaskByEmployee } from '@/services/task'
export default function EvidenceTask ({ taskState, taskId, employeeId, handleRequestGetTask }) {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [completationTaskId, setCompletationTaskId] = useState(null)
    const [image, setImage] = useState(null)
    const [comment, setComment] = useState('')
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(null)

    const handleUploadImageTaskByEmployee = async ({ completationTaskId }) => {
        try {
            const uploadImage = await uploadImageTaskByEmployee({
                taskId, employeeId, imageBase64: image, completationTaskId
            })

            if (uploadImage.data) {
                notify('✅ Imágen enviada con éxito')
                handleClear()
                setComplete(true)
                handleRequestGetTask()
            } else {
                notify('❌ Hubo un error al subir la imágen')
            }
        } catch (error) {
            notify(error.message)
            setError(error.message)
        }
    }
    const handleSubmit = async () => {
        try {
            const result = await completeTask({ taskId, employeeId, description: comment })
            if (!result.data) notify('❌ Hubo un error al enviar la tarea')

            notify('✅ Tarea enviada correctamente')
            const completationTaskId = result.data.id
            setCompletationTaskId(completationTaskId)
        } catch (error) {
            notify(error.message)
            setError(error.message)
        }
    }
    const handleChangeStartTask = async ({ taskId }) => {
        try {
            const result = await startTask({ taskId })
            if (!result.data) {
                notify('❌ Hubo un error al iniciar la tarea')
            } else {
                notify('✅ Tarea iniciada correctamente')
                handleRequestGetTask()
            }
        } catch (error) {
            notify(error.message)
            setError(error.message)
        }
    }
    const handleClear = () => {
        setComment('')
        setImage(null)
        setError(null)
        setComplete(false)
    }

    useEffect(() => {
        if (completationTaskId) {
            console.log(completationTaskId)
            handleUploadImageTaskByEmployee({ completationTaskId })
        }
    }, [completationTaskId])
    const disableSendButton = comment === '' || comment === undefined || image === null || image === undefined
    return (
        <div>
            <div className="flex justify-end">
                { taskState === 'TODO'
                    ? <Button
                        className='bg-emerald-600 dark:bg-emerald-600 font-semibold' color='primary'
                        onClick={() => {
                            handleChangeStartTask({ taskId })
                        }}
                        startContent={<BiCheckCircle size={25}/>}>
                        {'Iniciar tarea'}
                    </Button>
                    : taskState !== 'READY_TO_EVALUATE'
                        ? <Button
                            className='bg-emerald-600 dark:bg-emerald-600 font-semibold' color='primary'
                            onClick={onOpen}
                            startContent={<BiCheckCircle size={25}/>}>
                            {'Finalizar'}
                        </Button>
                        : null
                }
            </div>
            <Modal
                size={'4xl'}
                isOpen={isOpen}
                backdrop='opaque'
                placement={'top'}
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
                id='modal-task-evidence'
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">
                        {'Terminar tarea'}
                    </ModalHeader>
                    <ModalBody>
                        <div className="p-4 flex flex-col items-center">
                            <EvidenceImageTask image={image} setImage={setImage} defaultImg={null} />
                        </div>
                        <div className="p-4 flex items-center">
                            <Input
                                autoFocus={true}
                                type="text"
                                value={comment}
                                variant={'underlined'}
                                label={'Comentarios'}
                                labelPlacement={'outside'}
                                placeholder={ 'Ingrese comentario'}
                                onValueChange={(value) => { setComment(value) }}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {error
                            ? <div className='flex mx-5 self-center'>
                                <h1>{error}</h1>
                            </div>
                            : null}
                        {completationTaskId
                            ? <Button className =" bg-green-500 text-primary-50"
                                onClick={() => {
                                    handleUploadImageTaskByEmployee({ completationTaskId })
                                }}
                            >
                            Re subir Imagen
                            </Button>
                            : <Button className =" bg-green-500 text-primary-50"
                                isDisabled={disableSendButton}
                                onClick={() => { handleSubmit(comment, notify) }}
                            >
                            Enviar
                            </Button>
                        }
                        <Button color="danger" variant="flat"
                            onClick={() => {
                                onClose()
                                handleClear()
                            }}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
