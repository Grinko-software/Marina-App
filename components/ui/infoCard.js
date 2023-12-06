/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'
import { DownArrowIcon } from './DownArrow'
import { UpArrowIcon } from './UpArrow'

const InfoCard = ({ title, unit, quantity, subUnit, color, pct, isLoading }) => {
    return (
        <section className='h-full flex'>
            {isLoading
                ? <Card className="w-full space-y-5 p-4 text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform hover:scale-[1.01] text-black " radius="lg">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </Card>
                : <Card className={'flex flex-1 w-full h-full transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform hover:scale-[1.01] text-black '}>
                    <CardHeader className='flex-1 flex-col'>
                        <h4 className="text-emerald-600 dark:text-esmerald-800 font-extrabold text-2xl">{title?.toUpperCase()}</h4>
                        {
                            pct?.toFixed(2) > 0
                                ? <h1 className="text-green-400 font-mono text-center text-xs">
                                    {'+' + pct?.toFixed(0) + '% ' + title + ' vs. periodo anterior.'}
                                </h1>
                                : <h1 className="text-red-400  font-mono text-center text-xs">
                                    {pct?.toFixed(0) + '% ' + title + ' vs. periodo anterior.'}
                                </h1>
                        }

                    </CardHeader>
                    <CardBody className="flex flex-1 flex-row justify-center items-center overflow-hidden" >
                        <h4 className={'font-semibold text-4xl items-center dark:text-white'}>{unit}</h4>
                        <h4 className={'font-semibold text-5xl items-center dark:text-white'}>{quantity}</h4>
                        <h4 className={'text-xl self-end dark:text-white'}>{subUnit}</h4>
                        <h4 className={'px-1 text-xl self-center'}>
                            {
                                pct?.toFixed(2) > 0
                                    ? <UpArrowIcon/>
                                    : <DownArrowIcon/>
                            }

                        </h4>

                    </CardBody>

                </Card>}
        </section>
    )
}

export default InfoCard
