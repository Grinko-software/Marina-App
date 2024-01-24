/* eslint-disable no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import { Badge, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@nextui-org/react'
import { TbReportMoney } from 'react-icons/tb'
import CashReconciliationModal from './CashReconciliationModal'
import useSettingsStore from '@/stores/settings'
import { getStatus } from './services'

export default function BoxStatus ({ statusCashRegister, setStatusCashRegister, openModalCashBalance, setOpenModalCashBalance, disabled }) {
    const [isOpenInfo, setIsOpenInfo] = useState(null)
    const [color, setColor] = useState('danger')
    const [box, setBox] = useState(null)
    const [message, setMessage] = useState(false)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const {
        selectedCashRegister
    } = useSettingsStore()

    const DEFAULT_SELECTED = { ID: 'no-select', label: 'NINGUNA' }
    const onHandlerStatusBalance = () => {
        getStatus(selectedCashRegister?.ID).then((status) => {
            setStatusCashRegister(status)
            onOpen()
        })
    }
    useEffect(() => {
        if (selectedCashRegister?.ID === DEFAULT_SELECTED?.ID) {
            setMessage(true)
        } else {
            setMessage(false)
        }
    }, [selectedCashRegister])
    /* Update number on Icon NAV Cash Register  */
    useEffect(() => {
        if (selectedCashRegister?.ID === 1) {
            setBox('1')
        }

        if (selectedCashRegister?.ID === 2) {
            setBox('2')
        }
    }, [selectedCashRegister])

    useEffect(() => {
        if (openModalCashBalance) {
            onOpen()
            setOpenModalCashBalance(false)
        }
    }, [openModalCashBalance])

    return (
        <>
            <div className="flex items-center gap-4 animation-fade-in" onClick={() => setIsOpenInfo(!isOpenInfo)}>
                <div className="flex items-center gap-3">
                    <Popover placement="top-end" offset={30} color={color} showArrow={true} onClose={() => setIsOpenInfo(false)} isOpen={message}>
                        <PopoverTrigger>
                            <Badge color={color} content={box} size = "lg" shape="circle" className="text-white" >
                                <button
                                    aria-label='Toggle Dark Mode'
                                    type='button'
                                    className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700'
                                    onClick={() => {
                                    // revisar status de la cash
                                        onHandlerStatusBalance()
                                    }}
                                >

                                    <TbReportMoney className="w-6 h-6 sm:w-10 sm:h-10 cursor-pointer "/>
                                </button>
                            </Badge>
                        </PopoverTrigger>
                    </Popover>
                </div>
            </div>
            { isOpen
                ? <CashReconciliationModal isOpen={isOpen} onClose={onClose}
                    statusCashRegister={statusCashRegister}
                    setStatusCashRegister={setStatusCashRegister} />
                : <></>}

        </>
    )
}
