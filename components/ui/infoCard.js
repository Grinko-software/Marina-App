/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'

const InfoCard = ({ title, unit, quantity, subUnit, color }) => {
    return (
        <section className='h-full flex'>
            <Card className={'flex flex-1 transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100  dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform hover:scale-105 text-black dark:text-white'}>
                <CardHeader className='flex-1'>
                    <h4 className="text-emerald-600 dark:text-esmerald-800 font-semibold text-xl">{title?.toUpperCase()}</h4>
                </CardHeader>
                <CardBody className="flex flex-1 flex-row justify-center items-center overflow-hidden" >
                    <h4 className={'font-semibold text-4xl items-center'}>{unit}</h4>
                    <h4 className={'font-semibold text-5xl items-center'}>{quantity}</h4>
                    <h4 className={'text-xl self-end'}>{subUnit}</h4>
                </CardBody>

            </Card>
        </section>
    )
}

export default InfoCard
