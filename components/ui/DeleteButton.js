'use client'
import React from 'react'
import { Button } from '@nextui-org/react'
import { DeleteIcon } from './DeleteIcon'
import useSalesStore from '@/app/(layout-app)/sales/store'

export default function DeleteButton ({ productId }) {
    const handleButton = () => {
        const sales = useSalesStore.getState().listSalesActives
        const saleId = useSalesStore.getState().saleIdActive
        useSalesStore.getState().removeProduct(sales, saleId, productId)
    }

    return (
        <div className="flex flex-col items-center">
            <Button className="flex flex-col items-center" isIconOnly color="danger" variant="faded" aria-label=""
                onClick={handleButton}>
                <DeleteIcon />
            </Button>
        </div>
    )
}
