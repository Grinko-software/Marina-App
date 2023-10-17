'use client'
import React from 'react'
import { Card, CardFooter, CardHeader } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function MainTittleCard (props) {
    const { title, footerMessage, imgSrc, route, disabled } = props
    const router = useRouter()

    return (

        <Card
            isFooterBlurred
            radius="lg"
            className="col-span-12 sm:col-auto  h-full  sm:h-[40rem] shadow-2xl items items-center hover:scale-110 hover:shadow-lg duration-300"
            isPressable onPress = {() => (disabled || route === '/reports') ? null : router.push(route)}
        >
            <CardHeader className="absolute z-10 top-1 flex-col drop-shadow-6xl !items-start ">
                {/* <p className="text-tiny text-white/60 uppercase font-bold ">MÓDULO</p> */}
                <h4 className="text-white/80 font-medium text-6xl sm:text-8xl">{title}</h4>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                isZoomed
                src={imgSrc}

            />
            <CardFooter className="border-white/20 absolute border rounded-xl bottom-1 h-20 sm:h-40 ">
                <p className="text-l sm:text-3xl text-white/80">{footerMessage}</p>
            </CardFooter>
        </Card>
    )
}
