'use client'
import React from 'react'
import InitCashCounting from './InitCashCounting'
import CashCounting from './CashCounting'
import useBoxStore from '@/stores/box'

export default function CashReconciliationModal ({ isOpen, onClose }) {
    const {
        AccountingCashStartInitialized
    } = useBoxStore(({
        AccountingCashStartInitialized
    }) => ({
        AccountingCashStartInitialized
    }))

    return (
        <>
            {!AccountingCashStartInitialized
                ? <InitCashCounting isOpen={isOpen} onClose={onClose} />
                : <CashCounting isOpen={isOpen} onClose={onClose} />}
        </>
    )
}
