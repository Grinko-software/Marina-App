'use client'
import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Tabs,
    Tab
} from '@nextui-org/react'
import TaskScoreInput, { TaskScore } from './TaskDetailScore'
import { TASK_STATES, fetchRateTask } from '@/services/task'
import useFilterStore from '../store'
import { getMoment } from '@/utils/date'
import { Image } from 'antd'

const ItemDetail = ({ label, value, component }) => {
    return (
        <div className="flex justify-between p-2 border-b border-gray-300 gap-5">
            <span className="font-bold">{label?.toUpperCase()}:</span>
            {component || (
                <span className="text-justify">{value?.toUpperCase() || '-'}</span>
            )}
        </div>
    )
}

export default function TaskDetail ({
    isOpen,
    onClose,
    data = {},
    filterData = {}
}) {
    const [detailItemsData, setDetailItemsData] = useState({
        items: [],
        imagesInit: [],
        imagesFinish: []
    })
    const [ratingView, setRatingView] = useState(false)
    const [editView, setEditView] = useState(false)
    const [imagesTab, setImagesTab] = useState('init')
    const { requestData } = useFilterStore()

    const [rate, setRate] = useState(data?.rate)
    const [feedbackRate, setFeedbackRate] = useState('')

    const closeModal = () => {
        if (isOpen) {
            onClose()
            setRatingView(false)
            setEditView(false)
            requestData(filterData)
        }
    }

    const onRateTask = async (rate, feedback) => {
        await fetchRateTask({
            taskId: data?.id,
            taskRate: rate,
            feedbackRate: feedback
        })
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

            if (data.feedback) {
                detailData.push({
                    label: 'Comentarios',
                    value: data?.feedback
                })
            }
            if (data.rate) {
                detailData.push({
                    label: 'Evaluación',
                    component: <TaskScore score={data.rate} />
                })
            }
            setDetailItemsData({
                items: detailData,
                imagesInit: data?.taskInitation?.images || [],
                imagesFinish: data?.taskCompletion?.images || []
            })
        }
    }, [isOpen])

    return (
        <>
            <Modal
                isDismissable={false}
                backdrop="blur"
                isOpen={isOpen}
                onClose={closeModal}
                size={'4xl'}
                closeButton={<></>}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold">
                                {data?.name?.toUpperCase()}
                            </ModalHeader>
                            <ModalBody>
                                {ratingView
                                    ? (
                                        <TaskScoreInput
                                            rate={rate}
                                            onRateChange={setRate}
                                            feedbackRate={feedbackRate}
                                            setFeedbackRate={setFeedbackRate}
                                        />
                                    )
                                    : (
                                        <div className="space-y-5">
                                            <div>
                                                {detailItemsData.items.map((item, index) => (
                                                    <ItemDetail
                                                        key={index}
                                                        label={item.label}
                                                        value={item.value}
                                                        component={item.component}
                                                    />
                                                ))}
                                            </div>
                                            {detailItemsData.imagesInit.length ||
										detailItemsData.imagesFinish.length
                                                ? (
                                                    <div className="flex flex-col items-center mx-auto">
                                                        <Tabs
                                                            aria-label="Images"
                                                            size="md"
                                                            className="mx-auto py-2"
                                                            selectedKey={imagesTab}
                                                            onSelectionChange={setImagesTab}
                                                            classNames={{
                                                                cursor: 'bg-green-400 dark:bg-green-400',
                                                                tabContent:
															'group-data-[selected=true]:text-primary-50'
                                                            }}
                                                            items={[
                                                                {
                                                                    id: 1,
                                                                    label: 'Antes',
                                                                    images: detailItemsData.imagesInit
                                                                },
                                                                {
                                                                    id: 2,
                                                                    label: 'Después',
                                                                    images: detailItemsData.imagesFinish
                                                                }
                                                            ]}
                                                        >
                                                            {(item) => (
                                                                <Tab key={item.id} title={item.label}>
                                                                    <div className="flex flex-row flex-wrap justify-center gap-5 overflow-y-auto max-h-[25rem]">
                                                                        {item.images.map((item, index) => (
                                                                            <Image
                                                                                key={index}
                                                                                shadow="none"
                                                                                radius="lg"
                                                                                width="50"
                                                                                height="50"
                                                                                alt={name}
                                                                                className="object-cover max-h-[20rem] border w-full min-w-[15rem] rounded-lg bg-slate-100 dark:bg-white"
                                                                                src={item}
                                                                            />
                                                                        ))}
                                                                        {!item.images.length && (
                                                                            <p className="text-lg uppercase font-semibold m-3">
																		No hay imágenes para mostrar
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </Tab>
                                                            )}
                                                        </Tabs>
                                                    </div>
                                                )
                                                : (
                                                    <></>
                                                )}
                                        </div>
                                    )}
                            </ModalBody>
                            <ModalFooter className="justify-center">
                                <Button
                                    color={ratingView ? 'default' : 'danger'}
                                    variant="shadow"
                                    className="w-[12rem] h-[4rem] text-xl font-extrabold"
                                    onClick={() => {
                                        if (ratingView) {
                                            setRatingView(false)
                                        } else {
                                            closeModal()
                                        }
                                    }}
                                >
                                    {ratingView ? 'Volver' : 'Cerrar'}
                                </Button>
                                {data?.stateKey === TASK_STATES.READY_TO_EVALUATE
                                    ? (
                                        ratingView
                                            ? (
                                                <Button
                                                    color="success"
                                                    variant="shadow"
                                                    className="w-[12rem] h-[4rem] text-xl font-extrabold"
                                                    onClick={() => {
                                                        onRateTask(rate, feedbackRate)
                                                    }}
                                                >
											Calificar
                                                </Button>
                                            )
                                            : (
                                                <Button
                                                    color="default"
                                                    variant="shadow"
                                                    className="w-[12rem] h-[4rem] text-xl font-extrabold"
                                                    onClick={() => {
                                                        setRatingView(true)
                                                    }}
                                                    isDisabled={
                                                        data?.stateKey !== TASK_STATES.READY_TO_EVALUATE
                                                    }
                                                >
											Calificar
                                                </Button>
                                            )
                                    )
                                    : editView
                                        ? (
                                            <></>
                                        )
                                        : (
                                            <></>
                                        )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
