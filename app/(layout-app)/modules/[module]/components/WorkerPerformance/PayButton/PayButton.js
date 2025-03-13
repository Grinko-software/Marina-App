/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect } from 'react'
import { Button } from '@nextui-org/react'
import useStore from '../store'
import { BiMoney, BiSolidDashboard } from 'react-icons/bi'

export default function PayButton () {
    const { isSectionPayment, setIsSectionPayment } = useStore()

    const onChangeState = () => {
        setIsSectionPayment(!isSectionPayment)
    }

    return (
        <Button
            className="bg-emerald-600 dark:bg-emerald-600 font-semibold uppercase w-full"
            color="primary"
            onClick={() => {
                // add section
                onChangeState()
            }}
            startContent={
                isSectionPayment
                    ? (
                        <BiSolidDashboard size={25} />
                    )
                    : (
                        <BiMoney size={25} />
                    )
            }
        >
            {isSectionPayment ? 'Dashboard' : 'pagar'}
        </Button>
    )
}
