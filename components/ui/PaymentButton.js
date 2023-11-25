/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import useSalesStore from '@/app/(layout-app)/sales/store'

export default function PaymentButton ({ key, id, icon, title, paymentTarget, setPaymentTarget, voucherTarget, setVoucherTarget }) {
    const [loadingPaymentIntegration, setLoadingPaymentIntegration] = useState(false)
    const [isSelect, setIsSelect] = useState(false)
    const timeout = setTimeout(function () {
        console.log('Hello from setTimeout')
    }, 5000)
    const handleButton = () => {
        if (setPaymentTarget) {
            setLoadingPaymentIntegration(true)
            setIsSelect(true)
            // setLoadingPaymentIntegration(false)

            /* setPaymentTarget(
                useSalesStore.getState().listSalesActives,
                useSalesStore.getState().saleIdActive,
                id
            ) */
        } else if (voucherTarget) {
            setVoucherTarget(
                useSalesStore.getState().listSalesActives,
                useSalesStore.getState().saleIdActive,
                id)
        }
    }

    return (
        <div>
            {paymentTarget === id || voucherTarget === id
                ? <Button color="success" size="lg" className="flex flex-col border border-primary-200 dark:border-secondary-200  w-44 h-44  dark:bg-green-600 bg-green-500" isIconOnly variant="shadow" aria-label=""
                    onClick={handleButton}>
                    {icon}
                    <p className="dark:text-white/60 text-black uppercase  text-xl font-bold ">{title}</p>
                </Button>
                : <Button
                    isLoading = {loadingPaymentIntegration}
                    isIconOnly ={!loadingPaymentIntegration}
                    size="lg"
                    className="flex flex-col border border-primary-200 dark:border-secondary-200  w-44 h-44  dark:bg-secondary-500 bg-primary-50"
                    variant="shadow"
                    onClick={handleButton}>
                    {loadingPaymentIntegration ? <></> : icon}
                    <p className={`dark:text-white/60 text-black uppercase  ${!isSelect ? 'text-xl' : 'text-sm'} font-bold`}>{loadingPaymentIntegration ? 'Esperando pago' : title}</p>
                </Button>}
        </div>
    )
}
