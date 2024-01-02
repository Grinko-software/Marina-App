'use client'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { useDisclosure } from '@nextui-org/react'
import PaymentOfMoneyModal from './PaymentOfMoneyModal'

export function PaymentOfMoney () {
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
        <button
            aria-label='Toggle Dark Mode'
            type='button'
            className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700 animation-fade-in'
            onClick={(onOpen)}
        >
            <FaMoneyBillTransfer className="w-6 h-6 sm:w-10 sm:h-10 cursor-pointer fill-primary-500 dark:fill-primary-300"/>
            <PaymentOfMoneyModal isOpen={isOpen} onClose={onClose}/>
        </button>
    )
}
export default PaymentOfMoney
