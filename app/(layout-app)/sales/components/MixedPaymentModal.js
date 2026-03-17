'use client'
import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    Input
} from '@nextui-org/react'
import { formatter } from '@/utils/number'
import { CashIcon } from '@/components/ui/CashIcon'
import { CreditIcon } from '@/components/ui/CreditIcon'

const DENOMINATIONS = [
    { label: '$500', value: 500, color: 'bg-purple-500' },
    { label: '$1.000', value: 1000, color: 'bg-green-700' },
    { label: '$2.000', value: 2000, color: 'bg-indigo-600' },
    { label: '$5.000', value: 5000, color: 'bg-red-600' },
    { label: '$10.000', value: 10000, color: 'bg-blue-700' },
    { label: '$20.000', value: 20000, color: 'bg-orange-600' }
]

export default function MixedPaymentModal ({
    isOpen,
    onClose,
    totalPay,
    onConfirm,
    loadingSale
}) {
    const [cashAmount, setCashAmount] = useState(0)

    useEffect(() => {
        if (isOpen) setCashAmount(0)
    }, [isOpen])

    const cardAmount = Math.max(0, totalPay - cashAmount)
    const isValid = cashAmount > 0 && cashAmount < totalPay
    const cashPct = Math.min(100, Math.round((cashAmount / totalPay) * 100))

    const addDenomination = (value) => {
        setCashAmount((prev) => Math.min(prev + value, totalPay - 1))
    }

    const handleCashInput = (value) => {
        const parsed = parseInt(value) || 0
        setCashAmount(Math.min(parsed, totalPay - 1))
    }

    return (
        <Modal size="2xl" isOpen={isOpen} closeButton={<></>} backdrop="opaque">
            <ModalContent>
                {/* Header */}
                <div className="px-6 pt-6 pb-2">
                    <p className="text-3xl font-black tracking-tight">Pago Mixto</p>
                    <p className="text-5xl font-black text-green-400 mt-1">
                        {formatter.format(totalPay)}
                    </p>
                </div>

                <ModalBody className="gap-5 px-6 py-4">
                    {/* Denomination buttons */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
							Efectivo rápido
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {DENOMINATIONS.map(({ label, value, color }) => (
                                <Button
                                    key={value}
                                    variant="shadow"
                                    className={`${color} text-white font-bold text-base h-12`}
                                    onPress={() => addDenomination(value)}
                                    isDisabled={cashAmount >= totalPay - 1}
                                >
                                    {label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Cash input */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-7 h-7 flex items-center justify-center">
                                <CashIcon />
                            </div>
                            <span className="font-bold text-base">Efectivo</span>
                            {cashAmount > 0 && (
                                <button
                                    className="ml-auto  text-lg  text-gray-500 underline"
                                    onClick={() => setCashAmount(0)}
                                >
									Limpiar
                                </button>
                            )}
                        </div>
                        <Input
                            size="lg"
                            type="number"
                            placeholder="0"
                            startContent={
                                <span className="text-default-400 text-small pointer-events-none">$</span>
                            }
                            value={cashAmount > 0 ? String(cashAmount) : ''}
                            onValueChange={handleCashInput}
                            classNames={{
                                input: 'text-2xl font-bold',
                                inputWrapper: 'h-14'
                            }}
                        />
                    </div>

                    {/* Split bar */}
                    {cashAmount > 0 && (
                        <div className="flex flex-col gap-1">
                            <div className="w-full rounded-full h-3 overflow-hidden bg-blue-500">
                                <div
                                    className="h-full bg-green-500 transition-all duration-300 rounded-full"
                                    style={{ width: `${cashPct}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs font-bold">
                                <span className="text-green-400">
									Efectivo {cashPct}% · {formatter.format(cashAmount)}
                                </span>
                                <span className="text-blue-400">
                                    {formatter.format(cardAmount)} · {100 - cashPct}% Tarjeta
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Card amount display */}
                    <div
                        className={`rounded-xl p-4 border-2 transition-all duration-300 ${
                            isValid
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-gray-600 bg-gray-800/30'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 flex items-center justify-center">
                                    <CreditIcon />
                                </div>
                                <span className="font-bold text-base">Tarjeta</span>
                            </div>
                            <span
                                className={`text-3xl font-black transition-colors duration-300 ${
                                    isValid ? 'text-blue-400' : 'text-gray-400'
                                }`}
                            >
                                {formatter.format(cardAmount)}
                            </span>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter className="gap-3 px-6 pb-6">
                    <Button
                        variant="shadow"
                        className="flex-1 h-16 text-2xl font-black bg-green-500 text-white"
                        isDisabled={!isValid}
                        isLoading={loadingSale}
                        onPress={() => onConfirm({ cashAmount, cardAmount })}
                    >
						PAGAR
                    </Button>
                    <Button
                        color="danger"
                        variant="shadow"
                        className="flex-1 h-16 text-2xl font-black"
                        onPress={onClose}
                    >
						CANCELAR
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
