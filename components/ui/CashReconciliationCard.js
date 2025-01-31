'use client'
import React from 'react'
import { Card, CardHeader, CardFooter } from '@nextui-org/react'
import Image from 'next/image'

export default function CashReconciliationCard (props) {
    const { title, total, detail, bgTitle, img } = props

    return (
        <>
            <Card className="col-span-12 sm:col-span-4 w-[400px] bg-yellow-400 ">
                <CardHeader
                    className={`${bgTitle} bottom-0 border-1 rounded-md border-zinc-100/50 z-10 !items-start h-[80px]`}
                >
                    <div className="grid grid-rows-2 content-between h-[120px]">
                        <p className=" text-white/80 uppercase font-bold text-lg">
                            {title}
                        </p>
                    </div>
                </CardHeader>
                <h4 className="z-10 text-white/90 text-2xl font-bold px-2 my-2 shadow-sm">
                    {total}
                </h4>
                <Image
                    width={270}
                    removeWrapper
                    alt="Card background"
                    className="z-0 blur-sm object-bottom relative -mt-20"
                    src={img}
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between h-[60px]">
                    <div>
                        <p className="text-black/80 text-sm">{detail}.</p>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}
