/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { useDisclosure } from '@nextui-org/react'
import PaymentOfMoneyModal from './PaymentOfMoneyModal'

export function PaymentOfMoney ({ disabled }) {
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
                <FaMoneyBillTransfer

                    className={`${show ? 'fill-gray-500 dark:fill-gray-500' : 'fill-primary-500 dark:fill-primary-300'} w-6 h-6 sm:w-10 sm:h-10 cursor-pointer `}
                />
            </button>
            <PaymentOfMoneyModal isOpen={isOpen} onClose={onClose} disabled={disabled}/>
        </>

    )
}
export default PaymentOfMoney
/*
   style={{
                        fill: show ? 'gray' : 'black',
                        color: show ? 'gray' : 'black'
                    } }
*/
