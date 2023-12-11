'use client'
import React from 'react'
import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const AreaChart = ({ data, isLoading }) => {
    return (
        <section className='h-full w-full flex' >
            <WidgetReport
                title={'VENTAS POR CATEGORÍAS'}
                isLoading={isLoading}
                data={data}
            />
        </section>
    )
}

const WidgetReport = ({ children, className, title, isLoading, data }) => {
    return <>

        <Card className={'w-auto flex-1 transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform hover:scale-[1.01] text-black ' + className}>
            <CardHeader >
                {isLoading
                    ? <Skeleton className="h-[2rem] w-[66rem] rounded-md"></Skeleton>
                    : <h4 className="text-primary-500 dark:text-white font-semibold text-xl">{title}</h4>
                }
            </CardHeader>
            <CardBody>
                {isLoading
                    ? <Skeleton className="h-[40rem] w-[66rem] justify-center rounded-md flex"></Skeleton>
                    : <div id="chart" className='h-full w-full'>
                        <Chart
                            options={data?.options}
                            series={data?.series}
                            type="area"
                            width={'100%'}
                            height={'100%'}
                        />
                    </div>
                }
            </CardBody>
        </Card>
    </>
}

export default AreaChart
