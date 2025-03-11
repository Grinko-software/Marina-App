import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

export default function AlertMessage ({ message }) {
    return (
        <div className="w-full flex items-center">
            <div className="flex flex-row w-full m-auto text-md bg-[#f70100] text-white items-center border border-red-400 rounded-xl px-5 py-5">
                <FiAlertTriangle className="text-2xl mr-3" />
                <p className="flex-1">{message || 'Ha ocurrido un error'}</p>
            </div>
        </div>
    )
}
