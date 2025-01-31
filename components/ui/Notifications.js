/* eslint-disable no-unused-vars */
'use client'
import React, { useState, useEffect } from 'react'
import {
    Badge,
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@nextui-org/react'
import { MdNotifications, MdNotificationsOff } from 'react-icons/md'

export default function Notifications () {
    const [isOpen, setIsOpen] = useState(null)
    const [color, setColor] = useState('danger')
    const [enabledNotifications, setEnabledNotifications] = useState(true)
    const [hasNotifications, setHasNotifications] = useState(false)
    const [notificationsCount, setNotificationsCount] = useState(0)

    useEffect(() => {
        if (isOpen && hasNotifications) {
            setTimeout(() => setIsOpen(false), 5000)
        }
    }, [isOpen, hasNotifications, enabledNotifications])

    useEffect(() => {
        setTimeout(() => setIsOpen(true), 1000)

        if (hasNotifications) {
            setColor('success')
        } else {
            setColor('danger')
        }
    }, [hasNotifications, enabledNotifications])

    const Message = ({ enabled }) => {
        return enabled
            ? (
                <div className="">
                    <div className="text-small text-white font-bold">Pesa conectada</div>
                </div>
            )
            : (
                <div className="">
                    <div className="text-small font-bold">Pesa desconectada</div>
                    <div className="text-tiny">
					Por favor abrir el archivo scale-connector en escritorio.
                    </div>
                    <div className="text-tiny">
					Si el error persiste, contactar a soporte@grinko.cl
                    </div>
                </div>
            )
    }

    return (
        <div
            className="flex items-center gap-4 animation-fade-in"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex items-center gap-3">
                <Popover
                    placement="top-end"
                    offset={30}
                    color={color}
                    showArrow={true}
                    onClose={() => setIsOpen(false)}
                    isOpen={isOpen}
                >
                    <PopoverTrigger>
                        <button
                            aria-label="Toggle Dark Mode"
                            type="button"
                            className="flex items-center justify-center p-2 rounded-lg transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        >
                            <Badge color={color} content={'55'} size="lg" shape="circle">
                                {enabledNotifications
                                    ? (
                                        <MdNotifications className="w-6 h-6 sm:w-9 sm:h-9 cursor-pointer fill-primary-500 dark:fill-primary-300" />
                                    )
                                    : (
                                        <MdNotificationsOff className="w-6 h-6 sm:w-9 sm:h-9 cursor-pointer fill-primary-500 dark:fill-primary-300" />
                                    )}
                            </Badge>
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="mt-1" color={color}>
                        <Message enabled={hasNotifications} />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
