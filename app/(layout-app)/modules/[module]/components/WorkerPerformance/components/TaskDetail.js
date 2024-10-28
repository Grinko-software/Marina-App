'use client'
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import TaskScore from './TaskDetailScore'
import { fetchRateTask } from '@/services/task'
import useFilterStore from '../store'

export default function TaskDetail ({ isOpen, onClose, data = {} }) {
    const [ratingView, setRatingView] = useState(false)
    const [editView, setEditView] = useState(false)
    const { requestData } = useFilterStore()

    const closeModal = () => {
        if (isOpen) {
            onClose()
            setRatingView(false)
            setEditView(false)
            requestData({})
        }
    }

    const onRateTask = async (rate) => {
        console.log(data?.id, rate)
        await fetchRateTask({ taskId: data?.id, taskRate: rate })
        closeModal()
    }

    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={closeModal} size={'4xl'} closeButton={<></>} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">
                                {data?.name}
                            </ModalHeader>
                            <ModalBody>
                                {
                                    ratingView
                                        ? <TaskScore score={3} onRateTask={onRateTask}/>
                                        : <div>
                                            {data?.description}
                                        </div>
                                }
                            </ModalBody>
                            <ModalFooter className='justify-center'>
                                <Button color="danger" variant="shadow" className="w-[12rem] h-[4rem] text-xl font-extrabold" onClick={() => {
                                    closeModal()
                                }}>
                                    Cerrar
                                </Button>
                                {
                                    ratingView
                                        ? <Button color="default" variant="shadow" className="w-[12rem] h-[4rem] text-xl font-extrabold" onClick={() => {
                                            setRatingView(false)
                                        }}>
                                            Volver
                                        </Button>
                                        : <Button color="default" variant="shadow" className="w-[12rem] h-[4rem] text-xl font-extrabold" onClick={() => {
                                            setRatingView(true)
                                        }}>
                                            Calificar
                                        </Button>
                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
