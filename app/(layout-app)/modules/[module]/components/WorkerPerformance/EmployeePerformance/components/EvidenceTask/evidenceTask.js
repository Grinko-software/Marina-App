/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import useStoreEvidenceStore from './store'
import { BiCheckCircle } from 'react-icons/bi'
import { notify } from '@/services/notify'
import EvidenceImageTask from './evidenceImageTask'
import { completeTask } from '../../service'
export default function EvidenceTask ({ taskId, employeeId }) {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [image, setImage] = useState(null)
    const [comment, setComment] = useState('')
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (comment) => {
        const result = await completeTask({ taskId, employeeId, description: comment })
        console.log(result)
    }
    const handleclear = () => {
        setComment('')
        setImage(null)
        setError(null)
        setComplete(false)
    }

    useEffect(() => {
        if (complete) {
            handleclear()
            onClose()
        }
    }, [complete])

    return (
        <div>
            <div className="flex justify-end">
                <Button
                    className='bg-emerald-600 dark:bg-emerald-600 font-semibold' color='primary'
                    onClick={onOpen}
                    startContent={<BiCheckCircle size={25}/>}>
                    {'Finalizar'}
                </Button>
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
                        <Button className =" bg-green-500 text-primary-50"
                            onClick={() => { handleSubmit(comment, notify) }}
                        >
                            Enviar
                        </Button>
                        <Button color="danger" variant="flat"
                            onClick={() => {
                                onClose()
                                handleclear()
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
