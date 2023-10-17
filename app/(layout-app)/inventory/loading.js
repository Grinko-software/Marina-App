'use client'
import { Progress } from '@nextui-org/react'
import React from 'react'

export default function Loading () {
    return (<div className="w-full flex justify-center">
        <div className="w-[250px]">
            <Progress color="default" isIndeterminate/>
        </div>
    </div>)
}
