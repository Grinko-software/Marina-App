/* eslint-disable no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Image, Input } from '@nextui-org/react'
import { ConvertBytesToImage, DefaultImageMarinaMarket } from '@/utils/image'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { getIdUser } from '@/services/user'
import hubScale from './store/connectionScale'
import useSalesStore from '../store'
import useOffersStore from '@/stores/offers'

export default function WeighingScaleModal ({ isOpen, onClose, product }) {
    const [handShake, setHandShake] = useState(false)
    const [url, setUrl] = useState(null)
    const [manualMode, setManualMode] = useState(false)
    const [valueKg, setValueKg] = useState(1)
    const [isDefaultValue, setIsDefaultValue] = useState(false)
    const { setIsConnected } = hubScale()

    const {
        addFromNewSales,
        listSalesActives,
        saleIdActive
    } = useSalesStore()
    const { offers } = useOffersStore()

    const {
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket
    } = useWebSocket(url, {
        onOpen: () => {
            setHandShake(true)
        },
        // Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true
    })
    const handleOnClose = () => {
        onClose()
    }

    const onSubmitHandler = (product, unitsKg, priceTotal) => {
        addFromNewSales(listSalesActives, saleIdActive, product, unitsKg, offers, handleOnClose)
    }
    /* Last message ws from fleet status */
    useEffect(() => {
        if (lastMessage) {
            const message = lastMessage?.data.substring(0, 5)
            const data = parseFloat(message)
            setValueKg(data)
        }
    }, [lastMessage])

    useEffect(() => {
        if (isOpen) {
            setValueKg(1)
            setManualMode(false)
            useSalesStore.getState()?.disabledScanner()
        } else {
            useSalesStore.getState()?.enabledScanner()
            setIsDefaultValue(false)
        }
    }, [isOpen])

    useEffect(() => {
        if (isDefaultValue) {
            onSubmitHandler(product, valueKg, Math.round(product?.price * valueKg / 10) * 10)
        }
    }, [isDefaultValue, valueKg])

    useEffect(() => {
        if (manualMode) {
            setValueKg(1)
        }
    }, [manualMode])

    useEffect(() => {
        console.log(connectionStatus)
        if (connectionStatus === 'Closed') {
            setIsConnected(false)
        } else if (connectionStatus === 'Open') {
            setIsConnected(true)
        }
    }, [readyState])

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
    }[readyState]
    useEffect(() => {
        setUrl('ws://localhost:8080/food-scale/' + getIdUser())
    }, [])

    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} size={'2xl'}>
                <ModalContent className=''>

                    <ModalHeader className="flex flex-col gap-1 text-primary-500 dark:text-primary-200 ">Pesa de productos
                        <Button variant="shadow" className='w-full text-white font-extrabold tracking-widest bg-emerald-600'
                            onClick={() => { setManualMode(!manualMode) }}
                        >
                            {manualMode
                                ? 'MODO AUTOMATICO'
                                : 'MODO MANUAL'}
                        </Button>
                    </ModalHeader>
                    <ModalBody className='flex flex-col '>
                        <Card
                            isBlurred
                            className="border-none w-full"
                            shadow="sm"
                        >
                            <CardBody>
                                <div className="flex flex-row gap-10   content-between">
                                    <div className="col-span-6 md:col-span-4 dark:bg-default-100/50 bg-default-100/70 rounded-xl">
                                        <Image
                                            shadow="none"
                                            radius="lg"
                                            width="100"
                                            height="100"
                                            alt={product?.name}
                                            className="w-full object-cover h-[10rem] bg-slate-100 dark:bg-white"
                                            src={product?.image?.length ? ConvertBytesToImage({ imageBytes: product?.image }) : DefaultImageMarinaMarket()}
                                        />
                                        <div className='m-5 mt-5'>
                                            <h3 className="text-2xl font-semibold text-foreground/90">{product?.name.toUpperCase()}</h3>
                                            <p className="text-small text-foreground/80">{product?.code}</p>
                                            <div className='flex felx-row gap-5'>
                                                <h1 className="text-md font-medium">PRECIO X KILO</h1>
                                                <h1 className="text-md text-lime-500 ">${product?.price}</h1>
                                            </div>
                                        </div>
                                    </div>

                                    <section className="flex flex-col items-center justify-center content-between gap-2 h-[20rem]">
                                        {!manualMode
                                            ? <div className='flex flex-col gap-14 '>
                                                <h1 className="text-large font-extrabold">PESO REGISTRADO</h1>
                                                <div className='flex flex-row justify-center '>
                                                    <h1 className="text-9xl  text-teal-500 font-medium ">{valueKg}</h1>
                                                    <h1 className="text-lg text-zinc-400 font-medium ">KG</h1>
                                                </div>
                                            </div>
                                            : <div className='w-full'>
                                                <div key="flat" className="flex h-[4rem] flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-2">
                                                    <Input type="number" variant={'flat'} label="KG" placeholder="Ingresa manualmente los KG." className='text-sm'
                                                        onValueChange={(value) => setValueKg(value)} value={valueKg}
                                                    />
                                                </div>
                                                <div className='flex flex-col gap-1 w-full'>
                                                    <Button className='w-full h-[3rem] bg-green-600 text-white font-bold text-lg'
                                                        onClick={() => { setValueKg(1); setIsDefaultValue(true) } }>
                                                    1KG
                                                    </Button>
                                                    <Button className='w-full h-[3rem] bg-green-600 text-white font-bold text-lg'
                                                        onClick={() => { setValueKg(2); setIsDefaultValue(true) } }>
                                                    2KG
                                                    </Button>
                                                    <Button className='w-full h-[3rem] bg-green-600 text-white font-bold text-lg'
                                                        onClick={() => { setValueKg(5); setIsDefaultValue(true) } }>
                                                    5KG
                                                    </Button>
                                                </div>
                                            </div>

                                        }
                                        <div className='flex flex-row w-[20rem] gap-4 items-center px-5 py-3 border-3 border-teal-500 rounded-xl text-teal-500'>
                                            <h1 className="text-3xl w-full  text-teal-500 font-bold">TOTAL</h1>
                                            <h1 className="text-3xl  w-full font-xl font-bold text-teal-500 ">$ { Math.round(product?.price * valueKg / 10) * 10}</h1>
                                        </div>
                                    </section>
                                </div>
                            </CardBody>
                        </Card>
                    </ModalBody>
                    <ModalFooter>
                        <section className='flex flex-row w-full justify-center'>
                            <Button color='success'variant="shadow" className ="w-full font-extrabold text-5xl text-white h-[6rem]" onClick = {() => onSubmitHandler(product, valueKg, Math.round(product?.price * valueKg / 10) * 10) }>
                                    ACEPTAR
                            </Button>
                        </section>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
