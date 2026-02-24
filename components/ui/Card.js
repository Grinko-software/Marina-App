'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
import { Badge, Card as CardUI, CardBody, CardFooter } from '@nextui-org/react'
import { ConvertBytesToImage, DefaultImageMarinaMarket } from '@/utils/image'
import Image from './Image'
import { roundValue } from '@/utils/number'

export default function Card (props) {
    const { item, index, setTargetProduct, isFromSales } = props
    const fallbackImage = DefaultImageMarinaMarket()
    const [imageSrc, setImageSrc] = React.useState(item?.image?.length ? item?.image : fallbackImage)
    const numericStock = Number(item?.stock)
    const hasValidStock = Number.isFinite(numericStock)
    const stockText = !hasValidStock
        ? '-'
        : numericStock >= 100
            ? '+99'
            : numericStock <= -99
                ? '-99'
                : roundValue(numericStock, 0, '-')
    const isMissingStock = String(stockText).trim() === '-'
    const isNegativeStock = hasValidStock && numericStock < 0
    const isDangerStock = isMissingStock || isNegativeStock
    const isLongStock = String(stockText).length > 4
    const badgeColorClass = isDangerStock
        ? '!bg-red-500 dark:!bg-red-500 !text-white'
        : '!bg-emerald-600 dark:!bg-emerald-600 !text-white'

    React.useEffect(() => {
        setImageSrc(item?.image?.length ? item?.image : fallbackImage)
    }, [item?.image])

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
                            src={imageSrc}
                            onError={() => {
                                if (imageSrc !== fallbackImage) {
                                    setImageSrc(fallbackImage)
                                }
                            }}
                        />
                    </div>
                </CardBody>
                <CardFooter className="text-small flex-1 min-h-[3.2rem] flex items-start justify-between gap-2">
                    <b
                        className="flex-1 min-w-0 whitespace-normal break-words leading-tight min-h-[2.4rem] max-h-[2.4rem] overflow-hidden"
                        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                    >
                        {item?.name}
                    </b>
                    <p className="text-default-500 shrink-0 text-right">{item?.price}</p>
                </CardFooter>
            </CardUI>
            : <CardUI shadow="sm" className='w-full h-full animation-fade-in' key={index} isPressable onPress={() => {
                setTargetProduct(item)
            }
            }>
                <CardBody className="overflow-visible p-0">
                    <Badge content={stockText} shape="circle"
                        className={`${numericStock >= 100 ? 'right-[1.5rem]' : 'right-[1.2rem]'} top-5 z-1`}
                        classNames={{
                            badge: `${badgeColorClass} ${isLongStock ? 'text-[9px]' : ''}`
                        }}
                    />
                    <Image
                        shadow="lg"
                        radius="lg"
                        width="100"
                        height="100"
                        alt={item?.name}
                        className="w-full object-cover h-[10rem]  bg-slate-100 dark:bg-white shadow-md rounded-2xl"
                        src={imageSrc}
                        onError={() => {
                            if (imageSrc !== fallbackImage) {
                                setImageSrc(fallbackImage)
                            }
                        }}
                    />
                </CardBody>
                <CardFooter className="text-small min-h-[4rem] flex items-start justify-between gap-2">
                    <b
                        className="flex-1 min-w-0 whitespace-normal break-words leading-tight min-h-[3.2rem] max-h-[3.2rem] overflow-hidden"
                        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                    >
                        {item?.name}
                    </b>
                    <p className="text-default-500 shrink-0 text-right">{item?.price}</p>
                </CardFooter>
            </CardUI>
    )
}
