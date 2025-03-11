'use client'
import { useDisclosure } from '@nextui-org/react'
import { TbReportMoney } from 'react-icons/tb'
import CashReconciliationModal from './CashReconciliationModal'

export function CloseBox () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
        <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700 animation-fade-in"
            onClick={onOpen}
        >
            <TbReportMoney className="w-6 h-6 sm:w-10 sm:h-10 cursor-pointer " />
            <CashReconciliationModal isOpen={isOpen} onClose={onClose} />
        </button>
    )
}
