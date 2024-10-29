'use client'
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import TaskScore from './TaskDetailScore'
import { TASK_STATES, fetchRateTask } from '@/services/task'
import useFilterStore from '../store'
import { getMoment } from '@/utils/date'

const ItemDetail = ({ label, value }) => {
    return <div className="flex justify-between p-2 border-b border-gray-300">
        <span className="font-bold">{label?.toUpperCase()}:</span>
        <span className="text-gray-700">{value?.toUpperCase() || '-'}</span>
    </div>
}

export default function TaskDetail ({ isOpen, onClose, data = {}, filterData = {} }) {
    const [detailItemsData, setDetailItemsData] = useState([])
    const [ratingView, setRatingView] = useState(false)
    const [editView, setEditView] = useState(false)
    const { requestData } = useFilterStore()

    const closeModal = () => {
        if (isOpen) {
            onClose()
            setRatingView(false)
            setEditView(false)
            requestData(filterData)
        }
    }

    const onRateTask = async (rate) => {
        console.log(data?.id, rate)
        await fetchRateTask({ taskId: data?.id, taskRate: rate })
        closeModal()
    }

    useEffect(() => {
        let detailData = []
        if (data) {
            detailData = [
                {
                    label: 'Descripción',
                    value: data?.description
                },
                {
                    label: 'Tipo de tarea',
                    value: data?.type?.name
                },
                {
                    label: 'Tipo de dificultad',
                    value: data?.taskDifficult?.name
                },
                {
                    label: 'Encargado',
                    value: data?.user?.name
                },
                {
                    label: 'Fecha límite',
                    value: data?.dateLimit ? getMoment(data?.dateLimit).calendar() : null
                }
            ]

            if (data.rate) {
                detailData.push(
                    {
                        label: 'Evaluación',
                        value: `${data.rate} ★`
                    }
                )
            }
        }

        setDetailItemsData(detailData)
    }, [data])
    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={closeModal} size={'4xl'} closeButton={<></>} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">
                                {data?.name?.toUpperCase()}
                            </ModalHeader>
                            <ModalBody>
                                {
                                    ratingView
                                        ? <TaskScore score={data?.rate} onRateTask={onRateTask}/>
                                        : <div>
                                            {detailItemsData.map((item, index) => (
                                                <ItemDetail key={index} label={item.label} value={item.value} />
                                            ))}
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
                                    data?.stateKey === TASK_STATES.READY_TO_EVALUATE
                                        ? ratingView
                                            ? <Button
                                                color="default"
                                                variant="shadow"
                                                className="w-[12rem] h-[4rem] text-xl font-extrabold"
                                                onClick={() => {
                                                    setRatingView(false)
                                                }}
                                            >
                                            Volver
                                            </Button>
                                            : <Button
                                                color="default"
                                                variant="shadow"
                                                className="w-[12rem] h-[4rem] text-xl font-extrabold"
                                                onClick={() => {
                                                    setRatingView(true)
                                                }}
                                                isDisabled={data?.stateKey !== TASK_STATES.READY_TO_EVALUATE}
                                            >
                                            Calificar
                                            </Button>
                                        : editView
                                            ? <></>
                                            : <></>
                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
