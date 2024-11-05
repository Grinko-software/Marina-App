'use client'
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import TaskScoreInput, { TaskScore } from './TaskDetailScore'
import { TASK_STATES, fetchRateTask } from '@/services/task'
import useFilterStore from '../store'
import { getMoment } from '@/utils/date'
import { Image } from 'antd'

const ItemDetail = ({ label, value, component }) => {
    return <div className="flex justify-between p-2 border-b border-gray-300 gap-5">
        <span className="font-bold">{label?.toUpperCase()}:</span>
        {component || <span className="text-justify">{value?.toUpperCase() || '-'}</span>}
    </div>
}

export default function TaskDetail ({ isOpen, onClose, data = {}, filterData = {} }) {
    const [detailItemsData, setDetailItemsData] = useState({
        items: [],
        images: []
    })
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
        await fetchRateTask({ taskId: data?.id, taskRate: rate })
        closeModal()
    }

    useEffect(() => {
        if (isOpen && data) {
            let detailData = []
            detailData = [
                {
                    label: 'Descripción',
                    value: data?.description
                },
                {
                    label: 'Encargado',
                    value: data?.user?.name
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
                    label: 'Fecha límite',
                    value: data?.dateLimit ? getMoment(data?.dateLimit).calendar() : null
                }
            ]

            if (data.taskCompletion) {
                detailData.push(
                    {
                        label: 'Comentarios',
                        value: data.taskCompletion?.description
                    }
                )
            }
            if (data.rate) {
                detailData.push(
                    {
                        label: 'Evaluación',
                        component: <TaskScore score={data.rate}/>
                    }
                )
            }
            setDetailItemsData({
                items: detailData,
                images: data?.taskCompletion?.images || []
            })
        }
    }, [isOpen])

    return (
        <>
            <div className="flex flex-wrap gap-3 w-max h-max">
            </div>
            <Modal isDismissable={false} backdrop="blur" isOpen={isOpen} onClose={closeModal} size={'4xl'} closeButton={<></>} >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">
                                {data?.name?.toUpperCase()}
                            </ModalHeader>
                            <ModalBody>
                                {
                                    ratingView
                                        ? <TaskScoreInput score={data?.rate} onRateTask={onRateTask}/>
                                        : <div className='space-y-5'>
                                            <div>
                                                {detailItemsData.items.map((item, index) => (
                                                    <ItemDetail key={index} label={item.label} value={item.value} component={item.component} />
                                                ))}
                                            </div>
                                            <div className='flex flex-row flex-wrap justify-center gap-5 overflow-y-auto max-h-[25rem]'>
                                                {detailItemsData.images.map((item, index) => (
                                                    <Image
                                                        key={index}
                                                        shadow="none"
                                                        radius="lg"
                                                        width="50"
                                                        height="50"
                                                        alt={name}
                                                        className="object-cover max-h-[20rem] border w-full min-w-[15rem] rounded-lg bg-slate-100 dark:bg-white"
                                                        // src={'https://confidentefinanciero.com/wp-content/uploads/2023/04/Facturacion-electronica-restaurantes-scaled.jpg'}
                                                        src={item}
                                                    />
                                                ))}
                                            </div>
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
