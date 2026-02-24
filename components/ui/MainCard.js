import React, { useEffect, useState } from 'react'
import { Card, CardFooter, CardHeader } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import Image from './Image'

export default function MainTittleCard (props) {
    const { title, footerMessage, imgSrc, route, disabled } = props
    const router = useRouter()
    const [show, setShow] = useState(null)
    console.debug(disabled)
    useEffect(() => {
        if (disabled !== null) {
            setShow(disabled)
        }
    }, [disabled])
    return (
        <Card
            isDisabled={show}
            isFooterBlurred
            radius="lg"
            className={`${
                show ? ' cursor-not-allowed' : 'cursor-pointer'
            } col-span-12 sm:col-auto w-10/12 sm:w-full h-[10rem] sm:h-[40rem] shadow-xl items items-center hover:scale-105 hover:shadow-2xl duration-300 `}
            isPressable
            onPress={() => {
                if (!disabled) {
                    router.push(route)
                }
            }}
        >
            <CardHeader className="absolute z-10 top-2 sm:top-3 flex-col drop-shadow-6xl !items-start px-3 sm:px-6">
                {/* <p className="text-tiny text-white/60 uppercase font-bold ">MÓDULO</p> */}
                <h4 className="text-white/80 font-medium text-2xl sm:text-5xl lg:text-6xl leading-tight">
                    {title}
                </h4>
            </CardHeader>
            <Image
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={imgSrc}
            />
            <CardFooter className="border-white/20 absolute border rounded-xl bottom-1 h-16 sm:h-28 px-3 sm:px-6">
                <p className="text-sm sm:text-xl text-white/80 leading-snug">{footerMessage}</p>
            </CardFooter>
        </Card>
    )
}
