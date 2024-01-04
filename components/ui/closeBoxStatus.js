'use client'
import React, { useState, useEffect } from 'react'
import { Badge, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@nextui-org/react'
import { TbReportMoney } from 'react-icons/tb'
import CashReconciliationModal from './CashReconciliationModal'
import useSettingsStore from '@/stores/settings'

export default function BoxStatus ({ scaleStatus }) {
    const [isOpenInfo, setIsOpenInfo] = useState(null)
    const [color, setColor] = useState('danger')
    const [box, setBox] = useState(null)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const {
        SelectedCashRegister
    } = useSettingsStore()
    const DEFAULT_SELECTED = { ID: 'no-select', label: 'NINGUNA' }
    useEffect(() => {
        scaleStatus = true
        if (SelectedCashRegister?.ID === 1) {
            setBox('1')
        }

        if (SelectedCashRegister?.ID === 2) {
            setBox('2')
        }
    }, [])

    useEffect(() => {
        scaleStatus = true
        if (SelectedCashRegister?.ID === 1) {
            setBox('1')
        }

        if (SelectedCashRegister?.ID === 2) {
            setBox('2')
        }
    }, [SelectedCashRegister])

    useEffect(() => {
        if (isOpen && scaleStatus) {
            setTimeout(
                () => setIsOpenInfo(false), 5000
            )
        }
        console.log(SelectedCashRegister)
    }, [isOpen, scaleStatus])

    useEffect(() => {
        setTimeout(
            () => setIsOpenInfo(true), 1000
        )

        if (box) {
            setColor('success')
        } else {
            setColor('danger')
        }
    }, [box])

    const Message = ({ enabled }) => {
        return SelectedCashRegister !== DEFAULT_SELECTED
            ? null
            : <div className="text-small font-bold">Se debe seleccionar una caja para continuar</div>
    }

    return (
        <div className="flex items-center gap-4 animation-fade-in" onClick={() => setIsOpenInfo(!isOpenInfo)}>
            <div className="flex items-center gap-3">
                <Popover placement="top-end" offset={30} color={color} showArrow={true} onClose={() => setIsOpenInfo(false)} isOpen={isOpen}>
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
                    <PopoverContent className='mt-1' color={color}>
                        <Message enabled={box}/>
                    </PopoverContent>

                </Popover>
            </div>
        </div>
    )
}
