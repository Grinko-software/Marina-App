'use client'
import React, { useState, useEffect } from 'react'
import InitCashCounting from './InitCashCounting/InitCashCounting'
import CashCounting from './CashCounting'

export default function CashReconciliationModal ({ isOpen, onClose, setStatusCashRegister }) {
    const [isInit, setIsInit] = useState(false)

    useEffect(() => {
        setIsInit(false)
    }, [])

    return (
        <>
            {!isInit
                ? <InitCashCounting isOpen={isOpen} onClose={onClose} setIsInit={setIsInit} isInit={isInit} setStatusCashRegister={setStatusCashRegister}/>
                : <CashCounting isOpen={isOpen} onClose={onClose} setIsInit={setIsInit} isInit={isInit} setStatusCashRegister={setStatusCashRegister}/>}
        </>
    )
}
