/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from '@nextui-org/react'
import { BiCheckCircle, BiTask } from 'react-icons/bi'
import { notify } from '@/services/notify'
import EvidenceImageTask from './evidenceImageTask'
import { completeTask, startTask as startTaskService } from '../../service'
import { uploadImageTaskByEmployee } from '@/services/task'
export default function EvidenceTask ({
    taskState,
    taskId,
    employeeId,
    handleRequestGetTask
}) {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [initTask, setInitTask] = useState(null)
    const [completationTaskId, setCompletationTaskId] = useState(null)
    const [images, setImages] = useState([])
    const [comment, setComment] = useState('')
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(null)

    const handleUploadImageTaskByEmployee = async ({ completationTaskId }) => {
        try {
            for (const img of images) {
                await uploadImageTaskByEmployee({
                    taskId,
                    employeeId,
                    imageBase64: img,
                    completationTaskId
                })
            }
            notify('✅ Imágenes enviadas con éxito')
            handleClear()
            setComplete(true)
            handleRequestGetTask()
        } catch (error) {
            notify('❌ Hubo un error al subir las imágenes')
            setError(error.message)
        }
    }
    const finishTask = async () => {
        try {
            const result = await completeTask({
                taskId,
                employeeId,
                description: comment
            })
            if (!result.data) notify('❌ Hubo un error al enviar la tarea')

            notify('✅ Tarea enviada correctamente')
            const completationTaskId = result.data.id
            setCompletationTaskId(completationTaskId)
        } catch (error) {
            notify(error.message)
            setError(error.message)
        }
    }
    const startTask = async () => {
        try {
            const result = await startTaskService({
                taskId,
                employeeId,
                description: comment
            })
            if (!result.data) notify('❌ Hubo un error al enviar la tarea')

            notify('✅ Tarea enviada correctamente')
            const completationTaskId = result.data.id
            setCompletationTaskId(completationTaskId)
        } catch (error) {
            notify(error.message)
            setError(error.message)
        }
    }
    const handleSubmit = async () => {
        if (initTask) {
            startTask()
        } else {
            finishTask()
        }
    }
    const handleClear = () => {
        setComment('')
        setImages(null)
        setError(null)
        setComplete(false)
    }

    useEffect(() => {
        if (completationTaskId) {
            handleUploadImageTaskByEmployee({ completationTaskId })
        }
    }, [completationTaskId])

    useEffect(() => {
        if (taskState === 'TODO') {
            // handleRequestGetTask()
            setInitTask(true)
        } else {
            setInitTask(false)
        }
    }, [taskState])
    const disableSendButton = comment === '' || images.length === 0
    return (
        <div>
            <div className="flex justify-end">
                {taskState === 'TODO'
                    ? (
                        <Button
                            className="bg-emerald-600 dark:bg-emerald-600 font-semibold"
                            color="primary"
                            onClick={onOpen}
                            startContent={<BiTask size={25} />}
                        >
                            {'Iniciar tarea'}
                        </Button>
                    )
                    : taskState !== 'READY_TO_EVALUATE'
                        ? (
                            <Button
                                className="bg-emerald-600 dark:bg-emerald-600 font-semibold"
                                color="primary"
                                onClick={onOpen}
                                startContent={<BiCheckCircle size={25} />}
                            >
                                {'Finalizar'}
                            </Button>
                        )
                        : null}
            </div>
            <Modal
                isOpen={isOpen}
                backdrop="opaque"
                placement={'center'}
                onClose={() => onClose}
                scrollBehavior={'inside'}
                closeButton={<></>}
                id="modal-task-evidence"
                className="h-full items-center justify-center "
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200">
                        {initTask ? 'Iniciar tarea' : 'Terminar tarea'}
                    </ModalHeader>
                    <div className="max-h-[calc(100vh-16rem)] overflow-y-scroll flex flex-col items-center justify-center w-full px-6 gap-2">
                        <EvidenceImageTask
                            images={images}
                            setImages={setImages}
                            defaultImg={null}
                        />
                        <Input
                            autoFocus={true}
                            type="text"
                            value={comment}
                            variant={'underlined'}
                            label={'Comentarios'}
                            labelPlacement={'outside'}
                            placeholder={'Ingrese comentario'}
                            onValueChange={(value) => {
                                setComment(value)
                            }}
                        />
                    </div>
                    <ModalFooter>
                        {error
                            ? (
                                <div className="flex mx-5 self-center">
                                    <h1>{error}</h1>
                                </div>
                            )
                            : null}
                        {completationTaskId
                            ? (
                                <Button
                                    className=" bg-green-500 text-primary-50"
                                    onClick={() => {
                                        handleUploadImageTaskByEmployee({ completationTaskId })
                                    }}
                                >
								Re subir Imagen
                                </Button>
                            )
                            : (
                                <Button
                                    className="bg-green-500 text-primary-50"
                                    isDisabled={disableSendButton}
                                    onClick={() => handleSubmit(comment, notify)}
                                >
								Enviar
                                </Button>
                            )}
                        <Button
                            color="danger"
                            variant="flat"
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
