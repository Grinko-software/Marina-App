'use client'
import React, { useState, useEffect } from 'react'
import { Badge, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@nextui-org/react'
import { TbReportMoney } from 'react-icons/tb'
import CashReconciliationModal from './CashReconciliationModal'
import useBoxStore from '@/stores/box'

export default function BoxStatus ({ scaleStatus }) {
    const [isOpenInfo, setIsOpenInfo] = useState(null)
    const [color, setColor] = useState('danger')
    const [box, setBox] = useState(null)
    const [message, setMessage] = useState(false)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const {
        SelectedCashRegister
    } = useBoxStore(({
        SelectedCashRegister
    }) => ({
        SelectedCashRegister
    }))

    const DEFAULT_SELECTED = { ID: 'no-select', label: 'NINGUNA' }

    useEffect(() => {
        setMessage(true)
    }, [])

    useEffect(() => {
        if (SelectedCashRegister?.ID === DEFAULT_SELECTED.ID) {
            setColor('danger')
            setBox(null)
        } else {
            setColor('success')
            setBox(SelectedCashRegister?.ID)
        }
    }, [SelectedCashRegister])

    useEffect(() => {
        if (message && box) {
            setTimeout(
                () => setIsOpenInfo(false), 5000
            )
        }
    }, [message, box])

    const Message = ({ enabled }) => {
        return SelectedCashRegister?.ID === DEFAULT_SELECTED?.ID
            ? <div className="text-small font-bold">Se debe seleccionar una caja en ajustes para continuar</div>
            : null
    }

    return (
        <div className="flex items-center gap-4 animation-fade-in" onClick={() => setIsOpenInfo(!isOpenInfo)}>
            <div className="flex items-center gap-3">
                <Popover crossOffset={200} offset={20} placement="top-end" color={color} showArrow={true} onClose={() => setIsOpenInfo(false)} isOpen={message}>
                    <PopoverTrigger>
                        <Badge color={color} content={box} size = "lg" shape="circle" className="text-white" >
                            <button
                                aria-label='Toggle Dark Mode'
                                type='button'
                                className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700'
                                onClick={(onOpen)}
                            >

                                <CashReconciliationModal isOpen={isOpen} onClose={onClose} />
                                <TbReportMoney className="w-6 h-6 sm:w-10 sm:h-10 cursor-pointer "/>
                            </button>
                        </Badge>
                    </PopoverTrigger>
                    {SelectedCashRegister?.ID === DEFAULT_SELECTED?.ID
                        ? <PopoverContent className='mt-1' color={color}>
                            <Message enabled={box}/>
                        </PopoverContent>
                        : <></>}
                </Popover>
            </div>
        </div>
    )
}
