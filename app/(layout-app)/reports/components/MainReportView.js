/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'
import InfoCard from '@/components/ui/infoCard'
import TableSales from '@/components/ui/TableSales'
import PieChart from '@/components/ui/pieChart'
import AreaChart from '@/components/ui/areaChart'

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
                        <PieChart/>
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
    )
}
/*
<section className='grid grid-cols-1 w-full gap-3' >
            <section className='grid grid-cols-1 md:grid-cols-3 gap-3' >
                <section className='col-span-1'>
                    <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">

                        <div className="bg-blue-500">
                            <InfoCard
                                title = {'Ingresos diarios'}
                                unit ={'$'}
                                quantity = {'80'}
                                subUnit = {'mil.'}
                                color={'green-400'}
                            />
                        </div>
                        <div className="bg-green-500">
                            <InfoCard
                                title = {'Ventas Realizadas'}
                                unit ={''}
                                quantity = {'120'}
                                subUnit = {''}
                                color={'yellow-400'}
                            />
                        </div>

                        <div className="bg-red-500 col-span-2">
                            <PieChart/>
                        </div>
                    </div>
                </section>

                <section className="col-span-2 h-full ">
                    <AreaChart data = {data} />
                </section>
            </section>
            <sectionn className="h-full">
                <TableSales />
            </sectionn>
        </section>

*/
/*
<section className='grid grid-cols-3  h-full' >
            <section className="bg-primary-500 w-full h-full col-span-1">
            </section>
            <section className=" bg-red-600 w-full h-full col-span-2 ">
            </section>

*/

export default ReportView
/*
 <div className='flex flex-row h-[50%]'>

                <div className='flex flex-col w-[50%] border border-yellow-800'>
                    <div className='flex flex-row h-[50%]'>
                        <div className='flex flex-col w-[50%] border border-yellow-800'>
                            <InfoCard
                                title = {'Ingresos diarios'}
                                unit ={'$'}
                                quantity = {'80'}
                                subUnit = {'mil.'}
                                color={'green-400'}
                            />
                        </div>
                        <div className='flex flex-col w-[50%] border border-yellow-800'>
                            <InfoCard
                                title = {'Ventas Realizadas'}
                                unit ={''}
                                quantity = {'120'}
                                subUnit = {''}
                                color={'yellow-400'}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row h-[50%]'>2</div>
                </div>
                <div className='flex flex-col w-[50%] border border-yellow-800'>3</div>
            </div>
            <div className='flex flex-row h-[50%]'>2</div>

*/
/*

            <div className='grid grid-cols-1 lg:grid-cols-2 h-full w-full'>
                <div className='bg-red-600'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 h-full w-full'>
                        <div className='bg-red-600'>
                            <InfoCard
                                title = {'Ingresos diarios'}
                                unit ={'$'}
                                quantity = {'80'}
                                subUnit = {'mil.'}
                                color={'green-400'}
                            />

                        </div>
                        <div className='bg-blue-600  col-span-1'>
                            <InfoCard
                                title = {'Ventas Realizadas'}
                                unit ={''}
                                quantity = {'120'}
                                subUnit = {''}
                                color={'yellow-400'}
                            /></div>
                        <div className='bg-green-600'>
                            <PieChart/>
                        </div>
                    </div>
                </div>
                <div className='bg-blue-600'>  <AreaChart data = {data} /></div>
                <div className='bg-green-600 lg:col-span-4'> <TableSales /></div>
            </div>
*/
