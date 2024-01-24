'use client'
import React from 'react'
import InitCashCounting from './InitCashCounting/InitCashCounting'
import CashCounting from './CashCounting'

export default function CashReconciliationModal ({ isOpen, onClose, setStatusCashRegister, statusCashRegister }) {
    return (
        <>
            {statusCashRegister
                ? <CashCounting isOpen={isOpen} onClose={onClose} setStatusCashRegister={setStatusCashRegister}/>
                : <InitCashCounting isOpen={isOpen} onClose={onClose} setStatusCashRegister={setStatusCashRegister}/>
            }
        </>
    )
}
