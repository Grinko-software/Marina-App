'use client'
import React from 'react'
import { Button as ButtonUi } from '@nextui-org/react'
export default function Button (props) {
    const { onClick, title, className } = props
    return (
        <ButtonUi
            className={`${className || 'w-16 text-white h-full bg-gray-600'}`}
            onClick={() => { onClick() }}>
            {title}
        </ButtonUi>
    )
}
