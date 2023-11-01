/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'

const InfoCard = ({ title, unit, quantity, subUnit, color }) => {
    return (
        <section className='flex flex-row'>
            <Card isFooterBlurred className={`${color} w-[30rem] h-[12rem] shadow-2xl `}>
                <div className='flex flex-col'>
                    <CardHeader className="absolute z-10 top-1">
                        <h4 className="text-white font-bold text-xl">{title}</h4>
                    </CardHeader>
                    <CardBody className='z-10 mt-10 flex flex-row justify-center' >
                        <h4 className="text-white font-extrabold text-6xl items-center">{unit}</h4>
                        <h4 className="text-white font-extrabold text-8xl items-center">{quantity}</h4>
                        <h4 className="text-white font-thin text-xl pt-11">{subUnit}</h4>
                    </CardBody>
                </div>
            </Card>
        </section>
    )
}

export default InfoCard
