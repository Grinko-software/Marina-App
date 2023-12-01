/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/react'

const InfoCard = ({ title, unit, quantity, subUnit, color }) => {
    return (
        <section>
            <Card className={'transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100  dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform hover:scale-105 text-black dark:text-white'}>
                <div className='flex flex-col'>
                    <CardHeader >
                        <h4 className="text-emerald-600 dark:text-esmerald-800 font-semibold text-2xl">{title}</h4>
                    </CardHeader>
                    <CardBody className="flex flex-row justify-start items-center" >
                        <h4 className={'font-extrabold text-6xl items-center'}>{unit}</h4>
                        <h4 className={'font-extrabold text-7xl items-center'}>{quantity}</h4>
                        <h4 className={'font-thin text-xl pt-11 '}>{subUnit}</h4>
                    </CardBody>
                </div>
            </Card>
        </section>
    )
}

export default InfoCard
