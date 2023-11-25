/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'
import InfoCard from '@/components/ui/infoCard'
import TableSales from '@/components/ui/TableSales'
import PieChart from '@/components/ui/pieChart'
import AreaChart from '@/components/ui/areaChart'
import Chart from 'react-apexcharts'
import Filter from './Filter/Filter'
import useReportsStore from './store'
const WidgetReport = ({ children, className, title }) => {
    return <Card className={'w-auto flex-1 transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform hover:scale-[1.01] text-black ' + className}>
        <CardHeader >
            <h4 className="text-primary-500 dark:text-white font-semibold text-xl">{title}</h4>
        </CardHeader>
        <CardBody>
            {children}
        </CardBody>
    </Card>
}
const ReportView = () => {
    const { pieChart: dataPieChart, periodIndicators: dataIndicators } = useReportsStore()
    const [dataModelPieChart, setDataModelPieChart] = useState(null)
    const [dataModelIndicator, setDataModelIndicator] = useState(null)

    useEffect(() => {
        if (dataPieChart) {
            const labels = dataPieChart?.map((item) => { return item?.category_name })
            const series = dataPieChart?.map((item) => { return item?.percentage })

            const dataChartPie = {
                series,
                options: {
                    chart: {
                        width: 'auto',
                        type: 'pie'
                    },
                    labels,
                    responsive: [{
                        breakpoint: 180,
                        options: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }
            }
            setDataModelPieChart(dataChartPie)
        }
    }, [dataPieChart])

    useEffect(() => {
        if (dataIndicators) {
            const IndicatorsData = dataIndicators.data
            setDataModelIndicator(dataIndicators)
        }
    }, [dataIndicators])

    const data = {
        series: [{
            name: 'Efectivo',
            data: [31000, 4000, 28000, 5100, 42000, 109000, 100000]
        }, {
            name: 'Debito/Credito',
            data: [11000, 32000, 45000, 32000, 34000, 52000, 41000]
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ['2018-09-19T00:00:00.000Z', '2018-09-20T00:00:00.000Z', '2018-09-21T00:00:00.000Z', '2018-09-22T00:00:00.000Z', '2018-09-23T00:00:00.000Z', '2018-09-24T00:00:00.000Z', '2018-09-25T00:00:00.000Z']
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                }
            }
        }
    }
    return (
        <section className='grid grid-cols-1 w-full gap-3'>
            <div className=''>
                <Filter/>
            </div>
            <section className='grid grid-cols-1 w-full gap-3' >
                <section className='grid grid-cols-1 md:grid-cols-3 md:gap-3' >
                    <section className="grid grid-cols-2 gap-3  h-full w-full col-span-1">
                        <div className='col-span-1 w-full h-full'>
                            <InfoCard
                                title = {'Ingresos diarios'}
                                unit ={'$'}
                                quantity = {Math.floor(dataModelIndicator?.total_money / 1000)}
                                subUnit = {'mil.'}
                                color={'green-400'}
                            />
                        </div>
                        <div className='col-span-1 w-full h-full'>
                            <InfoCard
                                title = {'Ventas Realizadas'}
                                unit ={''}
                                quantity = {dataModelIndicator?.total_sales}
                                subUnit = {''}
                                color={'yellow-400'}
                            />
                        </div>

                        <div className='col-span-2 w-full h-full'>
                            <WidgetReport title={'Ventas por categoría'}>
                                <div id="chart">
                                    {dataModelPieChart
                                        ? <Chart
                                            options={dataModelPieChart?.options}
                                            series={dataModelPieChart?.series}
                                            type="pie"
                                        />
                                        : null}

                                </div>

                            </WidgetReport>

                        </div>

                    </section>
                    <section className="col-span-2 mt-3 md:mt-0">
                        <AreaChart data = {data} />
                    </section>
                </section>
                <sectionn className="h-full">
                    <TableSales />
                </sectionn>

            </section>
        </section>

    )
}
export default ReportView

/* 'use client'
import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'
import InfoCard from '@/components/ui/infoCard'
import TableSales from '@/components/ui/TableSales'
import AreaChart from '@/components/ui/areaChart'
import Filter from '@/components/filter/filter'
import Chart from 'react-apexcharts'
const WidgetReport = ({ children, className, title }) => {
    return <Card className={'w-auto flex-1 transition duration-1000 ease-in-out text-opacity-50 hover:text-opacity-100 dark:bg-secondary-400 bg-primary-50/80 hover:bg-primary-50 transform hover:scale-[1.01] text-black ' + className}>
        <CardHeader >
            <h4 className="text-primary-500 dark:text-white font-semibold text-xl">{title}</h4>
        </CardHeader>
        <CardBody>
            {children}
        </CardBody>
    </Card>
}

const ReportView = () => {
    const data = {
        series: [{
            name: 'Efectivo',
            data: [31000, 4000, 28000, 5100, 42000, 109000, 100000]
        }, {
            name: 'Debito/Credito',
            data: [11000, 32000, 45000, 32000, 34000, 52000, 41000]
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ['2018-09-19T00:00:00.000Z', '2018-09-20T00:00:00.000Z', '2018-09-21T00:00:00.000Z', '2018-09-22T00:00:00.000Z', '2018-09-23T00:00:00.000Z', '2018-09-24T00:00:00.000Z', '2018-09-25T00:00:00.000Z']
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                }
            }
        }
    }

    return (
        <section>
            <div className='flex-1 mb-1'>
                <Filter/>
            </div>
            <section className='grid grid-cols-1 w-full gap-3' >
                <section className='grid grid-cols-1 md:grid-cols-3 gap-3' >
                    <section className="grid grid-cols-2 gap-1 md:gap-3  h-full w-full col-span-1">
                        <div className='col-span-1 w-full h-full'>
                            <InfoCard
                                title = {'Ingresos diarios'}
                                unit ={'$'}
                                quantity = {'80'}
                                subUnit = {'mil.'}
                                color={'green-400'}
                            />
                        </div>
                        <div className='col-span-1 w-full h-full'>
                            <InfoCard
                                title = {'Ventas Realizadas'}
                                unit ={''}
                                quantity = {'120'}
                                subUnit = {''}
                                color={'yellow-400'}
                            />
                        </div>

                        <div className='col-span-2 w-full h-full'>
                            <WidgetReport title={'Ventas por periodo'}>
                                <div id="chart">
                                    <Chart
                                        options={data?.options}
                                        series={data?.series}
                                        type="pie"
                                        height={350}
                                    />
                                </div>

                            </WidgetReport>
                        </div>

                    </section>
                    <section className="  col-span-2 h-full ">
                        <AreaChart data = {data} />
                    </section>
                </section>
                <sectionn className="h-full">
                    <TableSales />
                </sectionn>
            </section>
        </section>
    )
}
export default ReportView
 */
/*
      <section className='grid grid-cols-1 w-full gap-3'>
            <div className=''>
                <Filter/>
            </div>
            <section className='grid grid-cols-1 w-full gap-3' >
                <div className='overflow-y-scroll'>
                    <section className='grid grid-cols-1 md:grid-cols-3 gap-3' >
                        <section className="grid grid-cols-2 gap-1 md:gap-3  h-full w-full col-span-1">
                            <div className='col-span-1 w-full h-full'>
                                <InfoCard
                                    title = {'Ingresos diarios'}
                                    unit ={'$'}
                                    quantity = {'80'}
                                    subUnit = {'mil.'}
                                    color={'green-400'}
                                />
                            </div>
                            <div className='col-span-1 w-full h-full'>
                                <InfoCard
                                    title = {'Ventas Realizadas'}
                                    unit ={''}
                                    quantity = {'120'}
                                    subUnit = {''}
                                    color={'yellow-400'}
                                />
                            </div>

                            <div className='col-span-2 w-full h-full'>
                                <WidgetReport title={'Ventas por categoría'}>
                                    <div id="chart">
                                        <Chart
                                            options={dataChartPie?.options}
                                            series={dataChartPie?.series}
                                            type="pie"
                                        />
                                    </div>

                                </WidgetReport>

                            </div>

                        </section>
                        <section className="  col-span-2 h-full ">
                            <AreaChart data = {data} />
                        </section>
                    </section>
                    <sectionn className="h-full">
                        <TableSales />
                    </sectionn>
                </div>
            </section>
        </section>

*/
