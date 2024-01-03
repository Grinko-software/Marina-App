'use client'
import React from 'react'
import { Card, CardHeader, CardFooter } from '@nextui-org/react'
import Image from 'next/image'

export default function CashReconciliationCard (props) {
    const { title, total, detail, bgTitle, img } = props

    return (
        <>

            <Card className="col-span-12 sm:col-span-4 h-[350px] w-[350px] ">
                <CardHeader className={`${bgTitle} bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between !items-start h-[120px]`}>
                    <div className="grid grid-rows-2 content-between">
                        <p className=" text-white/60 uppercase font-bold text-xl">{title}</p>
                        <h4 className="text-white text-large font-extrabold">{total}</h4>
                    </div>
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src={img}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-tiny">{detail}.</p>
                    </div>
                </CardFooter>
            </Card>
        </>)
}
