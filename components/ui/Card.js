'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
import { Badge, Card as CardUI, CardBody, CardFooter } from '@nextui-org/react'
import { ConvertBytesToImage, DefaultImageMarinaMarket } from '@/utils/image'
import Image from 'next/image'
import { roundValue } from '@/utils/number'

export default function Card (props) {
    const { item, index, setTargetProduct, isFromSales } = props
    return (
        isFromSales
            ? <CardUI className='w-full h-full animation-fade-in flex' shadow="sm" key={index} isPressable onClick={() => {
                setTargetProduct(item)
            }}>
                <CardBody className="p-0 max-h-[7rem] bg-slate-100 dark:bg-white">
                    <div className=''>
                        <Image
                            shadow="none"
                            radius="lg"
                            width="100"
                            height="100"
                            alt={item?.name}
                            className="w-full object-cover h-[7rem]  bg-slate-100 dark:bg-white"
                            src={item?.image?.length ? ConvertBytesToImage({ imageBytes: item?.image }) : DefaultImageMarinaMarket()}
                        />
                    </div>
                </CardBody>
                <CardFooter className="text-small justify-between flex-1 space-x-2">
                    <b>{item?.name}</b>
                    <p className="text-default-500">{item?.price}</p>
                </CardFooter>
            </CardUI>
            : <CardUI shadow="sm" className='w-full h-full animation-fade-in' key={index} isPressable onPress={() => { setTargetProduct(item) }}>
                <CardBody className="overflow-visible p-0">
                    <Badge content={item?.stock >= 100 ? '+99' : roundValue(item?.stock, 0, '-') } shape="circle"
                        className={`${item?.stock >= 100 ? 'right-[1.5rem]' : 'right-[1.2rem]'} z-10 top-5  bg-red-500 dark:bg-emerald-600 text-primary-50`}
                    />
                    <Image
                        shadow="lg"
                        radius="lg"
                        width="100"
                        height="100"
                        alt={item?.name}
                        className="w-full object-cover h-[10rem]  bg-slate-100 dark:bg-white shadow-md rounded-2xl"
                        src={item?.image?.length ? ConvertBytesToImage({ imageBytes: item?.image }) : DefaultImageMarinaMarket()}
                    />
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b>{item?.name}</b>
                    <p className="text-default-500">{item?.price}</p>
                </CardFooter>
            </CardUI>
    )
}
