'use client'
import React, { useState, useEffect } from 'react'
import { Badge, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { IoPrintSharp } from 'react-icons/io5'

export default function PrinterStatus ({ PrinterStatus }) {
    const [isOpen, setIsOpen] = useState(null)
    const [color, setColor] = useState('danger')

    useEffect(() => {
        if (isOpen && PrinterStatus) {
            setTimeout(
                () => setIsOpen(false), 5000
            )
        }
    }, [isOpen, PrinterStatus])

    useEffect(() => {
        /*  setTimeout(
            () => setIsOpen(true), 1000
        ) */

        if (PrinterStatus) {
            setColor('success')
        } else {
            setColor('danger')
        }
    }, [PrinterStatus])

    const Message = ({ enabled }) => {
        return enabled
            ? <div className="">
                <div className="text-small text-white font-bold">Impresora conectada</div>
            </div>
            : <div className="">
                <div className="text-small font-bold">Impresora desconectada</div>
                <div className="text-tiny">Por favor abrir el archivo printer-api en escritorio.</div>
                <div className="text-tiny">Si el error persiste, contactar a soporte@grinko.cl</div>
            </div>
    }

    return (
        <div className="flex items-center gap-4 animation-fade-in" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-center gap-3">
                <Popover placement="top-end" offset={30} color={color} showArrow={true} onClose={() => setIsOpen(false)} isOpen={isOpen}>
                    <PopoverTrigger>
                        <Badge color={color} content={''} size = "lg" shape="circle">
                            <button
                                aria-label='Toggle Dark Mode'
                                type='button'
                                className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700'
                            >
                                <IoPrintSharp className="w-6 h-6 sm:w-9 sm:h-9 cursor-pointer fill-primary-500 dark:fill-primary-300"/>
                            </button>
                        </Badge>
                    </PopoverTrigger>
                    <PopoverContent className='mt-1' color={color}>
                        <Message enabled={PrinterStatus}/>
                    </PopoverContent>

                </Popover>
            </div>
        </div>
    )
}
