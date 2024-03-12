/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { useDisclosure } from '@nextui-org/react'
import DepositCash from '../DepositCash/DepositCash'

export function DepositCashNav ({ disabled }) {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [show, setShow] = useState(null)

    useEffect(() => {
        if (disabled !== null) {
            setShow(disabled)
        }
    }, [disabled])
    return (
        <>
            <button
                aria-label='Toggle Dark Mode'
                type='button'
                className={`${show ? ' cursor-not-allowed' : 'cursor-pointer'} flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700 animation-fade-in`}
                onClick={() => {
                    if (!disabled) {
                        onOpen()
                    }
                }}
            >
                <FaMoneyBillTrendUp

                    className={`${show ? 'fill-gray-500 dark:fill-gray-500' : 'fill-primary-500 dark:fill-primary-300'} w-6 h-6 sm:w-[2.4rem] sm:h-[2.4rem] cursor-pointer mb-4`}
                />
            </button>
            <DepositCash isOpen={isOpen} onClose={onClose} disabled={disabled}/>
        </>

    )
}
export default DepositCashNav
