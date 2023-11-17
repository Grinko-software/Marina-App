/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'
import ReactApexChart from 'apexcharts'
import Chart from 'react-apexcharts'
import InfoCard from '@/components/ui/infoCard'
import TableSales from '@/components/ui/TableSales'
import PieChart from '@/components/ui/pieChart'
import Filter from '@/components/filter/filter'

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
        <section className='h-auto max-h-full flex-1 flex flex-col' >
            <div className='flex-1 mb-1'>
                <Filter/>
            </div>
            <section className='max-h-auto overflow-auto overflow-x-hidden flex-1 bg-slate-40010 space-y-5 pt-4'>
                <div className='flex flex-1 flex-row justify-between gap-5'>
                    <div className='flex flex-col content-between gap-5 w-1/3'>
                        <div className='flex-1 flex flex-row items-center gap-5'>
                            <div className='flex-1 h-full w-full'>
                                <InfoCard
                                    title={'Ingresos promedios (diarios)'}
                                    unit={'$'}
                                    quantity={'80'}
                                    subUnit={'mil.'}
                                    color={'green-400'}
                                />
                            </div>
                            <div className='flex-1 h-full w-full'>
                                <InfoCard
                                    title={'Ventas totales realizadas'}
                                    unit={''}
                                    quantity={'120'}
                                    subUnit={''}
                                    color={'yellow-400'}
                                />
                            </div>
                        </div>
                        <div>
                            <PieChart></PieChart>
                        </div>
                    </div>
                    <WidgetReport title={'Ventas por periodo'}>
                        <div id="chart">
                            <Chart
                                options={data?.options}
                                series={data?.series}
                                type="area"
                                height={350}
                            />
                        </div>

                    </WidgetReport>
                </div>

                <TableSales />
            </section>

        </section>
    )
}

export default ReportView
