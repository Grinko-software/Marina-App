/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react'
import dynamic from 'next/dynamic'

const PieChart = ({ data, isLoading }) => {
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
    const [ChartComponent, setChartComponent] = useState(null)

    async function InitChart () {
        if (typeof window !== 'undefined') {
            import('react-apexcharts').then(({ default: Chart }) => {
                const chart = new Chart()
                setChartComponent(chart)
            })
        }
    }

    useEffect(() => {
        InitChart()
    }, [data])

    return <Card className={'w-auto flex-1 transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform hover:scale-[1.01] text-black ' + className}>
        <CardHeader >
            {isLoading
                ? <Skeleton className="h-[2rem] w-[36rem] rounded-md"></Skeleton>
                : <h4 className="text-primary-500 dark:text-white font-semibold text-xl">{title}</h4>}
        </CardHeader>
        <CardBody>
            {isLoading || !ChartComponent
                ? <Skeleton className="h-[20rem] w-[20rem] rounded-md"></Skeleton>
                : <div id="chart">
                    <ChartComponent
                        options={data?.options}
                        series={data?.series}
                        type="pie"
                    />
                </div>
            }
        </CardBody>
    </Card>
}
export default PieChart
